import { AxiosResponse } from "axios"

export interface User {
    _id: string
    name: string
    email: string
    isAdmin: boolean
    token: string
}

export interface Credentials {
    email: string
    password: string
}

export type UserAction = {
    type: string
    payload?: Credentials | AxiosResponse | string
}

export type UserState = {
    userInfo: {
        _id: string
        name: string
        email: string
        isAdmin: boolean
        token: string
    }
    loading: Boolean
    error: string | null
}

export type DispatchType = (args: UserAction) => UserAction