import {authMeThunkCreator} from "./auth-reducer";
import {Dispatch} from "redux";

const SET_INITIALIZATION = 'app/SET_INITIALIZATION';

type InitialStateType = {
    initialization: boolean
}

const initialState: InitialStateType = {
    initialization: false
};

type ActionsTypes = SetInitializationActionType;

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

type SetInitializationActionType = {
    type: typeof SET_INITIALIZATION
}

export const setInitialization = (): SetInitializationActionType => ({type: SET_INITIALIZATION});

export const initializeThunkCreator = () => (dispatch: Dispatch<ActionsTypes> | any) => {
    const promiseAuthMe = dispatch(authMeThunkCreator());

    Promise.all([promiseAuthMe]).then(() => {
        dispatch(setInitialization());
    });
};

export default appReducer;