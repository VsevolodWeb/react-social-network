import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'f4fb83b9-f067-4c31-96d0-e1f4603aae4d'
    },
    withCredentials: true
});

export const getUsers = (currentPage, pageSize) => {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
}

export const followUserAPI = (userId) => {
    return instance.post(`follow/${userId}`).then(response => response.data);
}

export const unfollowUserAPI = (userId) => {
    return instance.delete(`follow/${userId}`).then(response => response.data);
}

export const getUserProfile = (userId) => {
    return instance.get(`profile/${userId}`).then(response => response.data);
}

export const authMe = () => {
    return  instance.get('auth/me').then(response => response.data);
}