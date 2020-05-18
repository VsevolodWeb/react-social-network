// import { createSelector } from "reselect";
import {AppStateType} from "./redux-store"

export const getUsers = (state: AppStateType) => {
    return state.users
}

// Reselect selector example with difficult logic
// export const getUsersSuperSelector = createSelector(getUsers, users => {
//     return users.filter(() => true);
// });