import { authMeThunkCreator } from "./auth-reducer";

const SET_INITIALIZATION = 'app/SET_INITIALIZATION';

const initialState = {
    initialization: false
};

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_INITIALIZATION:
            return {
                ...state,
                initialization: true
            };

        default:
            return state;
    }
};

export const setUserData = () => ({type: SET_INITIALIZATION});

export const initializeThunkCreator = () => dispatch => {
    const promiseAuthMe = dispatch(authMeThunkCreator());

    Promise.all([promiseAuthMe]).then(() => {
        dispatch(setUserData());
    });
};

export default appReducer;