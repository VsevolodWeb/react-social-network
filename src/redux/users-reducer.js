import { usersAPI } from './../api/api';
import { updateObjectInArray } from "../utils/object-helpers";


const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_IS_FETCHING = 'users/SET_IS_FETCHING';
const SET_IS_FOLLOWING = 'users/SET_IS_FOLLOWING';

const initialState = {
    list: [],
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    isFollowing: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                list: [...action.users]
            };

        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.value};
        }

        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount};
        }

        case FOLLOW: {
            return {
                ...state,
                list: updateObjectInArray(state.list, action.userId, "id", {followed: true})
            }
        }

        case UNFOLLOW: {
            return {
                ...state,
                list: updateObjectInArray(state.list, action.userId, "id", {followed: false})
            }
        }

        case SET_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }

        case SET_IS_FOLLOWING: {
            return {
                ...state,
                isFollowing: action.isFetching ? [...state.isFollowing, action.userId] : state.isFollowing.filter(item => item !== action.userId)
            }
        }

        default:
            return state; 
    }
};


export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (value) => ({type: SET_CURRENT_PAGE, value});
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});
export const follow = (userId) => ({type: FOLLOW, userId});
export const unfollow = (userId) => ({type: UNFOLLOW, userId});
export const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching});
export const setIsFollowing = (userId, isFetching) => ({type: SET_IS_FOLLOWING, userId, isFetching});

export const getUsersThunkCreator = (currentPage, pageSize) => async dispatch => {
    const response = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(setTotalUsersCount(response.totalCount));
    dispatch(setUsers(response.items));
    dispatch(setIsFetching(false));
};

const toggleFollowingUser = async (apiMethod, actionCreator, userId, dispatch) => {
    dispatch(setIsFollowing(userId, true));

    const response = await apiMethod(userId);

    if(response.resultCode === 0) {
        dispatch(actionCreator(userId));
        dispatch(setIsFollowing(userId, false));
    }
};

export const followThunkCreator = userId => dispatch => toggleFollowingUser(usersAPI.followUser, follow, userId, dispatch);
export const unfollowThunkCreator = userId => dispatch => toggleFollowingUser(usersAPI.unfollowUser, unfollow, userId, dispatch);

export default usersReducer;