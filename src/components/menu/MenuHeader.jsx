import React from "react";
import { AvatarContainer, Nav, Username } from "./MenuStyle";
import { NavItem } from "./MenuStyle";
import { StyledNavLink } from "./MenuStyle";
import Avatar from '@mui/material/Avatar';
import SvgIcon from '@mui/material/SvgIcon';
import { useSelector } from 'react-redux';

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
          <Avatar
            sx={{
              width: '25px',
              height: '25px',
              backgroundColor: "#fff",
              color: "#000",
            }}
            src="/broken-image.jpg"
          />
          {user && <Username style={usernameStyles}>{user.username}</Username>}
        </AvatarContainer>
      </ul>
    </Nav>
  );
};

export default MenuHeader;
