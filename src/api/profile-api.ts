import {ProfileType} from "../redux/profile-reducer";
import {instance} from "./api";

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
    saveUserProfile(userProfileData: ProfileType) {
        return instance.put('profile', userProfileData).then(response => response.data);
    }
};