import {AppStateType} from "./redux-store"

export const getAuthIsAuth = (state: AppStateType) => state.auth.isAuth
export const getAuthUserId = (state: AppStateType) => state.auth.id
export const getAuthUserLogin = (state: AppStateType) => state.auth.login