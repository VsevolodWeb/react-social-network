import {stopSubmit} from 'redux-form';
import {getCaptchaThunkCreator} from './security-reducer'

import {authAPI, AuthResultCodesEnum, AuthResultCodesWithCaptcha} from '../api/api';
import {Dispatch} from "redux";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const REMOVE_USER_DATA = 'auth/REMOVE_USER_DATA';

type InitialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

const initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
};

type ActionsTypes = SetUserDataActionType | RemoveUserDataActionType;

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.userData,
                isAuth: true
            };

        case REMOVE_USER_DATA: {
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
type SetUserDataActionType = {
    type: typeof SET_USER_DATA
    userData: UserDataType
}
export const setUserData = (userData: UserDataType): SetUserDataActionType => ({type: SET_USER_DATA, userData});

type RemoveUserDataActionType = {
    type: typeof REMOVE_USER_DATA
}
export const removeUserData = (): RemoveUserDataActionType => ({type: REMOVE_USER_DATA});

export const authMeThunkCreator = () => async (dispatch: Dispatch<SetUserDataActionType>) => {
    const response = await authAPI.authMe();

    if (response.resultCode === AuthResultCodesEnum.Success) {
        dispatch(setUserData(response.data));
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
        dispatch(removeUserData());
    }
};

export default authReducer;