import {usersAPI} from '../api/api';
import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "./types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {Dispatch} from "redux";


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

type ActionsTypes =
	SetUsersType
	| SetCurrentPageType
	| SetTotalUsersCountType
	| FollowType
	| UnfollowType
	| SetIsFetchingType
	| SetIsFollowingType;

const usersReducer = (state = initialState, action: ActionsTypes): UsersInitialStateType => {
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

export const actions = {
	setUsers: (users: Array<UserType>) => ({type: SET_USERS, users}),
	setCurrentPage: (value: number) => ({type: SET_CURRENT_PAGE, value}),
	setTotalUsersCount: (totalUsersCount: number) => ({
	type: SET_TOTAL_USERS_COUNT,
	totalUsersCount
}),
	follow: (userId: number) => ({type: FOLLOW, userId}),
	unfollow: (userId: number) => ({type: UNFOLLOW, userId}),
	setIsFetching: (isFetching: boolean) => ({type: SET_IS_FETCHING, isFetching}),
	setIsFollowing: (userId: number, isFetching: boolean) => ({
	type: SET_IS_FOLLOWING,
	userId,
	isFetching
})
};


export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => {
	return async dispatch => {
		const response = await usersAPI.getUsers(currentPage, pageSize);

		dispatch(setTotalUsersCount(response.totalCount));
		dispatch(setUsers(response.items));
		dispatch(setIsFetching(false));
	};


type toggleFollowingUserApiResponseType = {
	resultCode: number
	messages: Array<string>
}
const toggleFollowingUser = async (apiMethod: (userId: number) => Promise<toggleFollowingUserApiResponseType>,
                                   actionCreator,
                                   userId: number, dispatch: Dispatch<ActionsTypes>) => {

	dispatch(setIsFollowing(userId, true));

	const response = await apiMethod(userId);
	if (response.resultCode === 0) {
		dispatch(actionCreator(userId));
		dispatch(setIsFollowing(userId, false));
	}
};

export const followThunkCreator = (userId: number) => (dispatch: Dispatch<ActionsTypes>) => {
	return toggleFollowingUser(usersAPI.followUser, follow, userId, dispatch);
};

export const unfollowThunkCreator = (userId: number) => (dispatch: Dispatch<ActionsTypes>) => {
	return toggleFollowingUser(usersAPI.unfollowUser, unfollow, userId, dispatch);
};

export default usersReducer;