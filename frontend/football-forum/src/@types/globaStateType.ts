import * as memesTypes from './memesTypes';

type stateType = {
    memes: {
        memes: memesTypes.Mem[],
        loading: Boolean
        error: string
    }
}

export default stateType;