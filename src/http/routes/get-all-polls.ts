import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function getAllPolls(app: FastifyInstance) {
	app.get('/polls/', async (req, res) => {
		
		const polls = await prisma.poll.findMany();
	
		return res.send({ polls: polls }); 
	});
}