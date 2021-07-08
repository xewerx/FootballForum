import React from "react";

import { AppBar, Container, Hidden, IconButton, List, ListItem, ListItemText, Toolbar } from "@material-ui/core";
import SideDrawer from "./SideDrawer";
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import useStyles from './styles'

import navLinks from './navLinks';

function Header(): JSX.Element {

  const classes: ClassNameMap = useStyles();

  return (
    <>
        <AppBar className={classes.bar} position="fixed">
          <Toolbar component="nav">
            <Container maxWidth="md" className={classes.navbarDisplayFlex}>
              <IconButton edge="start" aria-label="home">
                <a href="/" style={{ color: `white` }}>
                  LOGO
                </a>
              </IconButton>

              <Hidden smDown>
                <List
                  component="nav"
                  aria-labelledby="main navigation"
                  className={classes.navListDisplayFlex}
                >
                  {navLinks.map(({ title, path }) => (
                    <a href={path} key={title} className={classes.linkText}>
                      <ListItem button>
                        <ListItemText primary={title} />
                      </ListItem>
                    </a>
                  ))}
                </List>
              </Hidden>
              <Hidden mdUp>
                <SideDrawer/>
              </Hidden>
            </Container>
          </Toolbar>
        </AppBar>
    </>
  );
};

export default Header;
