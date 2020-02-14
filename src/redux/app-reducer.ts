import { authMeThunkCreator } from "./auth-reducer";

const SET_INITIALIZATION = 'app/SET_INITIALIZATION';

type InitialStateType = {
    initialization: boolean
}

const initialState: InitialStateType = {
    initialization: false
};

const appReducer = (state = initialState, action: any): InitialStateType => {
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

type SetUserDataActionType = {
    type: typeof SET_INITIALIZATION
}

export const setUserData = (): SetUserDataActionType => ({type: SET_INITIALIZATION});

export const initializeThunkCreator = () => (dispatch: any) => {
    const promiseAuthMe = dispatch(authMeThunkCreator());

    Promise.all([promiseAuthMe]).then(() => {
        dispatch(setUserData());
    });
};

export default appReducer;