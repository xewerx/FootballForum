import React from 'react';
import { useDispatch } from 'react-redux';
import useStyles from './styles'
import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import image from '../../../assets/pitch.jpg';
import * as memesTypes from '../../../@types/memesTypes';
import { acceptOrDiscardMem } from '../../../actions/memesActions';



const MemForAcceptation: React.FC<memesTypes.Mem> = (props) => {

  const classes: ClassNameMap = useStyles();
  const dispatch = useDispatch();

  const acceptMem = () => {
    dispatch(acceptOrDiscardMem(props._id, "acceptmem"));
  };

  const discardMem = () => {
    dispatch(acceptOrDiscardMem(props._id, "discardmem"));
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          props.creatorAvatar ?
            <Avatar aria-label="recipe" className={classes.avatar} src={`data:image/png;base64,${props.creatorAvatar}`}></Avatar>
            :
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.creatorName[0].toUpperCase()}
            </Avatar>
        }
        title={props.title}
        subheader={`${moment(props.createdAt).format('MMMM Do YYYY, h:mm ')} by ${props.creatorName}`}
      />
      <CardMedia
        className={classes.media}
        image={`data:image/png;base64,${props.file}` || image}
        title={props.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.description ? props.description : "Brak opisu"}
        </Typography>
      </CardContent>
      <CardActions className={classes.buttonsContainer}>
        <button className={`${classes.button} ${classes.buttonAccept}`} onClick={acceptMem}>Akceptuj</button>
        <button className={`${classes.button} ${classes.buttonDiscard}`} onClick={discardMem}>Odrzuć</button>
      </CardActions>
    </Card>
  );
}

export default MemForAcceptation;

