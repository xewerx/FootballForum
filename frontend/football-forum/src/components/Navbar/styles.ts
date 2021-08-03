import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  bar: {
    backgroundColor: '#124413',
  },
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `center`,
    maxWidth: 'auto'
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
    color: `#124413`
  },
});
