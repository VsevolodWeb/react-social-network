export type PhotosType = {
    small: string
    large: string
}

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

export type ProfileContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    fullName: string
    contacts: ProfileContactsType
    photos: PhotosType
}

export type MessageType = {
    message: string
    photo: string
    userId?: number
    userName: string
}

export type DialogType = {
    id: number
    name: string
    messages: Array<MessageType>
}