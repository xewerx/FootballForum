import axios from 'axios';
import { MEMES_LIST_FAIL, MEMES_LIST_REQUEST, MEMES_LIST_SUCCESS, UPLOAD_MEM_REQUEST, UPLOAD_MEM_SUCCESS, UPLOAD_MEM_FAIL } from '../constants/memesConstants';
import * as types from "../@types/memesTypes"

export const getMemes = () => async (dispatch: types.DispatchType) => {
    dispatch({ type: MEMES_LIST_REQUEST });
    try {
        const { data } = await axios.get('/api/memes');
        dispatch({ type: MEMES_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: MEMES_LIST_FAIL, payload: error.message });
    }
}

export const uploadMem = (data: types.NewMem) => async (dispatch: types.DispatchType) => {
    dispatch({ type: UPLOAD_MEM_REQUEST });
    try {
        const result = await axios.post('/api/memes/upload', data);
        dispatch({ type: UPLOAD_MEM_SUCCESS, payload: result });
    } catch (error) {
        dispatch({ type: UPLOAD_MEM_FAIL, payload: error.message });
    }
}
