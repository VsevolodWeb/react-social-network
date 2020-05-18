import {authMeThunkCreator, AuthMeThunkType} from "./auth-reducer"
import {Dispatch} from "redux"
import {InferActionsTypes} from "./redux-store";

const SET_INITIALIZATION = 'app/SET_INITIALIZATION'


const initialState = {
    initialization: false
};
type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

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

export const actions = {
    setInitialization: () => ({type: "app/SET_INITIALIZATION"})
}

export const initializeThunkCreator = () => (dispatch: Dispatch<ActionsTypes>) => {
    const promiseAuthMe = dispatch(authMeThunkCreator());

    Promise.all([promiseAuthMe]).then(() => {
        dispatch(actions.setInitialization());
    });
};

export default appReducer;