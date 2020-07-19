import {GetItemsType, instance, ResponseType} from './api'

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number, term: string) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`)
            .then(response => response.data)
    },
    followUser(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`).then(response => response.data)
    },
    unfollowUser(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`).then(response => response.data)
    }
}