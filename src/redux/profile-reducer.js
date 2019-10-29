import { profileAPI } from './../api/api';


const ADD_POST = 'ADD-POST';
const POST_CHANGE = 'POST-CHANGE';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_USER_STATUS = 'SET-USER-STATUS';
const SET_IS_FETCHING = 'SET-IS-FETCHING';

const initialState = {
    postsData: [
        {id: 1, text: 'Hello', name: 'Vsevolod', likeCount: 1},
        {id: 2, text: 'Hello', name: 'Ekaterina', likeCount: 3}
    ],
    newPostValue: '',
    userProfile: null,
    userStatus: null,
    isFetching: false
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

        case SET_IS_FETCHING:
            return {...state, isFetching: action.isFetching}

        default:
            return state;
    }
};

export const addPost= () => ({type: ADD_POST});
export const updateNewPost = (value) => ({type: POST_CHANGE, value});
export const setUserProfile = (userProfile) => ({type: SET_USER_PROFILE, userProfile});
export const setUserStatus = (userStatus) => ({type: SET_USER_STATUS, userStatus});
export const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching});

export const getUserProfileThunkCreator = userId => dispatch => {
    dispatch(setIsFetching(true));
    profileAPI.getUserProfile(userId).then(response => {
        dispatch(setUserProfile(response));
        dispatch(setIsFetching(false));
    });
}

export const getUserStatusThunkCreator = userId => dispatch => {
    dispatch(setIsFetching(true));
    profileAPI.getUserStatus(userId).then(response => {
        dispatch(setUserStatus(response));
        dispatch(setIsFetching(false));
    });
}

export default profileReducer;