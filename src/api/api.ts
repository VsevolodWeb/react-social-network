import axios from 'axios';
import {UserType} from "../redux/types/types";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'f4fb83b9-f067-4c31-96d0-e1f4603aae4d'
    },
    withCredentials: true
});


export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: null | string
}