import {ChatMessageType} from '../redux/chat-reducer'

let subscribers = [] as SubscribeCallbackType[]
let wsChannel: WebSocket | null = null

const connect = () => {
	wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

	wsChannel.onmessage = e => {
		const messages: ChatMessageType[] = JSON.parse(e.data)

		subscribers.forEach(subscriber => subscriber(messages))
	}

	wsChannel.onopen = () => {
		console.log('Socket is open.')
	}

	wsChannel.onclose = e => {
		console.log('Socket is closed.', e.reason)

		//setTimeout(connect, 1000)
	}

	wsChannel.onerror = e => {
		console.error('Socket encountered error: ', e, 'Closing socket')

		wsChannel?.close()
	}
}

export const chatAPI = {
	start() {
		connect()
	},
	stop() {
		subscribers = []
		wsChannel?.close()
	},
	subscribe(callback: SubscribeCallbackType) {
		subscribers.push(callback)
	},
	unsubscribe(callback: SubscribeCallbackType) {
		subscribers = subscribers.filter(subscriber => subscriber !== callback)
	},
	send(message: string) {
		wsChannel?.send(message)
	}
}

export type SubscribeCallbackType = (messages: ChatMessageType[]) => void