import React, { useState, useEffect } from 'react'
import {
  SmallPage,
  SectionTitle,
  HorizontalLine,
  ButtonSecondary,
  ButtonPrimary,
  Flex,
  Label,
  Select,
  ErrorMsg,
} from '../theme'
import { TeamsService, PlayersService } from '../services'
import styled from '@emotion/styled'
import Loader from '../components/Loader'
import HistoryTeamsTable from '../components/HistoryTeamsTable'
import { HistoryTeam, Player } from '../types'


const SavedContainer = styled.div`
  text-align: center;
`

const PlayerTeamsPage: React.FC = () => {
  const [teams, setTeams] = useState<HistoryTeam[]>([])
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [submit, setSubmit] = useState(false)

  const [playerError, setPlayerError] = useState(false)
  const [playerId, setPlayerId] = useState(-1)
  const [players, setPlayers] = useState<Player[]>([])
  const [playersLoaded, setPlayersLoaded] = useState(false)

  if (!playersLoaded) {
    PlayersService.getAllPlayers().then(playersRes => {
      setPlayers(playersRes.ret)
      setPlayersLoaded(true)
      setLoading(false)
    })
  }

  useEffect(() => {
    if (submit && !playerError) {
      TeamsService.getPlayerHistory(playerId).then(teamsRes => {
        setTeams(teamsRes.ret || [])
      })

      setSaved(true)
      setSubmit(false)
      setLoading(false)
      setPlayerId(-1)
    }
  }, [saved, submit, loading, playerId])

  const onSubmit = () => {
    setPlayerError(false)
    if (playerId === -1) {
      console.log(playerId)
      setPlayerError(true)
      return
    }

    setLoading(true)
    setSubmit(true)

  }

  return (
    <SmallPage>
      <SectionTitle>Get Previous Player Teams</SectionTitle>
      <HorizontalLine />
      {saved ? (
        <SavedContainer>
          <HistoryTeamsTable
            teams={teams}
          />
          <div style={{marginTop: "16px"}}>
          <ButtonSecondary onClick={() => setSaved(false)}>Request Again</ButtonSecondary>
          </div>
        </SavedContainer>
      ) : (
        <>
          {loading ? (
            <Flex alignItems="center" justifyContent="center">
              <Loader />
            </Flex>
          ) : (
            <div>
              <div style={{ marginBottom: "16px"}}>
                <Label>Select Player</Label>
                <Select
                  error={playerError}
                  onChange={e => {
                    const index: number = parseInt(e.target.value)
                    const player: Player = players[index]
                    console.log(player)
                    setPlayerId(player.id as number)
                  }}
                >
                  <option value="-1">-- Select --</option>
                  {players.map((player, i) => (
                    <option key={i} value={i}>
                      {`${player.firstname} ${player.lastname}`}
                    </option>
                  ))}
                </Select>
                {playerError && <ErrorMsg>Player ID is required.</ErrorMsg>}
              </div>
              <ButtonPrimary onClick={onSubmit}>
                Proceed
              </ButtonPrimary>
            </div>
          )}
        </>
      )}
    </SmallPage>
  )
}
export default PlayerTeamsPage
