import axios from 'axios';
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNOUT } from '../constants/userConstants';
import * as types from "../@types/userTypes"

export const signin = (credentials: types.Credentials) => async (dispatch: types.DispatchType) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: credentials });
    try {
        const { data } = await axios.post('/api/user/signin', credentials );
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch(error) {
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
}

export const signout = () => (dispatch: types.DispatchType) => {
    dispatch({ type: USER_SIGNOUT });
    localStorage.removeItem('userInfo');
};