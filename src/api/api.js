import axios from "axios"
const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY" : "5efbb58c-ec6f-4a90-851d-e64b5a7fc94b"},
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
})
export const getUsers = async (page, pageSize) => {
    const res = await instance.get(`users?page=${page}&count=${pageSize}`)
    return res.data
}
export const followApi = async (id) => {
    const res = await instance.post(`follow/${id}`)
    return res.data
}
export const unFollowApi = async (id) => {
    const res = await instance.delete(`follow/${id}`)
    return res.data
}
export const userProfileApi = async (id) => {
    const res = await instance.get(`profile/${id}`)
    return res.data
}
export const authApi = async () => {
    const res = await instance.get(`auth/me/`)
    return res.data
}
export const getStatusProfile = async (id) => {
    const res = await instance.get(`profile/status/${id}`)
    return res.data
}
export const updateStatusProfile = async (status) => {
    const res = await instance.put(`profile/status/`, { status })
    return res.data
}
export const loginAuth = async (email,password,rememberMe,captcha) => {
    console.log({email,password,rememberMe,captcha});
    const res = await instance.post(`/auth/login/`, { email, password, rememberMe, captcha })
    return res.data
}
export const logoutAuth = async () => {
    const res = await instance.delete(`/auth/login/`)
    return res.data
}
export const updatePhoto = async (photo) => {
    let data = new FormData()
    data.append('image', photo)
    const res = await instance.put(`/profile/photo`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return res.data
}
export const safeProfileData = async (data) => {
    console.log(data);
    const res = await instance.put('profile', data)
    return res.data
}
export const getCaptcha = async () => {
    const res = await instance.get(`/security/get-captcha-url`)
    return res.data
}
