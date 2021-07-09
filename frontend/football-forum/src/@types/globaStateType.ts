import * as memesTypes from './memesTypes';

type stateType = {
    memes: {
        memes: memesTypes.Mem[],
        loading: Boolean
        error: string
    }
    userSignin: {
        userInfo: {
            _id: string
            name: string
            email: string
            isAdmin: boolean
            token: string
        }
        loading: Boolean
        error: string
    },
}

export default stateType;