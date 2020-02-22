import { usersAPI } from '../api/api';
import { updateObjectInArray } from "../utils/object-helpers";
import {UserType} from "./types/types";


const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_IS_FETCHING = 'users/SET_IS_FETCHING';
const SET_IS_FOLLOWING = 'users/SET_IS_FOLLOWING';


const initialState = {
    list: [] as Array<UserType>,
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    isFollowing: [] as Array<number>
};

export type UsersInitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: any): UsersInitialStateType => {
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

type SetUsersType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersType => ({type: SET_USERS, users});
type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    value: number
}
export const setCurrentPage = (value: number): SetCurrentPageType => ({type: SET_CURRENT_PAGE, value});
type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountType => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});
type FollowType = {
    type: typeof FOLLOW
    userId: number
}
export const follow = (userId: number): FollowType => ({type: FOLLOW, userId});
type UnfollowType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollow = (userId: number): UnfollowType => ({type: UNFOLLOW, userId});
type SetIsFetchingType = {
    type: typeof SET_IS_FETCHING
    isFetching: boolean
}
export const setIsFetching = (isFetching: boolean): SetIsFetchingType => ({type: SET_IS_FETCHING, isFetching});
type SetIsFollowingType = {
    type: typeof SET_IS_FOLLOWING
    userId: number
    isFetching: boolean
}
export const setIsFollowing = (userId: number, isFetching: boolean): SetIsFollowingType => ({type: SET_IS_FOLLOWING, userId, isFetching});

export const getUsersThunkCreator = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    const response = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(setTotalUsersCount(response.totalCount));
    dispatch(setUsers(response.items));
    dispatch(setIsFetching(false));
};

const toggleFollowingUser = async (apiMethod: any, actionCreator: any, userId: number, dispatch: any) => {
    dispatch(setIsFollowing(userId, true));

    const response = await apiMethod(userId);

    if(response.resultCode === 0) {
        dispatch(actionCreator(userId));
        dispatch(setIsFollowing(userId, false));
    }
};

export const followThunkCreator = (userId: number) => (dispatch: any) => toggleFollowingUser(usersAPI.followUser, follow, userId, dispatch);
export const unfollowThunkCreator = (userId: number) => (dispatch: any) => toggleFollowingUser(usersAPI.unfollowUser, unfollow, userId, dispatch);

export default usersReducer;