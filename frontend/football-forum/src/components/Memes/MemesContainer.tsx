import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from '@material-ui/core';
import useStyles from './styles'
import { ClassNameMap } from '@material-ui/styles';
import Mem from '../Memes/Mem/Mem';
import { getMemes } from '../../actions/memesActions';
import MessageBox from '../MessageBox/MessageBox'
import LoadingBox from '../LoadingBox/LoadingBox';
import stateType from '../../@types/globaStateType';

function MemesContainer(): JSX.Element {

    const classes: ClassNameMap = useStyles();
    const dispatch = useDispatch();

    const memesList = useSelector((state: stateType) => state.memes);
    const { loading, memes, error } = memesList;

    useEffect(() => {
        dispatch(getMemes());
    }, [dispatch])

    return (
        <Container className={classes.root} maxWidth='sm' >
            {loading ? <LoadingBox></LoadingBox>
                :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                    :
                    memes.map(mem => (
                        <Mem key={mem._id} _id={mem._id} title={mem.title} description={mem.description} creator={mem.creator} file={mem.file} likes={mem.likes} createdAt={mem.createdAt}/>
                    ))
            }
        </Container>
    )
}

export default MemesContainer;