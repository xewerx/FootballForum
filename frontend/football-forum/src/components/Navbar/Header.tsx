import React from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { AppBar, Container, Hidden, IconButton, List, ListItem, ListItemText, Toolbar } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import SideDrawer from "./SideDrawer";
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import useStyles from './styles'
import noLikeIcon from '../../assets/nolike.png';
import { ReactComponent as LogoPart1 } from '../../assets/logo_part1.svg';
import { ReactComponent as LogoPart2 } from '../../assets/logo_part2.svg';

import navLinks from './navLinks';
import stateType from '../../@types/globaStateType';
import { signout } from '../../actions/userActions';

const Header: React.FC = () => {

  const classes: ClassNameMap = useStyles();

  const user = useSelector((state: stateType) => state.userSignin);
  const { userInfo } = user;

  const setNoLikeAfterLogout = () => {
    const likes = document.querySelectorAll<HTMLImageElement>(".likeIcon");
    likes.forEach((like) => like.src = noLikeIcon)
  };

  const dispatch = useDispatch();
  const signoutHandler = () => {
    setNoLikeAfterLogout();
    dispatch(signout());
  }

  return (
    <>
      <AppBar className={classes.bar} position="fixed">
        <Toolbar component="nav">
          <Container className={classes.navbarDisplayFlex}>
            <IconButton edge="start" aria-label="home">
              <a href="/">
                <div className="logo-container">
                  <LogoPart1 />
                  <LogoPart2 />
                </div>
              </a>
            </IconButton>

            <Hidden smDown>
              <List
                component="nav"
                aria-labelledby="main navigation"
                className={classes.navListDisplayFlex}
              >
                {navLinks.map(({ title, path }) => (
                  <Link to={path} key={title} className={classes.linkText}>
                    <ListItem button>
                      <ListItemText primary={title} />
                    </ListItem>
                  </Link>
                ))}
                {userInfo ?
                  <ListItem button className="dropdown">
                    {
                      userInfo.avatar ?
                        <Avatar aria-label="recipe" className={classes.avatar} src={userInfo.isGoogleAuthUser ? userInfo.avatar : `data:image/png;base64,${userInfo.avatar}`}></Avatar>
                        :
                        <Avatar aria-label="recipe" className={classes.avatar}>
                          {userInfo.name[0].toUpperCase()}
                        </Avatar>
                    }
                    <ListItemText primary={userInfo.name} className={classes.linkText} />
                    <div >
                      <ul className="dropdown-content">
                        {
                          !userInfo.isGoogleAuthUser &&
                          <li>
                            <Link to="/myprofile" className="fullWidth">Profil</Link>
                          </li>
                        }
                        <li>
                          <Link to="/addmem" className="fullWidth">Dodaj&nbsp;mema</Link>
                        </li>
                        {
                          userInfo.isAdmin &&
                          <li>
                            <Link to="/acceptmem" className="fullWidth">Akceptacje</Link>
                          </li>
                        }
                        <li>
                          <Link to="#signout" onClick={signoutHandler} className="fullWidth">Wyloguj</Link>
                        </li>
                      </ul>
                    </div>
                  </ListItem>
                  :
                  <Link to={'/signin'} className={classes.linkText}>
                    <ListItem button>
                      <ListItemText primary={'Zaloguj sie'} />
                    </ListItem>
                  </Link>
                }
              </List>
            </Hidden>
            <Hidden mdUp>
              <SideDrawer />
            </Hidden>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
