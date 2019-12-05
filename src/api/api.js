import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'f4fb83b9-f067-4c31-96d0-e1f4603aae4d'
    },
    withCredentials: true
});

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
    },
    followUser(userId) {
        return instance.post(`follow/${userId}`).then(response => response.data);
    },
    unfollowUser(userId) {
        return instance.delete(`follow/${userId}`).then(response => response.data);
    }
};

export const profileAPI = {
    getUserProfile(userId) {
        return instance.get(`profile/${userId}`).then(response => response.data);
    },
    getUserStatus(userId) {
        return instance.get(`profile/status/${userId}`).then(response => response.data);
    },
    updateUserStatus(status) {
        return instance.put('profile/status', {status}).then(response => response.data);
    },
    updateUserPhoto(photo) {
        return instance.put('profile/photo', {photo}).then(response => response.data);
    }
};

export const authAPI = {
    authMe() {
        return instance.get('auth/me').then(response => response.data);
    },
    authLogin(formData) {
        return instance.post('auth/login', {...formData}).then(response => response.data);
    },
    authLogout() {
        return instance.delete('auth/login').then(response => response.data);
    }
};