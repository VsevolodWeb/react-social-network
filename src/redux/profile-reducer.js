import { profileAPI } from './../api/api';


const ADD_POST = 'ADD-POST';
const POST_CHANGE = 'POST-CHANGE';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_USER_STATUS = 'SET-USER-STATUS';

const initialState = {
    postsData: [
        {id: 1, text: 'Hello', name: 'Vsevolod', likeCount: 1},
        {id: 2, text: 'Hello', name: 'Ekaterina', likeCount: 3}
    ],
    newPostValue: '',
    userProfile: null,
    userStatus: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                postsData: [...state.postsData,
                    {
                        id: '' + state.postsData.length + 1,
                        text: state.newPostValue,
                        name: 'Vsevolod',
                        likeCount: '0'
                    }
                ],
                newPostValue: ''
            }
        }

        case POST_CHANGE:
            return {
                ...state,
                newPostValue: action.value
            }

        case SET_USER_PROFILE:
            return {...state, userProfile: action.userProfile}

        case SET_USER_STATUS:
            return {...state, userStatus: action.userStatus}

        default:
            return state;
    }
};

export const addPost= () => ({type: ADD_POST});
export const updateNewPost = (value) => ({type: POST_CHANGE, value});
export const setUserProfile = (userProfile) => ({type: SET_USER_PROFILE, userProfile});
export const setUserStatus = (userStatus) => ({type: SET_USER_STATUS, userStatus});

export const getUserProfileThunkCreator = userId => dispatch => {
    profileAPI.getUserProfile(userId).then(response => {
        dispatch(setUserProfile(response));
    });
}

export const getUserStatusThunkCreator = userId => dispatch => {
    profileAPI.getUserStatus(userId).then(response => {
        dispatch(setUserStatus(response));
    });
}

export default profileReducer;