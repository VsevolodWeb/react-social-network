import { stopSubmit } from 'redux-form';

import { profileAPI } from '../api/api';
import { RESET_FORM } from './actions/actions'
import {PhotosType} from "./types/types";
import {Dispatch} from "redux";
import {AppStateType} from "./redux-store";

const ADD_POST = '/profile/ADD_POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'profile/SET_USER_STATUS';
const SET_IS_FETCHING = 'profile/SET_IS_FETCHING';
const SET_USER_PHOTO = 'profile/SET_USER_PHOTO';

type PostType = {
    id: number
    text: string
    name: string
    likeCount: number
}
type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

export const initialState = {
    postsData: [
        {id: 1, text: 'Hello', name: 'Vsevolod', likeCount: 1},
        {id: 2, text: 'Hello', name: 'Ekaterina', likeCount: 3}
    ] as Array<PostType>,
    userProfile: null as ProfileType | null,
    userStatus: "",
    isFetching: false
};

type InitialStateType = typeof initialState
type ActionsTypes = AddPostType | SetUserProfileType | SetUserStatusType | SetIsFetchingType | resetFormType | SetUserPhotoType;

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                postsData: [...state.postsData, {
                        id: state.postsData.length + 1,
                        text: action.message,
                        name: 'Vsevolod',
                        likeCount: 0
                    }
                ]
            }
        }

        case SET_USER_PROFILE:
            return {...state, userProfile: action.userProfile};

        case SET_USER_STATUS:
            return {...state, userStatus: action.userStatus};

        case SET_IS_FETCHING:
            return {...state, isFetching: action.isFetching};

        case SET_USER_PHOTO:
            return {...state, userProfile: {...state.userProfile, photos: {...action.photos}} as ProfileType};

        default:
            return state;
    }
};

type AddPostType = {
    type: typeof ADD_POST
    message: string
}
export const addPost = (message: string): AddPostType => ({type: ADD_POST, message});

type SetUserProfileType = {
    type: typeof SET_USER_PROFILE
    userProfile: ProfileType
}
export const setUserProfile = (userProfile: ProfileType): SetUserProfileType => ({type: SET_USER_PROFILE, userProfile});

type SetUserStatusType = {
    type: typeof SET_USER_STATUS
    userStatus: string
}
export const setUserStatus = (userStatus: string): SetUserStatusType => ({type: SET_USER_STATUS, userStatus});

type SetIsFetchingType = {
    type: typeof SET_IS_FETCHING
    isFetching: boolean
}
export const setIsFetching = (isFetching: boolean): SetIsFetchingType => ({type: SET_IS_FETCHING, isFetching});

type resetFormType = {
    type: typeof RESET_FORM
}
export const resetForm = (): resetFormType => ({type: RESET_FORM});

type SetUserPhotoType = {
    type: typeof SET_USER_PHOTO
    photos: PhotosType
}
export const setUserPhoto = (photos: PhotosType): SetUserPhotoType => ({type: SET_USER_PHOTO, photos});

export const getUserProfileThunkCreator = (userId: number) => async (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(setIsFetching(true));

    const response = await profileAPI.getUserProfile(userId);

    dispatch(setUserProfile(response));
    dispatch(setIsFetching(false));
};

export const getUserStatusThunkCreator = (userId: number) => async (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(setIsFetching(true));

    const response = await profileAPI.getUserStatus(userId);

    dispatch(setUserStatus(response));
    dispatch(setIsFetching(false));
};

export const updateUserStatusThunkCreator = (status: string) => async (dispatch: Dispatch<ActionsTypes>) => {
    const response = await profileAPI.updateUserStatus(status);

    if(response.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
};

export const setUserPhotoThunkCreator = (photo: PhotosType) => async (dispatch: Dispatch<ActionsTypes>) => {
    const response = await profileAPI.updateUserPhoto(photo);

    if(response.resultCode === 0) {
        dispatch(setUserPhoto(response.data.photos));
    }
};

export const saveUserProfileThunkCreator = (userInfo: ProfileType) => async (dispatch: Dispatch<ActionsTypes>, getState: () => AppStateType) => {
    const userProfile = getState().profile.userProfile;
    if(!userProfile) return;

	const userId = userProfile.userId;

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