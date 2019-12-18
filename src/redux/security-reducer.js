import { securityAPI } from './../api/api';

const GET_CAPTCHA = '/security/GET_CAPTCHA';

export const initialState = {
    captchaURL: null
};

const securityReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CAPTCHA:
            return {...state, captchaURL: action.captchaURL};

        default:
            return state;
    }
};

export const getCaptcha = captchaURL => ({type: GET_CAPTCHA, captchaURL});

export const getCaptchaThunkCreator = () => async dispatch => {
    const response = await securityAPI.getCaptcha();
    dispatch(getCaptcha(response.data.url));
};

export default securityReducer;