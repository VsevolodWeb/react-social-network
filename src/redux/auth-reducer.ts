import {stopSubmit} from 'redux-form';
import {getCaptchaThunkCreator} from './security-reducer'

import { authAPI } from '../api/api';

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

const authReducer = (state = initialState, action: any): InitialStateType => {
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
    type: string
}
export const removeUserData = (): RemoveUserDataActionType => ({type: REMOVE_USER_DATA});

export const authMeThunkCreator = () => async (dispatch: any) => {
    const response = await authAPI.authMe();

    if (response.resultCode === 0) {
        console.log(response.data);
        dispatch(setUserData(response.data));
    }
};

type AuthLoginThunkCreatorFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
export const authLoginThunkCreator = (formData: AuthLoginThunkCreatorFormDataType) => async (dispatch: any) => {
    const response = await authAPI.authLogin(formData);

    switch (response.resultCode) {
        case 0: {
            dispatch(authMeThunkCreator());
            break;
        }
        case 10: {
            dispatch(getCaptchaThunkCreator());
            break;
        }
        default: dispatch(stopSubmit("login", {_error: response.messages[0]}));
    }
};

export const authLogout = () => async (dispatch: any) => {
    const response = await authAPI.authLogout();

    if (response.resultCode === 0) {
        dispatch(removeUserData());
    }
};

export default authReducer;