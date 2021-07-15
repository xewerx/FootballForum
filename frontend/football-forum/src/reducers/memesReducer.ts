import { MEMES_LIST_SUCCESS, MEMES_LIST_REQUEST, MEMES_LIST_FAIL, UPLOAD_MEM_REQUEST, UPLOAD_MEM_SUCCESS, UPLOAD_MEM_FAIL } from "../constants/memesConstants";
import * as types from '../@types/memesTypes';

const initialStateGetMemes: types.MemState = {
    loading: true,
    memes: [],
    error: null
}

export const getMemesReducer = (state: types.MemState = initialStateGetMemes, action: types.GetMemesAction): types.MemState => {
    switch (action.type) {
        case MEMES_LIST_REQUEST:
            return { ...state, loading: true };
        case MEMES_LIST_SUCCESS:
            return { ...state, loading: false, memes: action.payload as types.Mem[]}; // tutaj uzywam as bo wiem dokladnie co za kazdym razem przekazuje to reducera ktorego uzywam raz
        case MEMES_LIST_FAIL:
            return { ...state, loading: false, error: action.error};
        default:
            return state;
    }
}

const initialStateUploadMem: types.UploadMemState = {
    loading: false,
    response: ''
}

export const uploadMemReducer = (state: types.UploadMemState = initialStateUploadMem, action: types.UploadMemAction): types.UploadMemState => {
    switch (action.type) {
        case UPLOAD_MEM_REQUEST:
            return { loading: true };
        case UPLOAD_MEM_SUCCESS:
            return { loading: false, response: action.payload };
        case UPLOAD_MEM_FAIL:
            return { loading: false, response: action.payload };
        default:
            return state;
    }
}