import {authMeThunkCreator} from "./auth-reducer"
import {AnyAction} from "redux"
import {InferActionsTypes} from "./redux-store"
import {ThunkDispatch} from "redux-thunk"


const initialState = {
    initialization: false
};
type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case "app/SET_INITIALIZATION":
            return {
                ...state,
                initialization: true
            };

        default:
            return state
    }
};

const actions = {
    setInitialization: () => ({type: "app/SET_INITIALIZATION"} as const)
}

export const initializeThunkCreator = () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const promiseAuthMe = dispatch(authMeThunkCreator())

    Promise.all([promiseAuthMe]).then(() => {
        dispatch(actions.setInitialization())
    });
};

export default appReducer