import {InferActionsTypes} from './redux-store'
import {Dispatch} from 'redux'
import {chatAPI, SubscribeCallbackType} from '../api/chat-api'

const initialState = {
	messages: [] as ChatMessageType[]
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
					...action.messages
				]
			}
		}

		default:
			return state
	}
}

export const actions = {
	setMessages: (messages: ChatMessageType[]) => ({type: 'chat/SET_MESSAGES', messages} as const)
}

let subscribeHandler: SubscribeCallbackType | null = null
const subscriberHandlerCreator = (dispatch: Dispatch<ActionsTypes>) => {
	if (!subscribeHandler) {
		subscribeHandler = (messages: ChatMessageType[]) => {
			dispatch(actions.setMessages(messages))
		}
	}

	return subscribeHandler
}

export const startMessageListening = () => async (dispatch: Dispatch<ActionsTypes>) => {
	chatAPI.subscribe(subscriberHandlerCreator(dispatch))
}

export const stopMessageListening = () => async (dispatch: Dispatch<ActionsTypes>) => {
	chatAPI.unsubscribe(subscriberHandlerCreator(dispatch))
}

export type ChatMessageType = {
	message: string
	photo: string
	userId: number
	username: string
}

export default chatReducer