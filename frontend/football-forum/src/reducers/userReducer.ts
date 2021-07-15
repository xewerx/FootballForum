import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from '../constants/userConstants';
import * as types from '../@types/userTypes';

const initialState: types.UserState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') || '{}') : null,
    loading: false,
    error: null
};

export const signinReducer = (state: types.UserState = initialState, action: types.UserAction): types.UserState => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { ...state, loading: true };
        case USER_SIGNIN_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload as types.User };
        case USER_SIGNIN_FAIL:
            return { ...state, loading: false, error: action.error };
        case USER_SIGNOUT:
            return { ...state, userInfo: null };
        default:
            return state;
    }
}

export const registerReducer = (state: types.UserState = { ...initialState, userInfo: null }, action: types.UserAction): types.UserState => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { ...state, loading: true };
        case USER_REGISTER_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload as types.User};
        case USER_REGISTER_FAIL:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
}