import {AppStateType} from "./redux-store"

export const getChatMessages = (state: AppStateType) => state.chat.messages
export const getChatStatusCode = (state: AppStateType) => state.chat.statusCode