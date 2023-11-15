import React, { useEffect, useState } from 'react'
import { PlayerTeam, Player, Team } from '../types'
import {
  Label,
  ButtonPrimary,
  ErrorMsg,
  Select
} from '../theme'
import styled from '@emotion/styled'

interface Props {
  onSave: (team: PlayerTeam) => void
  del: boolean
  players: Player[]
  teams: Team[]
}

const PlayerTeamForm: React.FC<Props> = (props: Props) => {
  const [playerTeam, setPlayerTeam] = useState<PlayerTeam>({ playerid: -1, teamid: -1 })
  const [playerIdx, setPlayerIdx] = useState(-1)
  const [teamIdx, setTeamIdx] = useState(-1)
  const [playerError, setPlayerError] = useState(false)
  const [teamError, setTeamError] = useState(false)
  const [submit, setSubmit] = useState(false)
  const { onSave, del, players, teams } = props

  useEffect(() => {
    const verror: boolean = playerError || teamError;
    if (submit && !verror) {
      onSave(playerTeam)
      setSubmit(false)
      setTeamIdx(-1)
      setPlayerIdx(-1)
    }
  }, [submit, playerError, teamError])

  const onSubmit = () => {
    setTeamError(false)
    setPlayerError(false)

    if (teamIdx === -1) setTeamError(true)
    if (playerIdx === -1) setPlayerError(true)
    if (playerError || teamError) return

    const player: Player = players[playerIdx]
    const team: Team = teams[teamIdx]
    setPlayerTeam({ playerid: player.id, teamid: team?.id })
    setSubmit(true)
  }

  return (
    <div>
      <div>
        <Label>Select Player</Label>
        <Select
          error={playerError}
          onChange={e => {
            const index: number = parseInt(e.target.value)
            setPlayerIdx(index)
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

      <div style={{marginTop: "16px", marginBottom: "16px"}}>
        <Label>Select Team</Label>
        <Select
          error={teamError}
          onChange={e => {
            const index: number = parseInt(e.target.value)
            setTeamIdx(index)
          }}
        >
          <option value="-1">-- Select --</option>
          {teams
            .filter((team) => {
              return playerIdx !== -1
                ? del
                  ? players[playerIdx].teams?.includes(team?.id || -1)
                  : !players[playerIdx].teams?.includes(team?.id || -1)
                : true
            })
            .map((team, i) => (
              <option key={i} value={i}>
                {team.name}
              </option>
            ))}
        </Select>
        {teamError && <ErrorMsg>Team ID is required.</ErrorMsg>}
      </div>

      <ButtonPrimary onClick={onSubmit}>
        {del ? "Delete" : "Add"}
      </ButtonPrimary>
    </div>
  )
}

export default PlayerTeamForm
