import React from 'react'
import Menu from './components/Menu'
import { breakpoints, colors, Page } from './theme'
import styled from '@emotion/styled'
import BgEffect from './components/BgEffect'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import DashboardPage from './pages/dashboard-page'
import PlayersPage from './pages/players-page'
import NewPlayersPage from './pages/new-players-page'
import LoginPage from './pages/login-page'
import { getToken, setToken } from './utils'

const AppContainer = styled.div`
  background-color: ${colors.appBg};
  display: flex;
  @media screen and (max-width: ${breakpoints.md}px) {
    flex-direction: column;
  }
`


export const App: React.FC = () => {
  const token = getToken();
  // console.log(token);
  if (!token) {
    return <LoginPage setToken={setToken} />
  }

  return (
    <BrowserRouter>
      <AppContainer>
        <BgEffect />
        <Menu />
        <Page>
          <Switch>
            <Route path="/" exact component={() => <DashboardPage />} />
            <Route path="/players/new" exact component={() => <NewPlayersPage />} />
            <Route path="/players" exact component={() => <PlayersPage />} />
          </Switch>
        </Page>
      </AppContainer>
    </BrowserRouter>
  )
}
