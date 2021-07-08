import { AxiosResponse } from "axios"

export interface Mem {
    _id: string
    title: string
    description: string
    creator: string
    file: string
    likes: string[]
    createdAt: Date
}

export type MemState = {
    memes: Mem[]
    loading: Boolean
}

export type MemesAction = {
    type: string
    payload?: Mem | AxiosResponse | string
    error?: string
}

export type DispatchType = (args: MemesAction) => MemesAction

export type newMem = {
    title: string
    description: string
    image: string
    creator: string
}