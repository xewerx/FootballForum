import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNOUT } from '../constants/userConstants';
import * as types from '../@types/userTypes';

const initialState: types.UserState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') || '{}') : null,
    loading: false,
    error: null
};

export const signinReducer = (state: types.UserState = initialState, action: types.UserAction) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true };
        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_SIGNOUT:
            return {};
        default:
            return state;
    }
}