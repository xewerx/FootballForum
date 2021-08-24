import axios from 'axios';
import { MEMES_LIST_FAIL, MEMES_LIST_REQUEST, MEMES_LIST_SUCCESS, UPLOAD_MEM_REQUEST, UPLOAD_MEM_SUCCESS, UPLOAD_MEM_FAIL, ACCEPT_OR_DELETE_MEM_REQUEST, ACCEPT_OR_DELETE_MEM_SUCCESS, ACCEPT_OR_DELETE_MEM_FAIL, LIKE_OR_UNLIKE_MEM_REQUEST, LIKE_OR_UNLIKE_MEM_SUCCESS, LIKE_OR_UNLIKE_MEM_FAIL } from '../constants/memesConstants';
import * as types from "../@types/memesTypes"
import stateType from "../@types/globaStateType"

export const getMemes = () => async (dispatch: types.DispatchType) => {
    dispatch({ type: MEMES_LIST_REQUEST });
    try {
        const { data }: {data: types.Mem[]} = await axios.get('https://fotball-forum-api.herokuapp.com/api/memes');
        console.log(data)
        dispatch({ type: MEMES_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: MEMES_LIST_FAIL, error: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

export const getMemesToAcceptation = () => async (dispatch: types.DispatchType, getState: () => stateType) => {
    dispatch({ type: MEMES_LIST_REQUEST });
    try {
        const { userSignin: { userInfo } } = getState();
        if(!userInfo) {
            return;
        }
        const { data }: {data: types.Mem[]} = await axios.get('https://fotball-forum-api.herokuapp.com/api/memes/toaccept', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: MEMES_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: MEMES_LIST_FAIL, error: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

export const uploadMem = (mem: types.NewMem) => async (dispatch: types.DispatchType, getState: () => stateType) => {
    dispatch({ type: UPLOAD_MEM_REQUEST });
    try {
        const { userSignin: { userInfo } } = getState();
        if(!userInfo) {
            return;
        }
        const { data }: {data: {message: string}} = await axios.post('https://fotball-forum-api.herokuapp.com/api/memes/upload', mem, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: UPLOAD_MEM_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({ type: UPLOAD_MEM_FAIL, error: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

export const acceptOrDeleteMem = (_id: string, action: "acceptmem" | "discardmem") => async (dispatch: types.DispatchType, getState: () => stateType) => { // love ts <3
        dispatch({ type: ACCEPT_OR_DELETE_MEM_REQUEST });
        try {
            const { userSignin: { userInfo } } = getState();
            if(!userInfo) {
                return;
            }
            const { data }: {data: {message: string}} = await axios.put(`https://fotball-forum-api.herokuapp.com/api/memes/${action}`, {_id}, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            });
            dispatch({ type: ACCEPT_OR_DELETE_MEM_SUCCESS, payload: data.message, _id: _id});
        } catch (error) {
            dispatch({ type: ACCEPT_OR_DELETE_MEM_FAIL, error: error.response && error.response.data.message ? error.response.data.message : error.message });
        }
};

export const deleteMem = (_id: string) => async (dispatch: types.DispatchType, getState: () => stateType) => {
    dispatch({ type: ACCEPT_OR_DELETE_MEM_REQUEST });
    console.log(_id)
    try {
        const { userSignin: { userInfo } } = getState();
        if(!userInfo) {
            return;
        }
        const { data }: {data: {message: string}} = await axios.delete(`https://fotball-forum-api.herokuapp.com/api/memes/delete/${_id}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: ACCEPT_OR_DELETE_MEM_SUCCESS, payload: data.message, _id: _id });
    } catch (error) {
        dispatch({ type: ACCEPT_OR_DELETE_MEM_FAIL, error: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

export const likeOrUnlike = (isLike: boolean, memId: string) => async (dispatch: types.DispatchType, getState: () => stateType) => {
    dispatch({ type: LIKE_OR_UNLIKE_MEM_REQUEST });
    try {
        const { userSignin: { userInfo } } = getState();
        const { data, status }: {data: {message: string[]}, status: number} = await axios.put(`https://fotball-forum-api.herokuapp.com/api/user/like/${memId}`, {isLike: isLike}, {
            headers: {
                Authorization: `Bearer ${userInfo!.token}` // tylko dla zalogowanych dlatego UserInfo zawsze jest
            }
        });
        if(status === 200) {
            dispatch({ type: LIKE_OR_UNLIKE_MEM_SUCCESS, payload: data.message, _id: memId }); // zmiana danych w stacie Usera - tylko name w sumie
        } else {
            dispatch({ type: LIKE_OR_UNLIKE_MEM_FAIL, error: "Niepoprawne dane" });
        }
    } catch(error) {
        dispatch({ type: LIKE_OR_UNLIKE_MEM_FAIL, error: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};