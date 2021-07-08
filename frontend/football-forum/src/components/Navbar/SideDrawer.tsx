import React from "react";
import { useState } from "react";

import { Drawer, IconButton, List, ListItem, ListItemText } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import useStyles from './styles';

import navLinks from './navLinks';


function SideDrawer(): JSX.Element {
  
  const classes: ClassNameMap = useStyles();
  const [stateMobileNav, setStateMobileNav] = useState(false);

  const toggleDrawer = (stateMobileNav: boolean) => (_event: any) => {
    setStateMobileNav(stateMobileNav);
  };

  const sideDrawerList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List component="nav">
        {navLinks.map(({ title, path }) => (
          <a href={path} key={title} className={classes.linkTextBlack}>
            <ListItem button>
              <ListItemText primary={title} />
            </ListItem>
          </a>
        ))}
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <IconButton
        edge="start"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <Menu fontSize="large" style={{ color: `white` }} />
      </IconButton>

      <Drawer
        anchor="right"
        open={stateMobileNav}
        onClose={toggleDrawer(false)}
      >
        {sideDrawerList()}
      </Drawer>
    </React.Fragment>
  );
};

export default SideDrawer;