import {InferActionsTypes} from './redux-store'
import {Dispatch} from 'redux'
import {chatAPI, SubscribeCallbackType} from '../api/chat-api'
import {RESET_FORM} from './actions/actions'

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

		case 'chat/RESET_MESSAGES': {
			return {
				...state,
				messages: []
			}
		}

		default:
			return state
	}
}

export const actions = {
	setMessages: (messages: ChatMessageType[]) => ({type: 'chat/SET_MESSAGES', messages} as const),
	resetMessages: () => ({type: 'chat/RESET_MESSAGES'} as const),
	resetMessage: () => ({type: RESET_FORM} as const)
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
	chatAPI.start()
	chatAPI.subscribe(subscriberHandlerCreator(dispatch))
}

export const stopMessageListening = () => async (dispatch: Dispatch<ActionsTypes>) => {
	chatAPI.unsubscribe(subscriberHandlerCreator(dispatch))
	chatAPI.stop()
	dispatch(actions.resetMessages())
}

export const sendMessage = (message: string) => async () => {
	chatAPI.send(message)
}

export type ChatMessageType = {
	message: string
	photo: string
	userId: number
	userName: string
}

export default chatReducer