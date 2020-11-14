import {AppStateType} from "./redux-store"

export const getProfileIsFetching = (state: AppStateType) => state.profile.isFetching
export const getUserProfile = (state: AppStateType) => state.profile.userProfile
export const getUserProfilePhotos = (state: AppStateType) => state.profile.userProfile?.photos
export const getUserStatus = (state: AppStateType) => state.profile.userStatus
export const getPostsData = (state: AppStateType) => state.profile.postsData