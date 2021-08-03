import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { History } from 'history';

import LoadingBox from '../components/LoadingBox/LoadingBox';
import MessageBox from '../components/MessageBox/MessageBox';
import { getLiveChatCredentials, signin } from '../actions/userActions';
import stateType from '../@types/globaStateType';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { USER_SIGNIN_FAIL, USER_SIGNIN_SUCCESS } from '../constants/userConstants';
import * as userTypes from '../@types/userTypes'
interface IProps {
    history: History
}

const SigninScreen: React.FC<IProps> = (props) => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')

    const user = useSelector((state: stateType) => state.userSignin);
    const { loading, userInfo, error } = user;

    const dispatch = useDispatch();
    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(signin({ email, password }));
    }

    const googleSuccess = async (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {

        let result, token;
        if ("profileObj" in res && "tokenId" in res) {
            result = res?.profileObj;
            token = res?.tokenId;
        }

        try {
            const userData = {
                _id: result?.googleId as string,
                name: result?.givenName as string,
                email: result?.email as string,
                avatar: result?.imageUrl as string,
                isAdmin: false,
                isGoogleAuthUser: true,
                token: token as string
            };

            dispatch<userTypes.UserAction>({
                type: USER_SIGNIN_SUCCESS, payload: userData
            });
            localStorage.setItem('userInfo', JSON.stringify(userData));
            dispatch(getLiveChatCredentials());
        } catch (error) {
            console.log(error);
        }
    };

    const googleError = () => dispatch<userTypes.UserAction>({
        type: USER_SIGNIN_FAIL, error: "Google Auth doesn't work"
    });

    useEffect(() => {
        if (userInfo) {
            props.history.push('/');
        }
    }, [props.history, userInfo]);

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Zaloguj sie</h1>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input className="element-hover" type="email" id="email" placeholder="Podaj email" required onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Haslo</label>
                    <input className="element-hover" type="password" id="password" placeholder="Podaj haslo" required onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                {loading && <LoadingBox></LoadingBox>}
                <div>
                    <button className="primary element-hover" type="submit">Zaloguj sie</button>
                </div>
                <div>
                    <GoogleLogin
                        clientId="5765202109-h2g1avs9eppdl39fr7iancatig2dvp65.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <button className="primary element-hover" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                Google Sign In
                            </button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                    />
                    <label>
                        Nie posiadasz konta? <Link to={`/register`}>Zarejestruj sie</Link>
                    </label>
                </div>
            </form>
        </div>
    )
}

export default SigninScreen;
