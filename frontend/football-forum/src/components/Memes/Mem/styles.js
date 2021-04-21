import { makeStyles } from "@material-ui/core/styles";
import { red } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    root: {
      maxWidth: 645,
      marginBottom: 140
    },
    media: {
      paddingTop: '56.25%', // 16:9
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));