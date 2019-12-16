import { stopSubmit } from 'redux-form';

import { profileAPI } from './../api/api';
import {RESET_FORM} from './actions/actions'

const ADD_POST = '/profile/ADD_POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'profile/SET_USER_STATUS';
const SET_IS_FETCHING = 'profile/SET_IS_FETCHING';
const SET_USER_PHOTO = 'profile/SET_USER_PHOTO';

export const initialState = {
    postsData: [
        {id: 1, text: 'Hello', name: 'Vsevolod', likeCount: 1},
        {id: 2, text: 'Hello', name: 'Ekaterina', likeCount: 3}
    ],
    userProfile: null,
    userStatus: "",
    isFetching: false
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                postsData: [...state.postsData, {
                        id: state.postsData.length + 1,
                        text: action.message,
                        name: 'Vsevolod',
                        likeCount: '0'
                    }
                ],
                newPostValue: ''
            }
        }

        case SET_USER_PROFILE:
            return {...state, userProfile: action.userProfile};

        case SET_USER_STATUS:
            return {...state, userStatus: action.userStatus};

        case SET_IS_FETCHING:
            return {...state, isFetching: action.isFetching};

        case SET_USER_PHOTO:
            return {...state, userProfile: {...state.userProfile, photos: {...action.photos}}};

        default:
            return state;
    }
};

export const addPost = message => ({type: ADD_POST, message});
export const setUserProfile = userProfile => ({type: SET_USER_PROFILE, userProfile});
export const setUserStatus = userStatus => ({type: SET_USER_STATUS, userStatus}); 
export const setIsFetching = isFetching => ({type: SET_IS_FETCHING, isFetching});
export const resetPost = () => ({type: RESET_FORM});
export const setUserPhoto = photos => ({type: SET_USER_PHOTO, photos});

export const getUserProfileThunkCreator = userId => async dispatch => {
    dispatch(setIsFetching(true));

    const response = await profileAPI.getUserProfile(userId);

    dispatch(setUserProfile(response));
    dispatch(setIsFetching(false));
};

export const getUserStatusThunkCreator = userId => async dispatch => {
    dispatch(setIsFetching(true));

    const response = await profileAPI.getUserStatus(userId);

    dispatch(setUserStatus(response));
    dispatch(setIsFetching(false));
};

export const updateUserStatusThunkCreator = status => async dispatch => {
    const response = await profileAPI.updateUserStatus(status);

    if(response.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
};

export const setUserPhotoThunkCreator = photo => async dispatch => {
    const response = await profileAPI.updateUserPhoto(photo);

    if(response.resultCode === 0) {
        dispatch(setUserPhoto(response.data.photos));
    }
};

export const saveUserProfileThunkCreator = userInfo => async (dispatch, getState) => {
    const userId = getState().profile.userProfile.userId;

    const responseSaveProfile = await profileAPI.saveUserProfile(userInfo);
    
    if (responseSaveProfile.resultCode === 0) {
        const responseGetProfile = await profileAPI.getUserProfile(userId);
        dispatch(setUserProfile(responseGetProfile));
    } else {
        dispatch(stopSubmit("edit-profile", {_error: responseSaveProfile.messages}));
        
        return Promise.reject(responseSaveProfile.messages);
    }
};

export default profileReducer;