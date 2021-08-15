import axios from 'axios';
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_EDIT_REQUEST, USER_EDIT_FAIL, USER_EDIT_SUCCESS, LIVECHAT_CREDENTIALS_SUCCESS, LIVECHAT_CREDENTIALS_FAIL } from '../constants/userConstants';
import * as types from "../@types/userTypes";
import stateType from "../@types/globaStateType";

export const signin = (credentials: types.LoginCredentials) => async (dispatch: types.DispatchType) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: credentials });
    try {
        const { data }: {data: types.User} = await axios.post('https://fotball-forum-api.herokuapp.com/api/user/signin', credentials);
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch(error) {
        dispatch({ type: USER_SIGNIN_FAIL, error: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

export const register = (newUserData: types.NewUserData) => async (dispatch: types.DispatchType) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: newUserData});
    try {
        const { data }: {data: types.User} = await axios.post('https://fotball-forum-api.herokuapp.com/api/user/register', newUserData);
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data});
        dispatch({ type: USER_SIGNIN_SUCCESS, payload:data }); // after registration user is signin
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch(error) {
        dispatch({ type: USER_REGISTER_FAIL, error: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

export const editProfile = (editProfileData: types.NewUserData) => async (dispatch: types.DispatchType, getState: () => stateType) => {
    dispatch({ type: USER_EDIT_REQUEST, payload: editProfileData });
    try {
        const { userSignin: { userInfo } } = getState();
        const { data, status }: {data: {message: string}, status: number} = await axios.put('https://fotball-forum-api.herokuapp.com/api/user/edit', editProfileData, {
            headers: {
                Authorization: `Bearer ${userInfo!.token}` // only for logged users
            }
        });
        
        if(status === 200) {
            dispatch({ type: USER_SIGNIN_SUCCESS, payload: {...userInfo, name: editProfileData.name || userInfo!.name} as types.User }); // if editProfileData.name doesn't exist it's password change
            localStorage.setItem('userInfo', JSON.stringify({...userInfo, name: editProfileData.name || userInfo!.name}));
            dispatch({ type: USER_EDIT_SUCCESS, payload: data.message });
        } else {
            dispatch({ type: USER_EDIT_FAIL, error: "Niepoprawne dane" });
        }
    } catch(error) {
        dispatch({ type: USER_EDIT_FAIL, error: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

export const uploadAvatar = (avatar: string) => async (dispatch: types.DispatchType, getState: () => stateType) => {
    dispatch({ type: USER_EDIT_REQUEST });
    try {
        const { userSignin: { userInfo } } = getState();
        const { data, status }: {data: {message: string}, status: number} = await axios.post('https://fotball-forum-api.herokuapp.com/api/user/avatar', {image: avatar}, {
            headers: {
                Authorization: `Bearer ${userInfo!.token}` // only for logged users
            }
        });
        if(status === 200) {
            dispatch({ type: USER_SIGNIN_SUCCESS, payload: {...userInfo, avatar: avatar } as types.User }); // state user update - name
            localStorage.setItem('userInfo', JSON.stringify({...userInfo, avatar: avatar }));
            dispatch({ type: USER_EDIT_SUCCESS, payload: data.message });
        } else {
            dispatch({ type: USER_EDIT_FAIL, error: "Niepoprawne dane" });
        }
    } catch(error) {
        dispatch({ type: USER_EDIT_FAIL, error: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

export const signout = () => (dispatch: types.DispatchType) => {
    dispatch({ type: USER_SIGNOUT });
    localStorage.removeItem('userInfo');
};

export const getLiveChatCredentials = () => async (dispatch: types.DispatchType, getState: () => stateType) => {
    try {
        const { userSignin: { userInfo } } = getState();
        const { data }: {data: types.LivechatCredentials} = await axios.get('https://fotball-forum-api.herokuapp.com/api/user/livechat-credentials',  {
            headers: {
                Authorization: userInfo!.token // tylko dla zalogowanych googlem
            }
        });
        dispatch({ type: LIVECHAT_CREDENTIALS_SUCCESS, payload: data})
    } catch(error) {
        dispatch({ type: LIVECHAT_CREDENTIALS_FAIL, error: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};