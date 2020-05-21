import {instance, ResponseType} from "./api"


type AuthLoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: null | string
}
type AuthMeType = {
    id: number
    email: string
    login: string
}
type AuthLoginType = {
    userId: number
}

export const authAPI = {
    authMe() {
        return instance.get<ResponseType<AuthMeType>>('auth/me').then(response => response.data)
    },
    authLogin(formData: AuthLoginFormDataType) {
        return instance.post<ResponseType<AuthLoginType>>('auth/login', {...formData}).then(response => response.data)
    },
    authLogout() {
        return instance.delete<ResponseType>('auth/login').then(response => response.data)
    }
}