import React from 'react'
import MemesContainer from '../components/Memes/MemesContainer';

const HomeScreen: React.FC = () => {


    return (
        <div>
            <MemesContainer isAcceptationMemes={false}></MemesContainer>
        </div>
    )
}

export default HomeScreen;
