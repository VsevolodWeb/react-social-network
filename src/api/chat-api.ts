import {ChatMessageType, WsChannelStatusType} from '../redux/chat-reducer'

type SubscribersType = {
	message: SubscribeMessagesCallbackType[]
	status: SubscribeStatusCallbackType[]
}

let subscribers: SubscribersType = {
	message: [],
	status: []
}
let wsChannel: WebSocket | null = null

const notifySubscriberStatus = (status: WsChannelStatusType) => {
	subscribers.status.forEach(subscriber => {
		subscriber(status)
	})
}

const connect = () => {
	wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

	notifySubscriberStatus(WebSocket.CONNECTING)

	wsChannel.onmessage = e => {
		const messages: ChatMessageType[] = JSON.parse(e.data)

		subscribers.message.forEach(subscriber => subscriber(messages))
	}

	wsChannel.onopen = () => {
		console.log('Socket is open.')

		notifySubscriberStatus(WebSocket.OPEN)
	}

	wsChannel.onclose = e => {
		console.log('Socket is closed.', e.reason)

		notifySubscriberStatus(WebSocket.CLOSING)
		setTimeout(connect, 3000)
	}

	wsChannel.onerror = e => {
		console.error('Socket encountered error: ', e, 'Closing socket')

		notifySubscriberStatus(WebSocket.CLOSED)
	}
}

export const chatAPI = {
	start() {
		connect()
	},
	stop() {
		subscribers.message = []
		subscribers.status = []
		wsChannel?.close()
	},
	subscribeMessage(callback: SubscribeMessagesCallbackType) {
		subscribers.message.push(callback)
	},
	subscribeStatus(callback: SubscribeStatusCallbackType) {
		subscribers.status.push(callback)
	},
	unsubscribeMessage(callback: SubscribeMessagesCallbackType) {
		subscribers.message = subscribers.message.filter(subscriber => subscriber !== callback)
	},
	unsubscribeStatus(callback: SubscribeStatusCallbackType) {
		subscribers.status = subscribers.status.filter(subscriber => subscriber !== callback)
	},
	send(message: string) {
		wsChannel?.send(message)
	},
}

export type SubscribeMessagesCallbackType = (messages: ChatMessageType[]) => void
export type SubscribeStatusCallbackType = (status: WsChannelStatusType) => void