import { MEMES_LIST_SUCCESS, MEMES_LIST_REQUEST, MEMES_LIST_FAIL, UPLOAD_MEM_REQUEST, UPLOAD_MEM_SUCCESS, UPLOAD_MEM_FAIL } from "../constants/memesConstants";
import * as types from '../@types/memesTypes';

const initialState = {
    loading: true,
    memes: []
}

export const getMemesReducer = (state: types.MemState = initialState, action: types.MemesAction) => {
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

export const uploadMemReducer = (state: types.MemState = initialState, action: types.MemesAction) => {
    switch(action.type) {
        case UPLOAD_MEM_REQUEST:
            return { loading: true };
        case UPLOAD_MEM_SUCCESS:
            return { ...state, loading: false, memes: action.payload};
        case UPLOAD_MEM_FAIL:
            return { ...state, loading: false, memes: action.payload};
    }
}