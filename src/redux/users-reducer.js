const SET_USERS = 'SET-USERS';
const SHOW_MORE = 'SHOW-MORE';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';

const initialState = {
    users: [
        {
            id: '1',
            fullName: 'Volodya Smirnov',
            location: {city: 'Velikie Luki', country: 'Russia'},
            status: 'Ya rodilsya!',
            followed: 'false'
        },
        {
            id: '2',
            fullName: 'Kseniya',
            location: {city: 'Chicago', country: 'USA'},
            status: 'OMG!',
            followed: 'true'
        }
    ]
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: [...state.users, ...action.users]
            }

        case SHOW_MORE: {
            return state;
        }

        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(user => {
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
                users: state.users.map(user => {
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

export const setUsersActionCreator = (users) => ({type: SHOW_MORE, users});
export const showMoreActionCreator = (id) => ({type: SHOW_MORE});
export const followActionCreator = (userId) => ({type: FOLLOW, userId});
export const unfollowActionCreator = (userId) => ({type: UNFOLLOW, userId});

export default usersReducer;