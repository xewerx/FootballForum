import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Menu } from "@material-ui/icons";
import React from "react";
import { useState } from "react";



const useStyles = makeStyles({
  list: {
    width: 250
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `black`
  }
});

const SideDrawer = ( props: { navLinks: string[]; } ) => {

  const classes = useStyles();
  const [state, setState] = useState({ right: false });

  const toggleDrawer: any = (anchor: string, open: boolean) => {
    console.log("dsa")
    //setState({ right: open });
  };

  const sideDrawerList = (anchor: string) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
    >
      <List component="nav">
        {props.navLinks.map(( title: string ) => (
            <ListItem button key={title}>
              <ListItemText primary={title} />
            </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <IconButton

      >
        <Menu fontSize="large" style={{ color: `white` }} />
      </IconButton>

      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        {sideDrawerList("right")}
      </Drawer>
    </React.Fragment>
  );
};

export default SideDrawer;