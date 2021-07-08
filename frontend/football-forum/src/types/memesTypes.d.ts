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
    payload?: Mem | string
    error?: string
}

export type DispatchType = (args: MemesAction) => MemesAction