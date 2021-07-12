import { AxiosResponse } from "axios"

export interface Mem {
    _id: string
    title: string
    description: string
    creatorId: string
    creatorName: string
    file: string
    likes: string[]
    createdAt: Date
}

export type MemState = {
    memes: Mem[]
    loading: Boolean
    error: string | null
}

export type MemesAction = {
    type: string
    payload?: Mem | AxiosResponse | string
}

export type DispatchType = (args: MemesAction) => MemesAction

export type NewMem = {
    title: string
    description: string
    image: string
}