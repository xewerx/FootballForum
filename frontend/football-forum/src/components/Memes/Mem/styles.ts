import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    root: {
      marginBottom: 140
    },
    media: {
      paddingTop: '56.25%', // 16:9
    },
    avatar: {
      backgroundColor: "gray",
    },
    buttonsContainer: {
      display: 'flex',
    },
    button: {
      width: '100%'
    },
    buttonAccept: {
      backgroundColor: '#20a020'
    },
    buttonDiscard: {
      backgroundColor: '#a02020'
    },
    like: {
      maxWidth: '30px'
    }
  }));