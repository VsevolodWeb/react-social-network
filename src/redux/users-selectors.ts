// import { createSelector } from "reselect";
import {AppStateType} from "./redux-store"

export const getUsers = (state: AppStateType) => state.users.list
export const getUsersIsFollowingArray = (state: AppStateType) => state.users.isFollowing
export const getUsersIsFetching = (state: AppStateType) => state.users.isFetching
export const getUsersFilter = (state: AppStateType) => state.users.filter
export const getUsersPageSize = (state: AppStateType) => state.users.pageSize

// Reselect selector example with difficult logic
// export const getUsersSuperSelector = createSelector(getUsers, users => {
//     return users.filter(() => true);
// });