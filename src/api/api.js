import axios from "axios"
const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY" : "5efbb58c-ec6f-4a90-851d-e64b5a7fc94b"},
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
})
export const getUsers = (page, pageSize) => {
    return instance.get(`users?page=${page}&count=${pageSize}`).then(res => res.data)
}
export const followApi = (id) => {
    return instance.post(`follow/${id}`).then(res => res.data)
}
export const unFollowApi = (id) => {
    return instance.delete(`follow/${id}`).then(res => res.data)
}
export const userProfileApi = (id) => {
    return instance.get(`profile/${id}`).then(res => res.data)
}
export const authApi = () => {
    return instance.get(`auth/me/`).then(res => res.data)
}
export const getStatusProfile = (id) => {
    return instance.get(`profile/status/${id}`).then(res => res.data)
}
export const updateStatusProfile = (status) => {
    return instance.put(`profile/status/`, {status}).then(res => res.data)
}
export const loginAuth = (email,password,rememberMe) => {
    return instance.post(`/auth/login/`, {email,password,rememberMe}).then(res => res.data)
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
