import { z } from "zod";
import { randomUUID } from "crypto";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";
import { redis } from "../../lib/resdis";
import { voting } from "../../utils/voting-pub-sub";

export async function voteOnPoll(app: FastifyInstance) {
	app.post('/polls/:pollId/votes', async (req, res) => {
		const voteOnPollBody = z.object({
			pollOptionsId: z.string().uuid()
		})

		const voteOnPollParams = z.object({
			pollId: z.string().uuid()
		})

		const { pollOptionsId: pollOptionsId } = voteOnPollBody.parse(req.body)
		const { pollId } = voteOnPollParams.parse(req.params)

		let { sessionId } = req.cookies

		if (sessionId) {
			const userPreviousVoteOnPoll = await prisma.vote.findUnique({
				where: {
					sessionId_pollId: {
						sessionId,
						pollId
					}
				}
			})

			if (userPreviousVoteOnPoll && userPreviousVoteOnPoll.pollOptionsId !== pollOptionsId) {

				await prisma.vote.delete({
					where: {
						id: userPreviousVoteOnPoll.id
					}
				})

				const votes = await redis.zincrby(pollId, -1, userPreviousVoteOnPoll.pollOptionsId)

				voting.publish(pollId, {
					pollOptionsId: userPreviousVoteOnPoll.pollId,
					votes: Number(votes),
				})

			} else if (userPreviousVoteOnPoll) {
				return res.status(400).send({ message: 'Você já votou nessa enquete' })
			}
		}

		if (!sessionId) {
			sessionId = randomUUID()

			res.setCookie('sessionId', sessionId, {
				path: '/',
				maxAge: 60 * 60 * 24 * 30,
				signed: true,
				httpOnly: true,
			})
		}

		await prisma.vote.create({
			data: {
				sessionId,
				pollId,
				pollOptionsId: pollOptionsId
			}
		})

		const votes = await redis.zincrby(pollId, 1, pollOptionsId)

		voting.publish(pollId, {
			pollOptionsId: pollOptionsId,
			votes: Number(votes),
		})

		return res.status(201).send({ sessionId });
	});
}