import { type } from 'os';
import { captchaCode, photosType, ProfileIdDataType, resultCode } from './../types/types';
import axios from "axios"
import { UserType } from "types/types"
const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY" : "5efbb58c-ec6f-4a90-851d-e64b5a7fc94b"},
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
})
type getUsersApiType ={
    error: string
    items: UserType[]
    totalCount:number
}
type responseType<d={},RC=resultCode|captchaCode> ={
    resultCode: RC
    fieldsErrors: string[]
    messages: string[]
    data: d
}
type authApi ={
    id:number,email:string,login:string
}
type loginAuth ={
    userId:number
}
type updatePhoto ={
    photos:photosType
}
export const getUsers = async (page:number, pageSize:number) => {
    const res = await instance.get<getUsersApiType>(`users?page=${page}&count=${pageSize}`)
    return res.data
}
export const followApi = async (id:number) => {
    const res = await instance.post<responseType>(`follow/${id}`)
    return res.data
}
export const unFollowApi = async (id:number) => {
    const res = await instance.delete<responseType>(`follow/${id}`)
    return res.data
}
export const userProfileApi = async (id:number) => {
    const res = await instance.get<ProfileIdDataType>(`profile/${id}`)
    return res.data
}
export const authApi = async () => {
    const res = await instance.get<responseType<authApi>>(`auth/me/`)
    return res.data
}
export const getStatusProfile = async (id:number) => {
    const res = await instance.get<string>(`profile/status/${id}`)
    return res.data
}
export const updateStatusProfile = async (status:string) => {
    const res = await instance.put<responseType>(`profile/status/`, { status })
    return res.data
}
export const loginAuth = async (email:string,password:string,rememberMe:boolean,captcha:string) => {
    const res = await instance.post<responseType<loginAuth>>(`/auth/login/`, { email, password, rememberMe, captcha })
    return res.data
}
export const logoutAuth = async () => {
    const res = await instance.delete<responseType>(`/auth/login/`)
    return res.data
}
export const updatePhoto = async (photo:any) => {
    let data = new FormData()
    data.append('image', photo)
    const res = await instance.put<responseType<updatePhoto>>(`/profile/photo`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return res.data
}
export const safeProfileData = async (data:ProfileIdDataType) => {
    const res = await instance.put<responseType>('profile', data)
    return res.data
}
export const getCaptcha = async () => {
    const res = await instance.get<string>(`/security/get-captcha-url`)
    return res.data
}
