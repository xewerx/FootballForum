import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import likeIcon from '../../../assets/like.png';
import noLikeIcon from '../../../assets/nolike.png';

import useStyles from './styles'
import image from '../../../assets/pitch.jpg';
import * as memesTypes from '../../../@types/memesTypes';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import stateType from '../../../@types/globaStateType';
import { deleteMem, likeOrUnlike } from '../../../actions/memesActions';
import ConfirmBox from '../../ConfirmBox.ts/ConfirmBox';

const Mem: React.FC<memesTypes.Mem> = (props) => {

  const classes: ClassNameMap = useStyles();
  
  const [like, setLike] = useState<boolean>(false);
  
  const user = useSelector((state: stateType) => state.userSignin);
  const { userInfo } = user;
  
  const dispatch = useDispatch();

  const discardMem = () => {
    dispatch(deleteMem(props._id));
    const confirmBox: HTMLElement = document.querySelector(".confirm-box-container")!;
    confirmBox!.style.display = "none";
  };

  const cancelDiscardMem = () => {
    const confirmBox: HTMLElement = document.querySelector(".confirm-box-container")!;
    confirmBox!.style.display = "none";
  };

  const showConfirmBox = () => {
    const confirmBox: HTMLElement = document.querySelector(".confirm-box-container")!;
    confirmBox!.style.display = "flex";
  };
  
  const likeHandler = () => {
    if(userInfo) {
      setLike(!like);
      dispatch(likeOrUnlike(!like, props._id));
    }
  };

  useEffect(() => {
    if(userInfo && props.likes?.includes(userInfo._id)) {
      setLike(true);
    }
  }, [props.likes, userInfo]);

  return (
    <Card className={classes.root}>
      <ConfirmBox question="Usunąć mema?" accept={discardMem} discard={cancelDiscardMem}></ConfirmBox>
      <CardHeader
        avatar={
          props.creatorAvatar ?
            <Avatar aria-label="recipe" className={classes.avatar} src={`data:image/png;base64,${props.creatorAvatar}`}></Avatar>
            :
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.creatorName[0].toUpperCase()}
            </Avatar>
        }
        action={
          userInfo?.isAdmin &&
          <IconButton onClick={showConfirmBox} aria-label="delete">
            <DeleteIcon />
          </IconButton>
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
      <CardActions disableSpacing>
        <IconButton aria-label="like" onClick={likeHandler} >
          <img src={ like ? likeIcon : noLikeIcon } alt="<3" className={`${classes.like} likeIcon`} />
        </IconButton>
        <span>{props.likes ? props.likes.length : "0"}</span>
      </CardActions>
    </Card>
  );
}

export default Mem;

