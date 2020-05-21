import {instance, ResponseType} from "./api";
import {ProfileType} from "../redux/types/types";


type UpdateUserPhotoType = {
    photos: {
        small: string
        large: string
    }
}

export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(response => response.data);
    },
    getUserStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(response => response.data);
    },
    updateUserStatus(status: string) {
        return instance.put<ResponseType>('profile/status', {status}).then(response => response.data);
    },
    updateUserPhoto(photo: string) {
        const formData = new FormData();
        formData.append("image", photo);

        return instance.put<ResponseType<UpdateUserPhotoType>>(`profile/photo`, formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => response.data);
    },
    saveUserProfile(userProfileData: ProfileType) {
        return instance.put<ResponseType>('profile', userProfileData).then(response => response.data);
    }
};