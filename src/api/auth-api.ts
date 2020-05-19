import {instance} from "./api"


enum AuthResultCodesWithCaptcha {
    CaptchaIsRequired = 10
}

export enum AuthResultCodesEnum {
    Success = 0,
    Error = 1
}

type AuthLoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: null | string
}
type AuthMeType = {
    resultCode: AuthResultCodesEnum
    messages: Array<string>
    data: {
        id: number
        email: string
        login: string
    }
}
type AuthLoginType = {
    resultCode: AuthResultCodesEnum | AuthResultCodesWithCaptcha
    messages: Array<string>
    data: {
        userId: number
    }
}
type AuthLogoutType = {
    resultCode: AuthResultCodesEnum
    messages: Array<string>
    data: {}
}
export const authAPI = {
    authMe() {
        return instance.get<AuthMeType>('auth/me').then(response => response.data)
    },
    authLogin(formData: AuthLoginFormDataType) {
        return instance.post<AuthLoginType>('auth/login', {...formData}).then(response => response.data)
    },
    authLogout() {
        return instance.delete<AuthLogoutType>('auth/login').then(response => response.data)
    }
}