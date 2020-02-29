import axios from 'axios';
import {UserType} from "../redux/types/types";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'f4fb83b9-f067-4c31-96d0-e1f4603aae4d'
    },
    withCredentials: true
});

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
    },
    followUser(userId: number) {
        return instance.post(`follow/${userId}`).then(response => response.data);
    },
    unfollowUser(userId: number) {
        return instance.delete(`follow/${userId}`).then(response => response.data);
    }
};

export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get(`profile/${userId}`).then(response => response.data);
    },
    getUserStatus(userId: number) {
        return instance.get(`profile/status/${userId}`).then(response => response.data);
    },
    updateUserStatus(status: string) {
        return instance.put('profile/status', {status}).then(response => response.data);
    },
    updateUserPhoto(photo: string) {
        const formData = new FormData();
        formData.append("image", photo);

        return instance.put(`profile/photo`, formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => response.data);
    },
    saveUserProfile(userProfileData: UserType) {
        return instance.put('profile', userProfileData).then(response => response.data);
    }
};

export enum AuthResultCodesEnum {
	Success = 0,
	Error = 1,
}
export enum AuthResultCodesWithCaptcha {
	CaptchaIsRequired = 10
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
        return instance.get<AuthMeType>('auth/me').then(response => response.data);
    },
    authLogin(formData: AuthLoginFormDataType) {
        return instance.post<AuthLoginType>('auth/login', {...formData}).then(response => response.data);
    },
    authLogout() {
        return instance.delete<AuthLogoutType>('auth/login').then(response => response.data);
    }
};

export const securityAPI = {
    getCaptcha() {
        return instance.get('security/get-captcha-url');
    }
};