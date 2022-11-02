import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { GiShinyApple, GiOrangeSlice } from 'react-icons/gi';
import {
  AppBar,
  Box,
  Container,
  Avatar,
  Button,
  Toolbar,
  Tooltip,
  MenuItem,
  Menu,
  Typography,
} from '@mui/material/';
import { HeaderButtons } from '../styles/globalStyles';

import { toggleAnimation } from '../app/mainSlice';
import { useDispatch } from 'react-redux';

const pages = ['Join A Game', 'Create A Game'];

const settings = ['Profile', 'Custom Cards', 'Logout'];

const Header = ({ user, setUser }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  mr: 1,
                  padding: '1.5rem',
                }}
              >
                <GiShinyApple fontSize="1.5rem" />
                <GiOrangeSlice fontSize="1.5rem" />
              </Box>

              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'Roboto',
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Apples to Oranges
              </Typography>
            </Box>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, i) => (
                <Link
                  key={page}
                  to={i === 0 ? '/joingame' : '/creategame'}
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  <MenuItem
                    key={page}
                    onClick={() => {
                      handleCloseNavMenu();
                      dispatch(toggleAnimation());
                    }}
                  >
                    <Typography textAlign="center" color="black">
                      {page}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <GiShinyApple fontSize="1.5rem" />
            <GiOrangeSlice fontSize="1.5rem" />
          </Box>

          <Typography
            variant="h7"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Roboto',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link
              to={'/'}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Apples 2 Oranges
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, i) => (
              <Link
                key={page}
                to={i === 0 ? '/joingame' : '/creategame'}
                style={{ textDecoration: 'none', color: 'white' }}
              >
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>
          {user.id === 0 ? (
            <Box sx={{ display: 'flex', gap: '1em' }}>
              <HeaderButtons
                color="white"
                onClick={() => {
                  navigate('/user/create');
                  dispatch(toggleAnimation());
                }}
              >
                Create Account
              </HeaderButtons>
              <HeaderButtons
                color="rgba(0, 0, 0, 0.8)"
                bgc="white"
                onClick={() => {
                  navigate('/user/login');
                  dispatch(toggleAnimation());
                }}
              >
                Login
              </HeaderButtons>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="avatar" src={user.avatar} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={(e) => {
                      switch (e.target.textContent) {
                        case 'Profile':
                          navigate('/user/profile');
                          handleCloseUserMenu();
                          break;
                        case "Custom Cards":
                          navigate("/user/customcards");
                          handleCloseUserMenu();
                          break;
                        case 'Logout':
                          setUser({
                            id: 0,
                            username: '',
                            avatar: null,
                          });
                          navigate('/');
                          handleCloseUserMenu();
                          break;
                        default:
                          navigate("*");
                          console.log('invalid page');
                      }
                    }}
                  >
                    <Typography color="black" textAlign="center">
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
