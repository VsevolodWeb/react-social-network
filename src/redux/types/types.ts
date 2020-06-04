export type PhotosType = {
    small: string | null
    large: string | null
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

export type DialogType = {
    id: number
    name: string
    messages: Array<{id: number, text: string, from: string}>
}