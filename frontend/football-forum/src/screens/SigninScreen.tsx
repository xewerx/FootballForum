import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LoadingBox from '../components/LoadingBox/LoadingBox';
import MessageBox from '../components/MessageBox/MessageBox';
import { signin } from '../actions/userActions';
import stateType from '../@types/globaStateType';

function SigninScreen(props: any) {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')

    const user = useSelector((state: stateType) => state.userSignin);
    const { loading, userInfo, error } = user;

    const dispatch = useDispatch();
    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(signin({email, password}));
    }

    useEffect(() => {
        if(userInfo) {
            props.history.push('/');
        }
    }, [props.history, userInfo]);
    console.log(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') || '{}') : null)
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Zaloguj sie</h1>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input className="elementHover" type="email" id="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input className="elementHover" type="password" id="password" placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                {loading && <LoadingBox></LoadingBox>}
                <div>
                    <button className="primary elementHover" type="submit">Sign In</button>
                </div>
                <div>
                    <label>
                        Nie posiadasz konta? <Link to={`/register`}>Zarejestruj sie</Link>
                    </label>
                </div>
            </form>
        </div>
    )
}

export default SigninScreen;
