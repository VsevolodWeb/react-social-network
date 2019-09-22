const SET_USERS = 'SET-USERS';
const SHOW_MORE = 'SHOW-MORE';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';


const initialState = {
    list: [
        {
            id: 1,
            fullName: 'Volodya Smirnov',
            location: {city: 'Velikie Luki', country: 'Russia'},
            status: 'Lorem ipsum',
            followed: false
        },
        {
            id: 2,
            fullName: 'Anastasia Ivanova',
            location: {city: 'Chicago', country: 'USA'},
            status: 'Lorem ipsum',
            followed: true
        },
        {
            id: 3,
            fullName: 'Vladimir Kutin',
            location: {city: 'New York', country: 'USA'},
            status: 'Lorem ipsum',
            followed: true
        },
        {
            id: 4,
            fullName: 'Hero Petrov',
            location: {city: 'Vitebsk', country: 'Belarus'},
            status: 'Lorem ipsum',
            followed: false
        },
        {
            id: 5,
            fullName: 'Ivan Mechnikov',
            location: {city: 'Kiev', country: 'Ukraine'},
            status: 'Lorem ipsum',
            followed: true
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