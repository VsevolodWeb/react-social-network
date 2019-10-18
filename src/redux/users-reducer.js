const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_IS_FETCHING = 'SET-IS-FETCHING';
const SET_IS_FOLLOWING = 'SET-IS-FOLLOWING';

const initialState = {
    list: [],
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    isFollowing: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                list: [...action.users]
            }

        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.value};
        }

        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount};
        }

        case FOLLOW: {
            return {
                ...state,
                list: state.list.map(user => {
                    if(action.userId === user.id) {
                        return {...user, followed: true}
                    }
                    return user;
                })
            }
        }

        case UNFOLLOW: {
            return {
                ...state,
                list: state.list.map(user => {
                    if(action.userId === user.id) {
                        return {...user, followed: false}
                    }
                    return user;
                })
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

export default usersReducer;