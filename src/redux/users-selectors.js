import { createSelector } from "reselect";


export const getUsers = state => {
    return state.users;
}

// Reselect selector example with difficult logic
export const getUsersSuperSelector = createSelector(getUsers, users => { 
    return users.filter(() => true);
});