import {InferActionsTypes} from './redux-store'
import {Dispatch} from 'redux'
import {v4} from 'uuid'
import {chatAPI, SubscribeMessagesCallbackType, SubscribeStatusCallbackType} from '../api/chat-api'
import {RESET_FORM} from './actions/actions'

const initialState = {
	messages: [] as ChatMessageType[],
	statusCode: null as WsChannelStatusType | null
}

type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case 'chat/SET_MESSAGES': {
			return {
				...state,
				messages: [
					...state.messages,
					...action.messages.map(message => ({...message, id: String(v4())}))
				].filter((_, i, array) => i >= array.length - 100)
			}
		}

		case 'chat/RESET_MESSAGES': {
			return {
				...state,
				messages: []
			}
		}

		case "chat/SET_STATUS": {
			return {
				...state,
				statusCode: action.statusCode
			}
		}

		default:
			return state
	}
}

export const actions = {
	setMessages: (messages: ChatMessageType[]) => ({type: 'chat/SET_MESSAGES', messages} as const),
	resetMessages: () => ({type: 'chat/RESET_MESSAGES'} as const),
	setStatus: (statusCode: WsChannelStatusType) => ({type: 'chat/SET_STATUS', statusCode} as const),
	resetMessage: () => ({type: RESET_FORM} as const)
}

let subscriberMessageHandler: SubscribeMessagesCallbackType | null = null
const subscribeHandlerCreator = (dispatch: Dispatch<ActionsTypes>) => {
	if (!subscriberMessageHandler) {
		subscriberMessageHandler = (messages: ChatMessageType[]) => {
			dispatch(actions.setMessages(messages))
		}
	}

	return subscriberMessageHandler
}

let subscribeStatusHandler: SubscribeStatusCallbackType | null = null
const subscriberStatusHandlerCreator = (dispatch: Dispatch<ActionsTypes>) => {
	if (!subscribeStatusHandler) {
		subscribeStatusHandler = (statusCode: WsChannelStatusType) => {
			dispatch(actions.setStatus(statusCode))
		}
	}

	return subscribeStatusHandler
}

export const startMessageListening = () => async (dispatch: Dispatch<ActionsTypes>) => {
	chatAPI.start()
	chatAPI.subscribeMessage(subscribeHandlerCreator(dispatch))
	chatAPI.subscribeStatus(subscriberStatusHandlerCreator(dispatch))
}

export const stopMessageListening = () => async (dispatch: Dispatch<ActionsTypes>) => {
	chatAPI.unsubscribeMessage(subscribeHandlerCreator(dispatch))
	chatAPI.unsubscribeStatus(subscriberStatusHandlerCreator(dispatch))
	chatAPI.stop()
	dispatch(actions.resetMessages())
}

export const sendMessage = (message: string) => async () => {
	chatAPI.send(message)
}

export type ChatMessageType = {
	id: string
	message: string
	photo: string
	userId: number
	userName: string
}
export type WsChannelStatusType =
	typeof WebSocket.CONNECTING
	| typeof WebSocket.OPEN
	| typeof WebSocket.CLOSING
	| typeof WebSocket.CLOSED


export default chatReducer