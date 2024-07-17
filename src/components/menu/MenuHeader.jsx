import React from "react";
import { AvatarContainer, Nav, Username } from "./MenuStyle";
import { NavItem } from "./MenuStyle";
import { StyledNavLink } from "./MenuStyle";
import Avatar from '@mui/material/Avatar';
import SvgIcon from '@mui/material/SvgIcon';
import { useSelector, useDispatch } from 'react-redux';
import { Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { logout } from "../../actions";

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const MenuHeader = () => {
  const user = useSelector(state => state.auth.user);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const navStyles = {
    backgroundColor: darkMode ? "#333" : "#fff",
    color: darkMode ? "#fff" : "#000",
  };

  const usernameStyles = {
    color: "#000", 
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const getInitial = (username) => {
    return username ? username.charAt(0).toUpperCase() : "M";
  };

  return (
    <Nav style={navStyles}>
      <ul>
        <NavItem>
          <StyledNavLink exact to="/homePage/HomePage">
            <HomeIcon style={{ marginBottom: '1px' }} />
            Home Page
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink exact to="/myContents/MyContents">
            My Contents
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink exact to="/list/ListPage">
            List Page
          </StyledNavLink>
        </NavItem>
        <AvatarContainer>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 24, height: 24, fontSize:"14px", backgroundColor: "#C0C0C0",
              color: "#000" }}>
              {user ? getInitial(user.username) : "X"}
            </Avatar>
          </IconButton>
        </Tooltip>
          {user && <Username style={usernameStyles}>{user.username}</Username>}
        </AvatarContainer>
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            backgroundColor: "#fff",
            color: "#000",
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
              backgroundColor: "#fff",
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar sx= {{backgroundColor: "#C0C0C0",
              color: "#fff",}} /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar sx={{ backgroundColor: "#C0C0C0",
              color: "#fff",}} /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" sx= {{ color: "#808080"}} />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" sx= {{ color: "#808080"}} />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" sx= {{ color: "#808080"}} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      </ul>
    </Nav>
  );
};

export default MenuHeader;
