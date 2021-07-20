import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import stateType from '../@types/globaStateType';
import LoadingBox from '../components/LoadingBox/LoadingBox';
import MessageBox from '../components/MessageBox/MessageBox';
import { editProfile } from '../actions/userActions';
import { History } from 'history';

interface IProps {
    history: History
}

const MyProfileScreen: React.FC<IProps> = (props) => {

    const user = useSelector((state: stateType) => state.userSignin);
    const { userInfo } = user;

    const userEdit= useSelector((state: stateType) => state.userEdit);
    const { loading, error, result } = userEdit;

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [validationPasswordError, setValidationPasswordError] = useState<string>('')

    const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

    const dispatch = useDispatch();
    const submitChangePasswordHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setValidationPasswordError("Hasła nie są takie same");
        } else if (!strongPassword.test(password)) {
            setValidationPasswordError("Hasło jest zbyt słabe");
        } else {
            setValidationPasswordError('');
            dispatch(editProfile({ email, password, name: '' })); // przekazanie pustego name - na backendzie nie przejdzie ifa
        }
    };

    const submitChangeNameHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(editProfile({ email, name, password: '' })); // przekazanie pustego password - na backendzie nie przejdzie ifa
    }

    useEffect(() => {
        if (!userInfo) {
            props.history.push('/');
        } else {
            setName(userInfo!.name);  // screen tylko dla zalogowanych wiec te dane zawsze sa dostepne 
            setEmail(userInfo!.email);
        }
    }, [props.history, userInfo]);

    return (
        <div>
            <div>
                <h1>Mój profil</h1>
            </div>
            <form className="form" onSubmit={submitChangeNameHandler}>
                <div>
                    <label htmlFor="name">Nazwa</label>
                    <input className="element-hover" type="text" id="name" required value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <button className="primary element-hover" type="submit">Zmień nazwę</button>
                </div>
            </form>

            <form className="form" onSubmit={submitChangePasswordHandler}>
                <div>
                    <label htmlFor="password">Nowe hasło</label>
                    <input className="element-hover" type="password" id="password" placeholder="Podaj hasło" required onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Potwierdź hasło</label>
                    <input className="element-hover" type="password" id="confirmPassword" placeholder="Potwierdz hasło" required onChange={(e) => setConfirmPassword(e.target.value)}></input>
                </div>
                {validationPasswordError ? (<MessageBox variant="danger">{validationPasswordError}</MessageBox>)
                    :
                    error ? (<MessageBox variant="danger">{error}</MessageBox>) : <></>
                }
                {loading && <LoadingBox></LoadingBox>}
                <div>
                    <button className="primary element-hover" type="submit">Zmień hasło</button>
                </div>
            </form>
            {result && <MessageBox variant="success">{result}</MessageBox>}
        </div >
    )
}

export default MyProfileScreen