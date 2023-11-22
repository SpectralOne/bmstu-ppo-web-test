import './index.css';
import React, { useState } from 'react'
import Menu from './components/Menu'
import { breakpoints, colors, Page } from './theme'
import styled from '@emotion/styled'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import DashboardPage from './pages/dashboard-page'
import PlayersPage from './pages/players-page'
import NewPlayersPage from './pages/new-players-page'
import TeamsPage from './pages/teams-page'
import NewTeamsPage from './pages/new-teams-page'
import LoginPage from './pages/login-page'
import { getToken, logOut, setToken } from './utils'
import AddPlayerTeamPage from './pages/add-player-team'
import RemovePlayerTeamPage from './pages/remove-player-team'
import PlayerTeamsPage from './pages/player-teams-page'
import PlayerHistoryPage from './pages/player-history-page'

const AppContainer = styled.div`
  background-color: ${colors.appBg};
  display: flex;
  @media screen and (max-width: ${breakpoints.md}px) {
    flex-direction: column;
    min-height: 100vh;
  }
`

export const App: React.FC = () => {
  const [success, setSuccess] = useState(false)


  const token = getToken();

  if (!token || token === undefined) {
    return (
      <LoginPage
        setSuccess={setSuccess}
        setToken={setToken}
      />
    )
  }

  return (
    <BrowserRouter>
      <AppContainer>
        <Menu />
        <Page>
          <Switch>
            <Route path="/dashboard" exact component={() => <DashboardPage />} />
            <Route path="/players/new" exact component={() => <NewPlayersPage />} />
            <Route path="/players" exact component={() => <PlayersPage />} />
            <Route path="/teams" exact component={() => <TeamsPage />} />
            <Route path="/teams/new" exact component={() => <NewTeamsPage />} />
            <Route path="/teams/add" exact component={() => <AddPlayerTeamPage />} />
            <Route path="/teams/delete" exact component={() => <RemovePlayerTeamPage />} />
            <Route path="/player/teams" exact component={() => <PlayerTeamsPage />} />
            <Route path="/player/history" exact component={() => <PlayerHistoryPage />} />
          </Switch>
        </Page>
      </AppContainer>
    </BrowserRouter>
  )
}
