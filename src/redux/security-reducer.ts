import { securityAPI } from '../api/api';
import {Dispatch} from "redux";

const GET_CAPTCHA = '/security/GET_CAPTCHA';

type InitialStateType = {
	captchaURL: string | null
}
export const initialState: InitialStateType = {
    captchaURL: null
};

type ActionsType = GetCaptchaType;

const securityReducer = (state = initialState, action: ActionsType) => {
    switch(action.type) {
        case GET_CAPTCHA:
            return {...state, captchaURL: action.captchaURL};

        default:
            return state;
    }
};

type GetCaptchaType = {
    type: typeof GET_CAPTCHA
    captchaURL: string
}
export const getCaptcha = (captchaURL: string): GetCaptchaType => ({type: GET_CAPTCHA, captchaURL});

export const getCaptchaThunkCreator = () => async (dispatch: Dispatch<ActionsType>) => {
    const response = await securityAPI.getCaptcha();
    dispatch(getCaptcha(response.data.url));
};

export default securityReducer;