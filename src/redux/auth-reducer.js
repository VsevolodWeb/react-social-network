import { authAPI } from './../api/api';

const SET_USER_DATA = 'SET-USER-DATA';

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

        default:
            return state; 
    }
};

export const setUserData = (userData) => ({type: SET_USER_DATA, userData});

export const authMeThunkCreator = () => dispatch => {
    authAPI.authMe().then(response => {
        if (response.resultCode === 0) {
            dispatch(setUserData(response.data));
        }
    });
}

export const authLoginThunkCreator = formData => dispatch => {
    authAPI.authLogin(formData).then(response => {
        if (response.resultCode === 0) {
            dispatch(setUserData(response.data));
        }
    });
}

export default authReducer;