export interface User {
    readonly _id: string
    readonly name: string
    readonly email: string
    readonly avatar: string | null
    readonly isAdmin: boolean
    readonly token: string
    readonly livechat_projectID: string
    readonly livechat_chatID: string
    readonly livechat_chatAccessKey: string
}

export interface LoginCredentials {
    email: string
    password: string
}

export interface NewUserData {
    email: string
    password: string
    name: string
}

export interface Avatar {
    image: string
}

export interface EditUserState {
    loading: boolean
    error?: string
    result: string | null
}

export interface UserState {
    userInfo: User | null
    loading: Boolean
    error?: string | null
}

export type UserAction = {
    type: string
    payload?: User | NewUserData | LoginCredentials | string
    error?: string | null
}

export type DispatchType = (args: UserAction) => UserAction