import React, { useState } from 'react'
import {
  SmallPage,
  SectionTitle,
  HorizontalLine,
  Flex,
  ButtonSecondary,
} from '../theme'
import { PlayersService, TeamsService } from '../services'
import Success from '../components/Success'
import styled from '@emotion/styled'
import Loader from '../components/Loader'
import { Team, Player } from '../types'
import PlayerTeamForm from '../components/PlayerTeamForm'

const SavedContainer = styled.div`
  text-align: center;
`

const AddPlayerTeamPage: React.FC = () => {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [teams, setTeams] = useState<Team[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [playersLoaded, setPlayersLoaded] = useState(false)
  const [teamsLoaded, setTeamsLoaded] = useState(false)

  if (!teamsLoaded) {
    TeamsService.getAllTeams().then(teamsRes => {
      setTeams(teamsRes.ret)
      setTeamsLoaded(true)
    })
  }

  if (!playersLoaded) {
    PlayersService.getAllPlayers().then(playersRes => {
      setPlayers(playersRes.ret)
      setPlayersLoaded(true)
    })
  }

  return (
    <SmallPage>
      <SectionTitle>Add Player To Team</SectionTitle>
      <HorizontalLine />
      {saved ? (
        <SavedContainer>
          <Success message={'Saved!'} />
          <ButtonSecondary onClick={() => setSaved(false)}>Add Another</ButtonSecondary>
        </SavedContainer>
      ) : (
        <>
          {saving ? (
            <Flex alignItems="center" justifyContent="center">
              <Loader />
            </Flex>
          ) : (
            <PlayerTeamForm
              players={players}
              teams={teams}
              del={false}
              onSave={async pteam => {
                setSaving(true)
                PlayersService.addPlayerTeam(pteam).then(() => {
                  setSaving(false)
                  setSaved(true)
                })
              }}
            />
          )}
        </>
      )}
    </SmallPage>
  )
}
export default AddPlayerTeamPage
