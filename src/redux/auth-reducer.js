import {stopSubmit} from 'redux-form';

import { authAPI } from './../api/api';

const SET_USER_DATA = 'SET-USER-DATA';
const REMOVE_USER_DATA = 'REMOVE-USER-DATA';

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

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

export const authMeThunkCreator = () => dispatch => {
    return authAPI.authMe().then(response => {
        if (response.resultCode === 0) {
            dispatch(setUserData(response.data));
        }
    });
}

export const authLoginThunkCreator = formData => dispatch => {
    authAPI.authLogin(formData).then(response => {
        if (response.resultCode === 0) {
            dispatch(authMeThunkCreator());
        } else {
            dispatch(stopSubmit("login", {_error: response.messages[0]}));
        }
    });
}

export const authLogout = () => dispatch => {
    authAPI.authLogout().then(response => {
        if (response.resultCode === 0) {
            dispatch(removeUserData());
        }
    });
}

export default authReducer;