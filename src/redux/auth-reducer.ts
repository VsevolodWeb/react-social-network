import {stopSubmit} from 'redux-form'
import {getCaptchaThunkCreator} from './security-reducer'

import {AuthResultCodesEnum, AuthResultCodesWithCaptcha} from '../api/api'
import {Dispatch} from "redux"
import {InferActionsTypes} from "./redux-store";
import {authAPI} from "../api/auth-api";



const initialState = {
    id: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false
};
type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "auth/SET_USER_DATA":
            return {
                ...state,
                ...action.userData,
                isAuth: true
            };

        case "auth/REMOVE_USER_DATA": {
            return {
                id: null,
                email: null,
                login: null,
                isAuth: false
            };
        }

        default:
            return state; 
    }
};



type UserDataType = {
    id: number
    login: string
    email: string
}

const actions = {
    setUserData: (userData: UserDataType) => ({type: "auth/SET_USER_DATA", userData} as const),
    removeUserData: () => ({type: "auth/REMOVE_USER_DATA"} as const)
} as const

export type AuthMeThunkType = (dispatch: Dispatch<{type: string, userData: UserDataType}>) => void
export const authMeThunkCreator = (): AuthMeThunkType => async (dispatch) => {
    const response = await authAPI.authMe();

    if (response.resultCode === AuthResultCodesEnum.Success) {
        dispatch(actions.setUserData(response.data));
    }
};

export type AuthLoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
export const authLoginThunkCreator = (formData: AuthLoginFormDataType) => async (dispatch: Dispatch<ActionsTypes> | any) => {
    const response = await authAPI.authLogin(formData);

    switch (response.resultCode) {
        case AuthResultCodesEnum.Success: {
            dispatch(authMeThunkCreator());
            break;
        }
        case AuthResultCodesWithCaptcha.CaptchaIsRequired: {
            dispatch(getCaptchaThunkCreator());
            break;
        }
        default: dispatch(stopSubmit("login", {_error: response.messages[0]}));
    }
};

export const authLogout = () => async (dispatch: Dispatch<ActionsTypes>) => {
    const response = await authAPI.authLogout();

    if (response.resultCode === AuthResultCodesEnum.Success) {
        dispatch(actions.removeUserData());
    }
};

export default authReducer;