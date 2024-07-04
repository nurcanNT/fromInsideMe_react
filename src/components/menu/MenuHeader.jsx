import React from "react";
import { AvatarContainer, Nav } from "./MenuStyle";
import { NavItem } from "./MenuStyle";
import { StyledNavLink } from "./MenuStyle";
import Avatar from '@mui/material/Avatar';

const MenuHeader = () => {
  return (
    <Nav>
     <ul>
        <NavItem>
          <StyledNavLink exact to="/homePage/HomePage">
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
