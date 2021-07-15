import axios from 'axios';
import { MEMES_LIST_FAIL, MEMES_LIST_REQUEST, MEMES_LIST_SUCCESS, UPLOAD_MEM_REQUEST, UPLOAD_MEM_SUCCESS, UPLOAD_MEM_FAIL } from '../constants/memesConstants';
import * as types from "../@types/memesTypes"
import stateType from "../@types/globaStateType"

export const getMemes = () => async (dispatch: types.DispatchType) => {
    dispatch({ type: MEMES_LIST_REQUEST });
    try {
        const { data }: {data: types.Mem[]} = await axios.get('/api/memes');
        dispatch({ type: MEMES_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: MEMES_LIST_FAIL, payload: error.message });
    }
}

export const uploadMem = (mem: types.NewMem) => async (dispatch: types.DispatchType, getState: () => stateType) => {
    dispatch({ type: UPLOAD_MEM_REQUEST });
    try {
        const { userSignin: { userInfo } } = getState();
        if(!userInfo) {
            return;
        }
        const { data }: {data: {message: string}} = await axios.post('/api/memes/upload', mem, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: UPLOAD_MEM_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({ type: UPLOAD_MEM_FAIL, payload: error.message });
    }
}
