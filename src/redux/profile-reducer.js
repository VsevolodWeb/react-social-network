import { profileAPI } from './../api/api';
import {RESET_FORM} from './actions/actions'

const ADD_POST = '/profile/ADD_POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'profile/SET_USER_STATUS';
const SET_IS_FETCHING = 'profile/SET_IS_FETCHING';

export const initialState = {
    postsData: [
        {id: 1, text: 'Hello', name: 'Vsevolod', likeCount: 1},
        {id: 2, text: 'Hello', name: 'Ekaterina', likeCount: 3}
    ],
    userProfile: null,
    userStatus: "",
    isFetching: false
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                postsData: [...state.postsData, {
                        id: state.postsData.length + 1,
                        text: action.message,
                        name: 'Vsevolod',
                        likeCount: '0'
                    }
                ],
                newPostValue: ''
            }
        }

        case SET_USER_PROFILE:
            return {...state, userProfile: action.userProfile};

        case SET_USER_STATUS:
            return {...state, userStatus: action.userStatus};

        case SET_IS_FETCHING:
            return {...state, isFetching: action.isFetching};

        default:
            return state;
    }
};

export const addPost = message => ({type: ADD_POST, message});
export const setUserProfile = userProfile => ({type: SET_USER_PROFILE, userProfile});
export const setUserStatus = userStatus => ({type: SET_USER_STATUS, userStatus}); 
export const setIsFetching = isFetching => ({type: SET_IS_FETCHING, isFetching});
export const resetPost = () => ({type: RESET_FORM});

export const getUserProfileThunkCreator = userId => async dispatch => {
    dispatch(setIsFetching(true));

    const response = await profileAPI.getUserProfile(userId);

    dispatch(setUserProfile(response));
    dispatch(setIsFetching(false));
};

export const getUserStatusThunkCreator = userId => async dispatch => {
    dispatch(setIsFetching(true));

    const response = await profileAPI.getUserStatus(userId);

    dispatch(setUserStatus(response));
    dispatch(setIsFetching(false));
};

export const updateUserStatusThunkCreator = status => async dispatch => {
    const response = await profileAPI.updateUserStatus(status);

    if(response.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
};

export default profileReducer;