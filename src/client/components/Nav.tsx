import styled from '@emotion/styled'
import React from "react";
import { NavLink } from "react-router-dom";
import { breakpoints } from "../theme";
import { setToken } from '../utils';

const NavContainer = styled.nav`
  margin-right: 16px;
  margin-top: 48px;
  @media screen and (max-width: ${breakpoints.md}px) {
    margin: 10px 10px 4px;
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
  @media screen and (max-width: ${breakpoints.md}px) {
    padding: 8px 14px;
    margin: 0;
    border-radius: 55px;
    width: auto;
  }

  &:hover {
    background-color: rgba(80,80,80, 0.05);
  }
  &.active {
    background-color: rgb(203, 244, 255);
  }
`

const Nav: React.FC = () => (
  <NavContainer>
    <NavLinkStyled exact activeClassName="active" to="/">Dashboard</NavLinkStyled>
    <NavLinkStyled exact activeClassName="active" to="/players">All Players</NavLinkStyled>
    <NavLinkStyled exact activeClassName="active" to="/teams">All Teams</NavLinkStyled>
    <NavLinkStyled exact activeClassName="active" to="/teams/add">Add Player To Team</NavLinkStyled>
    <NavLinkStyled exact activeClassName="active" to="/teams/delete">Del Player From Team</NavLinkStyled>
    <NavLinkStyled exact activeClassName="active" to="/player/teams">Player Teams</NavLinkStyled>
    <NavLinkStyled exact activeClassName="active" to="/player/history">Previous Player Teams</NavLinkStyled>
    <NavLinkStyled exact activeClassName="active" onClick={() => {
      setToken("")
      window.location.reload()
    }}
      to="/">Logout</NavLinkStyled>
  </NavContainer>
)

export default Nav