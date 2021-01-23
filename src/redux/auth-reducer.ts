import {stopSubmit} from 'redux-form'
import {getCaptchaThunkCreator} from './security-reducer'

import {AuthResultCodes} from '../api/api'
import {Dispatch} from "redux"
import {AppStateType, InferActionsTypes} from "./redux-store"
import {authAPI, AuthLoginFormDataType} from "../api/auth-api"
import {ThunkDispatch} from "redux-thunk"


const initialState = {
    id: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false
}

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "auth/SET_USER_DATA":
            return {
                ...state,
                ...action.userData,
                isAuth: true
            }

        case "auth/REMOVE_USER_DATA": {
            return {
                id: null,
                email: null,
                login: null,
                isAuth: false
            }
        }

        default:
            return state
    }
}

type UserDataType = {
    id: number
    login: string
    email: string
}

const actions = {
    setUserData: (userData: UserDataType) => ({type: "auth/SET_USER_DATA", userData} as const),
    removeUserData: () => ({type: "auth/REMOVE_USER_DATA"} as const)
}

export const authMeThunkCreator = () => async (dispatch: Dispatch<ActionsTypes>) => {
    const response = await authAPI.authMe();

    if (response.resultCode === AuthResultCodes.Success) {
        dispatch(actions.setUserData(response.data));
    }
}

export const authLoginThunkCreator = (formData: AuthLoginFormDataType) => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>) => {
    const response = await authAPI.authLogin(formData);

    switch (response.resultCode) {
        case AuthResultCodes.Success: {
            await dispatch(authMeThunkCreator());
            break;
        }
        case AuthResultCodes.CaptchaIsRequired: {
            await dispatch(getCaptchaThunkCreator());
            break;
        }
        default: dispatch(stopSubmit("login", {_error: response.messages[0]}));
    }
}

export const authLogout = () => async (dispatch: Dispatch<ActionsTypes>) => {
    const response = await authAPI.authLogout();

    if (response.resultCode === AuthResultCodes.Success) {
        dispatch(actions.removeUserData());
    }
}

export default authReducer;