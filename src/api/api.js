import axios from 'axios';

export const getUsers = (currentPage, pageSize) => {
    return axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`,
        { withCredentials: true }
    )
}

export const followUserAPI = (userId) => {
    return axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {},
        { withCredentials: true, headers: {'API-KEY': 'f4fb83b9-f067-4c31-96d0-e1f4603aae4d'} }
    )
}

export const unfollowUserAPI = (userId) => {
    return axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {},
        { withCredentials: true, headers: {'API-KEY': 'f4fb83b9-f067-4c31-96d0-e1f4603aae4d'} }
    )
}