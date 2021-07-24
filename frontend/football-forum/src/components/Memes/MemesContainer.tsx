import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from '@material-ui/core';
import useStyles from './styles'
import { ClassNameMap } from '@material-ui/styles';
import Mem from '../Memes/Mem/Mem';
import MemForAcceptation from '../Memes/Mem/MemForAcceptation';
import { getMemes, getMemesToAcceptation } from '../../actions/memesActions';
import MessageBox from '../MessageBox/MessageBox';
import LoadingBox from '../LoadingBox/LoadingBox';
import stateType from '../../@types/globaStateType';
import { SET_INIT_STATE } from '../../constants/memesConstants';

interface IProps {
    isAcceptationMemes: boolean
};

const MemesContainer: React.FC<IProps> = (props) => {

    const classes: ClassNameMap = useStyles();
    const dispatch = useDispatch();

    const memesList = useSelector((state: stateType) => state.memes);
    const { loading, memes, error, result } = memesList;

    useEffect(() => {
        dispatch(props.isAcceptationMemes ? getMemesToAcceptation() : getMemes());
        dispatch({ type: SET_INIT_STATE }) // SET INIT STATE IN ORDER TO DELETE ORDER MESSAGE BOX 
    }, [dispatch, props.isAcceptationMemes]);

    // jesli widok memow do akceptowania to renderuj inny rodzaj mema
    return (
        props.isAcceptationMemes ?
            <Container className={classes.root}>
                {result && <MessageBox variant="success">{result}</MessageBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                {loading ? <LoadingBox></LoadingBox>
                    :
                    error ? <MessageBox variant="danger">{error}</MessageBox>
                        :
                        memes.map(mem => (
                            <MemForAcceptation key={mem._id} _id={mem._id} title={mem.title} description={mem.description} creatorName={mem.creatorName} creatorId={mem.creatorId} file={mem.file} likes={mem.likes} createdAt={mem.createdAt} />
                        ))
                }
            </Container>
            :
            <Container className={classes.root}>
                {loading ? <LoadingBox></LoadingBox>
                    :
                    error ? <MessageBox variant="danger">{error}</MessageBox>
                        :
                        memes.length === 0 ? <MessageBox variant="danger">Brak memów :(, weź coś dodaj!</MessageBox>
                        :
                        memes.map(mem => (
                            <Mem key={mem._id} _id={mem._id} title={mem.title} description={mem.description} creatorName={mem.creatorName} creatorId={mem.creatorId} file={mem.file} likes={mem.likes} createdAt={mem.createdAt} />
                        ))
                }
            </Container>
    )
}

export default MemesContainer;