import {GetItemsType, instance} from "./api";

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
    },
    followUser(userId: number) {
        return instance.post(`follow/${userId}`).then(response => response.data);
    },
    unfollowUser(userId: number) {
        return instance.delete(`follow/${userId}`).then(response => response.data);
    }
};