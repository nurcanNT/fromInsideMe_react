import React from "react";
import { AvatarContainer, Nav, Username } from "./MenuStyle";
import { NavItem } from "./MenuStyle";
import { StyledNavLink } from "./MenuStyle";
import Avatar from '@mui/material/Avatar';
import SvgIcon from '@mui/material/SvgIcon';
import { useSelector } from 'react-redux';
import { IconButton, Tooltip } from "@mui/material";

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

  const getInitial = (username) => {
    return username ? username.charAt(0).toUpperCase() : "M";
  };

  return (
    <Nav style={navStyles}>
      <ul>
        <NavItem>
          <StyledNavLink exact to="/homePage/HomePage">
            <HomeIcon style={{ marginBottom: '-5px' }} />
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
        <NavItem>
          <StyledNavLink to="/">Exit</StyledNavLink>
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
              color: "#000", }}>
              {user ? getInitial(user.username) : "X"}
            </Avatar>
          </IconButton>
        </Tooltip>
          {user && <Username style={usernameStyles}>{user.username}</Username>}
        </AvatarContainer>
      </ul>
    </Nav>
  );
};

export default MenuHeader;
