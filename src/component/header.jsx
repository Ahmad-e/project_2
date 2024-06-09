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
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import {modeActions} from "../Store/Store"


export default function Header() {
  const [types, setTypes] = React.useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const mode = useSelector(state=>state.mode);
  const url = useSelector(state=>state.url);
  const account = useSelector(state=>state.account);
  const dispatch = useDispatch();
  const {toggleMode} = modeActions;

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  React.useEffect(() => {
    axios.get( url+"showProductTypes")
        .then((response) => {
            setTypes(response.data.types)
        })
        .catch((error) => {
            console.log(error)
        });
}, []);


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
      
      <MenuItem onClick={()=>dispatch(toggleMode())}>
          <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
            >
              { mode==="dark" ? <WbSunnyRoundedIcon /> : <NightsStayOutlinedIcon />  }
          </IconButton>
      </MenuItem>
      <MenuItem sx={account ==="3" ?  {} : {display: "none"}} onClick={()=>document.location.assign("basket")} >
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
      <MenuItem sx={account ==="3" ?  {} : {display: "none"}} onClick={()=>document.location.assign("profile")} >
      <Button
                aria-haspopup="true"
                sx={account ==="3" ?  { color:"#bb252e" ,padding: "0px 20px"  } : {display: "none"}}
              >
                profile
            </Button>
      </MenuItem>
      <MenuItem sx={account ==="3" ?  {} : {display: "none"}} onClick={()=>document.location.assign("favorite")} >
        <Button
                aria-haspopup="true"
                sx={account ==="3" ?  { color:"#bb252e" ,padding: "0px 20px"  } : {display: "none"}}
                href='favorite'
              >
                favorite
        </Button>
      </MenuItem>
      <MenuItem onClick={()=>document.location.assign("search")}>
          <Button
                aria-haspopup="true"
                sx={{ color:"#bb252e" ,padding: "0px 20px"  }}
                href='search'
              >
                best products
          </Button>
      </MenuItem>
      <MenuItem onClick={()=>document.location.assign("search")}>
        <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{ color:"#bb252e" , padding: "0px 20px" }}
            >
              all products
        </Button>
      </MenuItem>
      <MenuItem sx={account==="1" || account==="2"|| account==="3" ? {display: "none"} : {} } onClick={()=>document.location.assign("login")} >
          <Button
              href='login'
              aria-haspopup="true"
              sx={account==="1" || account==="2"|| account==="3" ? {display: "none"} : { color:"#bb252e" ,padding: "0px 20px"  } }
            >
              login
          </Button>
      </MenuItem>
      <MenuItem sx={account==="1" || account==="2"|| account==="3" ? {display: "none"} : {} }>
        <button 
              onClick={()=>document.location.assign("register")} 
              type="button" 
              className={account==="1" || account==="2"|| account==="3" ?  "d_n" : " btn btn-primary"}>
                SIGN UP
        </button>
      </MenuItem>
    </Menu>
  );

  

  return (
    <>
    
    <Box className="header position-fixed" sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static" 
        sx={mode==="dark" ? ({}) :({ backgroundColor: "#fffdfd" , color : "#222" })  }>
        <Toolbar>
          <Button
          href='/'
            sx={{ color:"#bb252e" , borderRadius:"50px" ,    margin: "10px 40px 10px 30px" }}>
            <Logo  />
          </Button>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button
                aria-haspopup="true"
                href='/profile'
                sx={account ==="3" ?  { color:"#bb252e" ,padding: "0px 20px"  } : {display: "none"}}
              >
                profile
            </Button>
            <Button
                aria-haspopup="true"
                sx={account ==="3" ?  { color:"#bb252e" ,padding: "0px 20px"  } : {display: "none"}}
                href='favorite'
              >
                favorite
            </Button>
            <Button
                aria-haspopup="true"
                sx={{ color:"#bb252e" ,padding: "0px 20px"  }}
                href='search'
              >
                best products
            </Button>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{ color:"#bb252e" , padding: "0px 20px" }}
            >
              all products
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
              {
                types.map((item)=>{
                  return(
                    <MenuItem onClick={handleClose}>{item.name}</MenuItem>
                  )
                })
              }
            </Menu>
            </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button
              href='login'
              aria-haspopup="true"
              sx={account==="1" || account==="2"|| account==="3" ? {display: "none"} : { color:"#bb252e" ,padding: "0px 20px"  } }
            >
              login
          </Button>
            <button 
              onClick={()=>document.location.assign("register")} 
              type="button" 
              className={account==="1" || account==="2"|| account==="3" ?  "d_n" : " btn btn-primary"}>
                SIGN UP
            </button>
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
    <div className='top_div_header'>

</div>
    </>
  );
}