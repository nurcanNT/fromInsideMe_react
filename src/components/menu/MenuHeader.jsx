import React from "react";
import { AvatarContainer, Nav } from "./MenuStyle";
import { NavItem } from "./MenuStyle";
import { StyledNavLink } from "./MenuStyle";
import Avatar from '@mui/material/Avatar';
import SvgIcon from '@mui/material/SvgIcon';

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const MenuHeader = () => {
  return (
    <Nav>
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
            List
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/">Exit</StyledNavLink>
        </NavItem>
        <AvatarContainer>
        <Avatar sx={{ width: '25px', height: '25px', }} src="/broken-image.jpg" />
        </AvatarContainer>
        </ul>
    </Nav>
    
  );
};

export default MenuHeader;
