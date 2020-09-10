import {AppStateType} from "./redux-store"

export const getSecurityCaptchaURL = (state: AppStateType) => state.security.captchaURL