import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  bar: {
    backgroundColor: '#009933;',
  },
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `center`,
    maxWidth: 'auto',
  },
  navListDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
  },
  list: {
    width: 250,
  },
  linkTextGreen: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `#3CC141`
  },
});
