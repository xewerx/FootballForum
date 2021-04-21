import { makeStyles } from "@material-ui/core/styles";

export default  makeStyles({
  bar: {
    backgroundColor: 'green'
  },
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
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
  linkTextBlack: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `black`
  },
});
