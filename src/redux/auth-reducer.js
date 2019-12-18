import {stopSubmit} from 'redux-form';
import {getCaptchaThunkCreator} from './security-reducer'

import { authAPI } from './../api/api';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const REMOVE_USER_DATA = 'auth/REMOVE_USER_DATA';

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
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

export const setUserData = (userData) => ({type: SET_USER_DATA, userData});
export const removeUserData = () => ({type: REMOVE_USER_DATA});

export const authMeThunkCreator = () => async dispatch => {
    const response = await authAPI.authMe();

    if (response.resultCode === 0) {
        dispatch(setUserData(response.data));
    }
};

export const authLoginThunkCreator = formData => async dispatch => {
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

export const authLogout = () => async dispatch => {
    const response = await authAPI.authLogout();

    if (response.resultCode === 0) {
        dispatch(removeUserData());
    }
};

export default authReducer;