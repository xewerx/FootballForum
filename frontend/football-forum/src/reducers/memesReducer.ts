import { MEMES_LIST_SUCCESS, MEMES_LIST_REQUEST, MEMES_LIST_FAIL } from "../constants/memesConstants";
import * as types from "../types/memesTypes";

const initialState = {
    loading: true,
    memes: []
}

export const memesReducer = (state: types.MemState = initialState, action: types.MemesAction) => {
    switch(action.type) {
        case MEMES_LIST_REQUEST:
            return { loading: true };
        case MEMES_LIST_SUCCESS:
            return { loading: false, memes: action.payload };
        case MEMES_LIST_FAIL:
            return { loading: false, memes: action.error };
        default:
            return state;
    }
}