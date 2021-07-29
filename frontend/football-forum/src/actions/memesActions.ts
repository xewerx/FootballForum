import axios from 'axios';
import { MEMES_LIST_FAIL, MEMES_LIST_REQUEST, MEMES_LIST_SUCCESS, UPLOAD_MEM_REQUEST, UPLOAD_MEM_SUCCESS, UPLOAD_MEM_FAIL, ACCEPT_OR_DELETE_MEM_REQUEST, ACCEPT_OR_DELETE_MEM_SUCCESS, ACCEPT_OR_DELETE_MEM_FAIL } from '../constants/memesConstants';
import * as types from "../@types/memesTypes"
import stateType from "../@types/globaStateType"

export const getMemes = () => async (dispatch: types.DispatchType) => {
    dispatch({ type: MEMES_LIST_REQUEST });
    try {
        const { data }: {data: types.Mem[]} = await axios.get('/api/memes');
        console.log(data)
        dispatch({ type: MEMES_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: MEMES_LIST_FAIL, payload: error.message });
    }
};

export const getMemesToAcceptation = () => async (dispatch: types.DispatchType, getState: () => stateType) => {
    dispatch({ type: MEMES_LIST_REQUEST });
    try {
        const { userSignin: { userInfo } } = getState();
        if(!userInfo) {
            return;
        }
        const { data }: {data: types.Mem[]} = await axios.get('/api/memes/toaccept', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: MEMES_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: MEMES_LIST_FAIL, payload: error.message });
    }
};

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
};

export const acceptOrDeleteMem = (_id: string, action: "acceptmem" | "discardmem") => async (dispatch: types.DispatchType, getState: () => stateType) => { // love ts <3
        dispatch({ type: ACCEPT_OR_DELETE_MEM_REQUEST });
        try {
            const { userSignin: { userInfo } } = getState();
            if(!userInfo) {
                return;
            }
            const { data }: {data: {message: string}} = await axios.put(`/api/memes/${action}`, {_id}, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            });
            dispatch({ type: ACCEPT_OR_DELETE_MEM_SUCCESS, payload: data.message, _id: _id});
        } catch (error) {
            dispatch({ type: ACCEPT_OR_DELETE_MEM_FAIL, payload: error.message });
        }
};

export const deleteMem = (_id: string) => async (dispatch: types.DispatchType, getState: () => stateType) => {
    dispatch({ type: ACCEPT_OR_DELETE_MEM_REQUEST });
    try {
        const { userSignin: { userInfo } } = getState();
        if(!userInfo) {
            return;
        }
        const { data }: {data: {message: string}} = await axios.delete(`/api/memes/delete/${_id}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: ACCEPT_OR_DELETE_MEM_SUCCESS, payload: data.message, _id: _id });
    } catch (error) {
        dispatch({ type: ACCEPT_OR_DELETE_MEM_FAIL, payload: error.message });
    }
}