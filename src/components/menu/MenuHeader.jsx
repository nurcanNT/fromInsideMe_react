import React from "react";
import { Nav } from "./MenuStyle";
import { NavItem } from "./MenuStyle";
import { StyledNavLink } from "./MenuStyle";

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
      </ul>
    </Nav>
  );
};

export default MenuHeader;
