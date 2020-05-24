import {instance, ResponseType} from "./api"
import {PhotosType, ProfileType} from "../redux/types/types"


export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(response => response.data)
    },
    getUserStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(response => response.data)
    },
    updateUserStatus(status: string) {
        return instance.put<ResponseType>('profile/status', {status}).then(response => response.data)
    },
    updateUserPhoto(photo: File) {
        const formData = new FormData()
        formData.append("image", photo)

        return instance.put<ResponseType<{photos: PhotosType}>>(`profile/photo`, formData,
            {headers: {'Content-Type': 'multipart/form-data'}})
            .then(response => response.data)
    },
    saveUserProfile(userProfileData: ProfileType) {
        return instance.put<ResponseType>('profile', userProfileData).then(response => response.data)
    }
}