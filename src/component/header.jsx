import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Logo from '../SVGs/logo';
import SearchBar from './searchBar'
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import Button from '@mui/material/Button';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';

import { useDispatch, useSelector } from 'react-redux';
import {modeActions} from "../Store/Store"


export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const mode = useSelector(state=>state.mode);
  const dispatch = useDispatch();
  const {toggleMode} = modeActions;

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const [productMenu, setProductMenu] = React.useState(null);
  const open = Boolean(productMenu);
  const handleClick = (event) => {
    setProductMenu(event.currentTarget);
  };
  const handleClose = () => {
    setProductMenu(null);
  };
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <LocalGroceryStoreOutlinedIcon />
          </Badge>
        </IconButton>
      </MenuItem>
      <MenuItem>
        { mode==="dark" ? <WbSunnyRoundedIcon /> : <NightsStayOutlinedIcon />  }
      </MenuItem>
      <MenuItem>
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static" 
        sx={mode==="dark" ? ({ backgroundColor: "#222" , color : "#fffdfd" }) :({ backgroundColor: "#fffdfd" , color : "#222" })  }>
        <Toolbar>
          <Logo />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button
                aria-haspopup="true"
                sx={{ color:"#bb252e" ,padding: "0px 20px" }}
                href='/profile'
              >
                profile
            </Button>
            <Button
                aria-haspopup="true"
                sx={{ color:"#bb252e",padding: "0px 20px" }}
                href='favorite'
              >
                favorite
            </Button>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{ color:"#bb252e" , padding: "0px 20px" }}
            >
              products
            </Button>
            <Menu
              
              id="basic-menu"
              anchorEl={productMenu}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem  onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
            </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button
              aria-haspopup="true"
              sx={{ color:"#bb252e" , padding: "0px 20px" }}
            >
              login
          </Button>
            <button type="button" class="btn btn-primary">SIGN IN</button>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              href='basket'
            >
              <Badge badgeContent={17} color="error">
                <LocalGroceryStoreOutlinedIcon />
              </Badge>
            </IconButton>
            <IconButton
            onClick={()=>dispatch(toggleMode())}
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
            >
              { mode==="dark" ? <WbSunnyRoundedIcon /> : <NightsStayOutlinedIcon />  }
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <Button
              aria-haspopup="true"
              sx={{ color:"#bb252e" }}
            >
              login
          </Button>
            <button type="button" class="btn btn-primary">SIGN IN</button>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
            

          </Box>
          
        </Toolbar>
        <SearchBar/>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      
    </Box>

  );
}