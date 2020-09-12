import {AppStateType} from "./redux-store"

export const getProfileIsFetching = (state: AppStateType) => state.profile.isFetching
export const getUserPhoto = (state: AppStateType) => state.profile.userProfile?.photos.large
export const getUserId = (state: AppStateType) => state.profile.userProfile?.userId