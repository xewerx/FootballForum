import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { History } from 'history';

import LoadingBox from '../components/LoadingBox/LoadingBox';
import MessageBox from '../components/MessageBox/MessageBox';
import { register } from '../actions/userActions';
import stateType from '../@types/globaStateType';

interface IProps {
    history: History
}

const RegisterScreen: React.FC<IProps> = (props) => {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [validationPasswordError, setValidationPasswordError] = useState<string>('')

    const userRegister = useSelector((state: stateType) => state.userRegister);
    const userSignin = useSelector((state: stateType) => state.userSignin);
    const { loading, error } = userRegister;
    const { userInfo } = userSignin;
    
    const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

    const dispatch = useDispatch();
    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            setValidationPasswordError("Hasla nie sa takie same");
        } else if(!strongPassword.test(password)) {
            setValidationPasswordError("Haslo jest zbyt slabe");
        }else {
            setValidationPasswordError('');
            dispatch(register({name, email, password}));
        }
    }

    useEffect(() => {
        if(userInfo) {
            props.history.push('/');
        }
    }, [props.history, userInfo]);

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Zarejestruj sie</h1>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input className="element-hover" type="email" id="email" placeholder="Podaj email" required onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="name">Imie</label>
                    <input className="element-hover" type="text" id="name" placeholder="Podaj imie" required onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Haslo</label>
                    <input className="element-hover" type="password" id="password" placeholder="Podaj haslo" required onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Potwierdz haslo</label>
                    <input className="element-hover" type="password" id="confirmPassword" placeholder="Potwierdz haslo" required onChange={(e) => setConfirmPassword(e.target.value)}></input>
                </div>
                {validationPasswordError ? (<MessageBox variant="danger">{validationPasswordError}</MessageBox>)
                :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) : <></>
                }
                {loading && <LoadingBox></LoadingBox>}
                <div>
                    <button className="primary element-hover" type="submit">Zarejestruj sie</button>
                </div>
                <div>
                    <label>
                        Posiadasz juz konto? <Link to={`/signin`}>Zaloguj sie</Link>
                    </label>
                </div>
            </form>
        </div>
    )
}

export default RegisterScreen;
