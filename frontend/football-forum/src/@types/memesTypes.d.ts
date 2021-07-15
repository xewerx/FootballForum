export interface Mem {
    readonly _id: string
    readonly title: string
    readonly description: string
    readonly creatorId: string
    readonly creatorName: string
    readonly file: string
    readonly likes: string[]
    readonly createdAt: Date
}

export interface NewMem {
    readonly title: string
    readonly description: string
    readonly image: string
}

export interface MemState {
    memes: Mem[]
    loading: Boolean
    error?: string | null
}

export interface UploadMemState {
    loading: boolean
    response?: string
}

export type GetMemesAction = {
    type: string
    payload?: Mem[] | string
    error?: string
}

export type UploadMemAction = {
    type: string
    payload?: string
}

export type DispatchType = (args: MemesAction) => MemesAction



