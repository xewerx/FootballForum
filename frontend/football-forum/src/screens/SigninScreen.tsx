import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { History } from 'history';

import LoadingBox from '../components/LoadingBox/LoadingBox';
import MessageBox from '../components/MessageBox/MessageBox';
import { getLiveChatCredentials, signin } from '../actions/userActions';
import stateType from '../@types/globaStateType';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import GoogleButton from 'react-google-button'
import { USER_SIGNIN_FAIL, USER_SIGNIN_SUCCESS } from '../constants/userConstants';
import * as userTypes from '../@types/userTypes'
interface IProps {
    history: History
}

const SigninScreen: React.FC<IProps> = (props) => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const [isText, setIsText] = useState<boolean>(false);
     
    const user = useSelector((state: stateType) => state.userSignin);
    const { loading, userInfo, error } = user;

    const dispatch = useDispatch();
    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(signin({ email, password }));
    }

    const showPassword = () => {
        let password = document.getElementById("password") as HTMLInputElement;
        isText ? password!.type = "password" : password!.type = "text";
        setIsText(!isText);
    };

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
        <div className="screen-container">
            <div className="caption">
                <h2>Zaloguj się</h2>
            </div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <input className="element-hover" type="email" id="email" placeholder="Adres e-mail" required onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <input className="element-hover" type="password" id="password" placeholder="Hasło" required onChange={(e) => setPassword(e.target.value)}></input>
                    <span className="fa fa-fw field-icon fa-eye" onClick={showPassword}></span>
                </div>
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                {loading && <LoadingBox></LoadingBox>}
                <div>
                    <button className="primary element-hover" type="submit">Zaloguj się</button>
                </div>
                <div className="google-signin-container">
                    <p>— Lub —</p>
                    <div>
                        <GoogleLogin
                            clientId="5765202109-h2g1avs9eppdl39fr7iancatig2dvp65.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <GoogleButton label='Zaloguj się z Google' onClick={renderProps.onClick} disabled={renderProps.disabled} />
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleError}
                            cookiePolicy="single_host_origin"
                        />
                    </div>
                </div>
                <label>
                            Nie posiadasz konta? <Link to={`/register`}>Zarejestruj się!</Link>
                        </label>
            </form>
        </div>
    )
}

export default SigninScreen;
