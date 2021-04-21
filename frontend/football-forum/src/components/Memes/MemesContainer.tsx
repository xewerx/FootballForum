import React from 'react';
import { Container } from '@material-ui/core';
import useStyles from './styles'

import Mem from '../Memes/Mem/Mem';

const MemesContainer = () => {

    const classes = useStyles();

    return (



        <Container className={classes.root} maxWidth='sm' >
            <Mem />
            <Mem />
            <Mem />
        </Container>
    )
}

export default MemesContainer;