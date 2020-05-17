import { securityAPI } from '../api/api'
import {Dispatch} from "redux"
import {InferActionsTypes} from "./redux-store";

export const initialState = {
    captchaURL: null as null | string
};
type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

const securityReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'GET_CAPTCHA':
            return {...state, captchaURL: action.captchaURL}

        default:
            return state;
    }
};

export const actions = {
    getCaptcha: (captchaURL: string) => ({type: 'GET_CAPTCHA', captchaURL} as const)
}

export const getCaptchaThunkCreator = () => async (dispatch: Dispatch<ActionsType>) => {
    const response = await securityAPI.getCaptcha()
    dispatch(actions.getCaptcha(response.data.url))
};

export default securityReducer