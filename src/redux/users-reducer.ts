import {updateObjectInArray} from "../utils/object-helpers"
import {UserType} from "./types/types"
import {InferActionsTypes} from "./redux-store"
import {Dispatch} from "redux"
import {usersAPI} from "../api/users-api"


const initialState = {
    list: [] as Array<UserType>,
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    isFollowing: [] as Array<number>
}

export type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

export const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SET_USERS":
            return {
                ...state,
                list: [...action.users]
            }

        case "SET_CURRENT_PAGE": {
            return {...state, currentPage: action.value}
        }

        case "SET_TOTAL_USERS_COUNT": {
            return {...state, totalUsersCount: action.totalUsersCount}
        }

        case "FOLLOW": {
            return {
                ...state,
                list: updateObjectInArray(state.list, action.userId, "id", {followed: true})
            }
        }

        case "UNFOLLOW": {
            return {
                ...state,
                list: updateObjectInArray(state.list, action.userId, "id", {followed: false})
            }
        }

        case "SET_IS_FETCHING": {
            return {...state, isFetching: action.isFetching}
        }

        case "SET_IS_FOLLOWING": {
            return {
                ...state,
                isFollowing: action.isFetching ? [...state.isFollowing, action.userId] : state.isFollowing.filter(item => item !== action.userId)
            }
        }

        default:
            return state
    }
}

export const actions = {
    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
    setCurrentPage: (value: number) => ({type: 'SET_CURRENT_PAGE', value} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: 'SET_TOTAL_USERS_COUNT',
        totalUsersCount
    } as const),
    follow: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollow: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setIsFetching: (isFetching: boolean) => ({type: 'SET_IS_FETCHING', isFetching} as const),
    setIsFollowing: (userId: number, isFetching: boolean) => ({
        type: 'SET_IS_FOLLOWING',
        userId,
        isFetching
    } as const)
}


export const getUsersThunkCreator = (currentPage: number, pageSize: number) => async (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(actions.setIsFetching(true))
    const response = await usersAPI.getUsers(currentPage, pageSize)

    dispatch(actions.setTotalUsersCount(response.totalCount))
    dispatch(actions.setUsers(response.items))
    dispatch(actions.setIsFetching(false))
}


type toggleFollowingUserApiResponseType = {
    resultCode: number
    messages: Array<string>
}
const toggleFollowingUser = async (apiMethod: (userId: number) => Promise<toggleFollowingUserApiResponseType>,
                                   actionCreator: typeof actions.follow | typeof actions.unfollow,
                                   userId: number, dispatch: Dispatch<ActionsTypes>) => {

    dispatch(actions.setIsFollowing(userId, true))

    const response = await apiMethod(userId)
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId))
        dispatch(actions.setIsFollowing(userId, false))
    }
}

export const followThunkCreator = (userId: number) =>
	async (dispatch: Dispatch<ActionsTypes>) => (
		await toggleFollowingUser(usersAPI.followUser, actions.follow, userId, dispatch)
	)

export const unfollowThunkCreator = (userId: number) =>
	async (dispatch: Dispatch<ActionsTypes>) => (
		await toggleFollowingUser(usersAPI.unfollowUser, actions.unfollow, userId, dispatch)
	)

export default usersReducer