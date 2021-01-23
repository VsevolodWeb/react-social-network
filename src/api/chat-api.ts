import {ChatMessageType} from '../redux/chat-reducer'

let subscribers = [] as SubscribeCallbackType[]

// const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
//
// const connect = () => {
// 	wsChannel.addEventListener('message', e => {
// 		const messages: ChatMessageType[] = JSON.parse(e.data)
//
// 		subscribers.forEach(subscriber => subscriber(messages))
// 	})
//
// 	wsChannel.addEventListener('open', () => {
// 		console.log('Socket is open.')
// 	})
//
// 	wsChannel.addEventListener('close', e => {
// 		console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason)
//
// 		setTimeout(connect, 1000)
// 	})
//
// 	wsChannel.addEventListener('error', e => {
// 		console.error('Socket encountered error: ', e, 'Closing socket')
//
// 		wsChannel.close()
// 	})
// }
//
// connect()

export const chatAPI = {
	subscribe(callback: SubscribeCallbackType) {
		subscribers.push(callback)
	},
	unsubscribe(callback: SubscribeCallbackType) {
		subscribers = subscribers.filter(subscriber => subscriber !== callback)
	}
}

export type SubscribeCallbackType = (messages: ChatMessageType[]) => void