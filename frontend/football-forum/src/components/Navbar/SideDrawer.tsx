import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Drawer, IconButton, List, ListItem, ListItemText } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import useStyles from './styles';

import navLinks from './navLinks';
import stateType from '../../@types/globaStateType';
import { signout } from '../../actions/userActions';

const SideDrawer: React.FC = () => {

  const classes: ClassNameMap = useStyles();
  const [stateMobileNav, setStateMobileNav] = useState(false);

  const user = useSelector((state: stateType) => state.userSignin);
  const { userInfo } = user;

  const toggleDrawer = (stateMobileNav: boolean) => (_event: any) => {
    setStateMobileNav(stateMobileNav);
  };

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  }

  const sideDrawerList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List component="nav">
        {navLinks.map(({ title, path }) => (
          <Link to={path} key={title} className={classes.linkTextGreen}>
            <ListItem button>
              <ListItemText primary={title} />
            </ListItem>
          </Link>
        ))}
        {userInfo ?
          <>
            <Link to={'/myprofile'} className={classes.linkTextGreen}>
              <ListItem button>
                <ListItemText primary="Profil" />
              </ListItem>
            </Link>
            <Link to={'/addmem'} className={classes.linkTextGreen}>
              <ListItem button>
                <ListItemText primary="Dodaj mema" />
              </ListItem>
            </Link>
            {
              userInfo.isAdmin &&
              <Link to="/acceptmem" className={classes.linkTextGreen}>
                <ListItem button>
                  <ListItemText primary="Akceptacje" />
                </ListItem>
              </Link>
            }
            <Link to={'#signout'} onClick={signoutHandler} className={classes.linkTextGreen}>
              <ListItem button>
                <ListItemText primary="Wyloguj" />
              </ListItem>
            </Link>
          </>
          :
          <Link to={'/signin'} className={classes.linkTextGreen}>
            <ListItem button>
              <ListItemText primary={'Zaloguj sie'} />
            </ListItem>
          </Link>
        }
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