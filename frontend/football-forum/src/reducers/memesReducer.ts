import { MEMES_LIST_SUCCESS, MEMES_LIST_REQUEST, MEMES_LIST_FAIL, UPLOAD_MEM_REQUEST, UPLOAD_MEM_SUCCESS, UPLOAD_MEM_FAIL, ACCEPT_OR_DISCARD_MEM_REQUEST, ACCEPT_OR_DISCARD_MEM_SUCCESS, ACCEPT_OR_DISCARD_MEM_FAIL, SET_INIT_STATE } from "../constants/memesConstants";
import * as types from '../@types/memesTypes';

const IStateGetMemes: types.MemState = {
    loading: true,
    memes: [],
    error: null,
    result: undefined
}

// memes for home page and memes for admin to acceptation use the same state in order to optimalization
export const getAndAcceptOrDiscardMemesReducer = (state: types.MemState = IStateGetMemes, action: types.GetMemesAction): types.MemState => {
    switch (action.type) {
        case MEMES_LIST_REQUEST:
            return { ...state, loading: true };
        case MEMES_LIST_SUCCESS:
            return { ...state, loading: false, memes: action.payload as types.Mem[] }; // tutaj uzywam as bo wiem dokladnie co za kazdym razem przekazuje to reducera ktorego uzywam raz
        case MEMES_LIST_FAIL:
            return { ...state, loading: false, error: action.error };
        case ACCEPT_OR_DISCARD_MEM_REQUEST:
            return { ...state, loading: true };
        case ACCEPT_OR_DISCARD_MEM_SUCCESS: // in other words - delete mem from state
            return { ...state, loading: false, memes: state.memes.filter((mem) => mem._id !== action._id), result: action.payload as string };
        case ACCEPT_OR_DISCARD_MEM_FAIL:
            return { ...state, loading: false, error: action.error };
        case SET_INIT_STATE:
            return IStateGetMemes;
        default:
            return state;
    }
}

const IStateUploadMem: types.UploadMemState = {
    loading: false,
    response: ''
}

export const uploadMemReducer = (state: types.UploadMemState = IStateUploadMem, action: types.UploadMemAction): types.UploadMemState => {
    switch (action.type) {
        case UPLOAD_MEM_REQUEST:
            return { loading: true };
        case UPLOAD_MEM_SUCCESS:
            return { loading: false, response: action.payload };
        case UPLOAD_MEM_FAIL:
            return { loading: false, response: action.payload };
        case SET_INIT_STATE:
            return IStateUploadMem;
        default:
            return state;
    }
}