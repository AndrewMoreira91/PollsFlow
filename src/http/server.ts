import fastify from "fastify";
import { createPoll } from "./routes/create-poll";
import { getPoll } from "./routes/get-poll";
import { voteOnPoll } from "./routes/vote-on-poll";
import cookie from "@fastify/cookie"
import websocket from "@fastify/websocket";
import { getAllPolls } from "./routes/get-all-polls";
import { pollResults } from "./ws/poll-results";

const app = fastify();

app.register(cookie, {
	secret: "FlSaMoAnDe",
	hook: 'onRequest'
})

app.register(websocket)

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)
app.register(getAllPolls)

app.register(pollResults)

app.listen({ port: 3000}).then(() => {
	console.log('Server is running on port 3000')
});
