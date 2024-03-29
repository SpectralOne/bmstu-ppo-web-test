import styled from '@emotion/styled'
import React from "react";
import { NavLink } from "react-router-dom";
import { breakpoints, colors } from "../theme";
import { logOut } from '../utils';

const NavContainer = styled.nav`
  margin-right: 16px;
  margin-top: 48px;
  @media screen and (max-width: ${breakpoints.md}px) {
    margin: 10px;
    display:flex;
    justify-content:center;
  }
`

const NavLinkStyled = styled(NavLink)`
  padding: 16px 16px 16px 32px;
  margin-bottom: 4px;
  width: 100%;
  display: block;
  box-sizing: border-box;
  transition: all .2s;
  border-radius: 0 55px 55px 0;
  background-color: ${colors.white};
  @media screen and (max-width: ${breakpoints.md}px) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 8px 14px;
    margin: 0;
    border-radius: 55px;
    width: auto;
    margin: 2px;
  }

  &:hover {
    background-color: ${colors.rightPanelHover};
  }
  &.active {
    background-color: ${colors.rightPanelActive};
  }
`

const Nav: React.FC = () => (
  <NavContainer>
    <NavLinkStyled exact activeClassName="active" to="/dashboard">Dashboard</NavLinkStyled>
    <NavLinkStyled exact activeClassName="active" to="/players">All Players</NavLinkStyled>
    <NavLinkStyled exact activeClassName="active" to="/teams">All Teams</NavLinkStyled>
    <NavLinkStyled exact activeClassName="active" to="/teams/add">Add Player To Team</NavLinkStyled>
    <NavLinkStyled exact activeClassName="active" to="/teams/delete">Del Player From Team</NavLinkStyled>
    <NavLinkStyled exact activeClassName="active" to="/player/teams">Player Teams</NavLinkStyled>
    <NavLinkStyled exact activeClassName="active" to="/player/history">Previous Player Teams</NavLinkStyled>
    <NavLinkStyled exact activeClassName="active" onClick={() => {
      logOut()
    }}
      to="/">Logout</NavLinkStyled>
  </NavContainer>
)

export default Nav