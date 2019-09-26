const SET_USERS = 'SET-USERS';
const SHOW_MORE = 'SHOW-MORE';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';


const initialState = {
    list: [],
    pageSize: 30,
    totalUsersCount: 0
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                list: [...state.list, ...action.users]
            }

        case SHOW_MORE: {
            return state;
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

        default:
            return state; 
    }
};

export const setUsersActionCreator = (users) => ({type: SET_USERS, users});
export const showMoreActionCreator = () => ({type: SHOW_MORE});
export const followActionCreator = (userId) => ({type: FOLLOW, userId});
export const unfollowActionCreator = (userId) => ({type: UNFOLLOW, userId});

export default usersReducer;