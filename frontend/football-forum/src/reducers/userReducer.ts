import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_EDIT_REQUEST, USER_EDIT_SUCCESS, USER_EDIT_FAIL, SET_INIT_STATE, LIVECHAT_CREDENTIALS_SUCCESS, LIVECHAT_CREDENTIALS_FAIL } from '../constants/userConstants';
import * as types from '../@types/userTypes';


const IStateUser: types.UserState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') || '{}') : null,
    loading: false,
    error: null
};

export const signinReducer = (state: types.UserState = IStateUser, action: types.UserAction): types.UserState => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { ...state, loading: true };
        case USER_SIGNIN_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload as types.User }; // dane typu User zwrocone z API po zalogowaniu
        case USER_SIGNOUT:
            return { ...state, userInfo: null };
        case LIVECHAT_CREDENTIALS_SUCCESS:
            state.userInfo!.livechat_credentials = action.payload as types.LivechatCredentials;
            return { ...state }
        case USER_SIGNIN_FAIL || LIVECHAT_CREDENTIALS_FAIL:
                return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export const registerReducer = (state: types.UserState = { ...IStateUser, userInfo: null }, action: types.UserAction): types.UserState => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { ...state, loading: true };
        case USER_REGISTER_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload as types.User }; // dane typu User zwrocone z API po zarejestrowaniu
        case USER_REGISTER_FAIL:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

const IStateEditUser: types.EditUserState = {
    loading: false,
    result: null
};

export const editProfileReducer = (state: types.EditUserState = IStateEditUser, action: types.UserAction): types.EditUserState => {
    switch (action.type) {
        case USER_EDIT_REQUEST:
            return { ...state, loading: true };
        case USER_EDIT_SUCCESS:
            return { ...state, loading: false, result: action.payload as string }; // result zwrocony jako string za API
        case USER_EDIT_FAIL:
            return { ...state, loading: false, error: action.error as string };
        case SET_INIT_STATE:
            return IStateEditUser;
        default:
            return state;
    }
}