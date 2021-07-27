import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

import stateType from '../@types/globaStateType';
import { History } from 'history';
import MemesContainer from '../components/Memes/MemesContainer';

interface IProps {
    history: History
}

const AcceptMemesScreen: React.FC<IProps> = (props) => {

    const user = useSelector((state: stateType) => state.userSignin);
    const { userInfo } = user;

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            props.history.push('/');
        }
    }, [props.history, userInfo]);

    // conditional rendering in order to not render(api call) if user is not admin
    return (
        userInfo?.isAdmin ?
        <div>
            <h1>Akceptuj memy</h1>
            <p>Tutaj jako admin akceptujesz memy dodane przez innych użytkowników forum. Przed akceptacją nie pojawią się one na głównej stronie.</p>
            <MemesContainer isAcceptationMemes={true} ></MemesContainer>
        </div>
        :
        <></>
    )
}

export default AcceptMemesScreen;