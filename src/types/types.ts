export type photosType = {
    large: string|null
    small: string|null
}
export enum resultCode {
    succes = 0,
    error = 1
}
export enum captchaCode {
    succes = 0,
    error = 1,
    captcha = 10
}
export type UserType = {
    name: string
    id: number
    photos: photosType
    status: string | null
    followed: boolean
}
export type ProfileIdDataType = {
    aboutMe: string
    contacts: contactsType
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos: photosType
    userId: number
}
export type contactsType = {
    facebook: string|null
    github: string|null
    instagram: string|null
    mainLink: string|null
    twitter: string|null
    vk: string|null
    website: string|null
    youtube: string|null

}
