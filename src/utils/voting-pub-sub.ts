type Message = { pollOptionsId: string, votes: number }
type Subscriber = (message: Message) => void

class  VotingPubSub {
	private chanels: Record<string, Subscriber[]> = {}

	subscribe(pollId: string, subscriber: Subscriber) {
		if (!this.chanels[pollId]) {
			this.chanels[pollId] = []
		}
		 
		this.chanels[pollId].push(subscriber)
	}

	publish(pollId: string, message: Message) {
		if(!this.chanels[pollId]) {
			console.log(this.chanels[pollId])
			return;
		}

		for (const subscriber of this.chanels[pollId]) {
			subscriber(message)
		}
	}
}

export const voting = new VotingPubSub()