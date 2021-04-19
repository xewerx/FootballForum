import {
    AppBar,
    Container,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Toolbar
  } from "@material-ui/core";
  import { Home } from "@material-ui/icons";
  import React from "react";
  import SideDrawer from "./SideDrawer";
  import navElements from './navElements';
  
  const useStyles = makeStyles({
    navbarDisplayFlex: {
      display: `flex`,
      justifyContent: `space-between`
    },
    navListDisplayFlex: {
      display: `flex`,
      justifyContent: `space-between`
    },
    linkText: {
      textDecoration: `none`,
      textTransform: `uppercase`,
      color: `white`
    }
  });
  

  
  const Header = () => {
    const classes = useStyles();

    return (
      <>
          <AppBar position="fixed">
            <Toolbar component="nav">
              <Container maxWidth="md" className={classes.navbarDisplayFlex}>
                <IconButton edge="start" aria-label="home">
                  <a href="/" style={{ color: `white` }}>
                    <Home fontSize="large" />
                  </a>
                </IconButton>
  
                <Hidden smDown>
                  <List
                    component="nav"
                    aria-labelledby="main navigation"
                    className={classes.navListDisplayFlex}
                  >{navElements.map(( title: string ) => (
                    <ListItem button key={title}>
                      <ListItemText primary={title} />
                    </ListItem>
                ))}
                  </List>
                </Hidden>
                <Hidden mdUp>
                  <SideDrawer navLinks={navElements} />
                </Hidden>
              </Container>
            </Toolbar>
          </AppBar>
        <Toolbar id="back-to-top-anchor" />
  
      </>
    );
  };
  
  export default Header;