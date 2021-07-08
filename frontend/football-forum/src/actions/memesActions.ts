import axios from 'axios';
import { MEMES_LIST_FAIL, MEMES_LIST_REQUEST, MEMES_LIST_SUCCESS } from '../constants/memesConstants';
import * as types from "../types/memesTypes"

const getMemes = () => async (dispatch: types.DispatchType) => {
    dispatch({ type: MEMES_LIST_REQUEST });
    try {
        const { data } = await axios.get('/api/memes');
        dispatch({ type: MEMES_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: MEMES_LIST_FAIL, payload: error.message });
    }
}

export default getMemes;