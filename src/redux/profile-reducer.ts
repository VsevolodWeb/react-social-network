import {stopSubmit} from 'redux-form'

import {RESET_FORM} from './actions/actions'
import {PhotosType, ProfileType} from './types/types'
import {Dispatch} from "redux"
import {AppStateType, InferActionsTypes} from './redux-store'
import {profileAPI} from "../api/profile-api";


export type PostType = {
    id: number
    text: string
    name: string
    likeCount: number
}

export const PostsData: Array<PostType> = [
    {id: 1, text: 'Hello', name: 'Vsevolod', likeCount: 1},
    {id: 2, text: 'Hello', name: 'Ekaterina', likeCount: 3}
]

export const initialState = {
    postsData: PostsData,
    userProfile: null as ProfileType | null,
    userStatus: '',
    isFetching: false
};

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "profile/ADD_POST": {
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

        case "profile/SET_USER_PROFILE":
            return {...state, userProfile: action.userProfile}

        case "profile/SET_USER_STATUS":
            return {...state, userStatus: action.userStatus}

        case "profile/SET_IS_FETCHING":
            return {...state, isFetching: action.isFetching}

        case "profile/SET_USER_PHOTO":
            return {...state, userProfile: {...state.userProfile, photos: {...action.photos}} as ProfileType}

        default:
            return state
    }
}

export const actions = {
    addPost: (message: string) => ({type: "profile/ADD_POST", message} as const),
    setUserProfile: (userProfile: ProfileType) => ({type: "profile/SET_USER_PROFILE", userProfile} as const),
    setUserStatus: (userStatus: string) => ({type: "profile/SET_USER_STATUS", userStatus} as const),
    setIsFetching: (isFetching: boolean) => ({type: "profile/SET_IS_FETCHING", isFetching} as const),
    resetForm: () => ({type: RESET_FORM} as const),
    setUserPhoto: (photos: PhotosType) => ({type: "profile/SET_USER_PHOTO", photos} as const)
}

export const getUserProfileThunkCreator = (userId: number) => async (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(actions.setIsFetching(true))

    const response = await profileAPI.getUserProfile(userId)

    dispatch(actions.setUserProfile(response))
    dispatch(actions.setIsFetching(false))
}

export const getUserStatusThunkCreator = (userId: number) => async (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(actions.setIsFetching(true))

    const response = await profileAPI.getUserStatus(userId)

    dispatch(actions.setUserStatus(response))
    dispatch(actions.setIsFetching(false))
}

export const updateUserStatusThunkCreator = (status: string) => async (dispatch: Dispatch<ActionsTypes>) => {
    const response = await profileAPI.updateUserStatus(status)

    if(response.resultCode === 0) {
        dispatch(actions.setUserStatus(status))
    }
}

export const setUserPhotoThunkCreator = (photo: File) => async (dispatch: Dispatch<ActionsTypes>) => {
    const response = await profileAPI.updateUserPhoto(photo)

    if(response.resultCode === 0) {
        dispatch(actions.setUserPhoto(response.data.photos))
    }
}

export const saveUserProfileThunkCreator = (userInfo: ProfileType) => async (dispatch: Dispatch<ActionsTypes>, getState: () => AppStateType) => {
    const userProfile = getState().profile.userProfile
    if(!userProfile) return

	const userId = userProfile.userId

    const responseSaveProfile = await profileAPI.saveUserProfile(userInfo)

    if (responseSaveProfile.resultCode === 0) {
        const responseGetProfile = await profileAPI.getUserProfile(userId)
        dispatch(actions.setUserProfile(responseGetProfile))
    } else {
        dispatch(stopSubmit("edit-profile", {_error: responseSaveProfile.messages}))

        return Promise.reject(responseSaveProfile.messages)
    }
}

export default profileReducer