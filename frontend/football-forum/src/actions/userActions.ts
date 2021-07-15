import axios from 'axios';
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from '../constants/userConstants';
import * as types from "../@types/userTypes"

export const signin = (credentials: types.LoginCredentials) => async (dispatch: types.DispatchType) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: credentials });
    try {
        const { data }: {data: types.User} = await axios.post('/api/user/signin', credentials);
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch(error) {
        dispatch({ type: USER_SIGNIN_FAIL, error: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
}

export const register = (newUserData: types.NewUserData) => async (dispatch: types.DispatchType) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: newUserData});
    try {
        const { data }: {data: types.User} = await axios.post('/api/user/register', newUserData);
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data});
        dispatch({ type: USER_SIGNIN_SUCCESS, payload:data }); // after registration user is signin
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch(error) {
        dispatch({ type: USER_REGISTER_FAIL, error: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
}

export const signout = () => (dispatch: types.DispatchType) => {
    dispatch({ type: USER_SIGNOUT });
    localStorage.removeItem('userInfo');
};