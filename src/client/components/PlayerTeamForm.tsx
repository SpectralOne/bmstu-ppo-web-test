import React, { useEffect, useState } from 'react'
import { PlayerTeam } from '../types'
import {
  TextInput,
  Label,
  FormGroup,
  ButtonPrimary,
  ErrorMsg,
} from '../theme'

interface Props {
  onSave: (team: PlayerTeam) => void
  del: boolean
}

const PlayerTeamForm: React.FC<Props> = (props: Props) => {
  const [team, setTeam] = useState<PlayerTeam>({ playerid: -1, teamid: -1 })
  const [playerError, setPlayerError] = useState(false)
  const [teamError, setTeamError] = useState(false)
  const [submit, setSubmit] = useState(false)
  const { onSave, del } = props

  const validate = (val: number | undefined | string, f: any) => {
    if (!val || val === -1) {
      f(true)
    } else {
      f(false)
      setSubmit(false)
    }
  }

  const handleInput = (e: any) => {
    e.persist()
    const { id, value } = e.target;
    setTeam(prev => ({ ...prev, [id]: value }))
  }

  useEffect(() => {
    const verror: boolean = playerError || teamError;
    if (submit && !verror) {
      onSave(team)
      setSubmit(false)
      setTeam({ playerid: -1, teamid: -1 })
    }
  }, [submit, playerError, teamError])

  const onSubmit = () => {
    validate(team.playerid, setPlayerError)
    validate(team.teamid, setTeamError)
    setSubmit(true)

  }

  return (
    <div>
      <FormGroup>
        <Label htmlFor="playerid">Player ID:</Label>
        <TextInput
          id="playerid"
          type="number"
          placeholder="Enter Player ID..."
          onKeyUp={e => validate(e.currentTarget.value, setPlayerError)}
          onChange={handleInput}
          className={playerError ? 'error' : ''}
        />
        {playerError && <ErrorMsg>Player ID is required.</ErrorMsg>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="teamid">Team ID:</Label>
        <TextInput
          id="teamid"
          type="number"
          placeholder="Enter Team ID..."
          onKeyUp={e => validate(e.currentTarget.value, setTeamError)}
          onChange={handleInput}
          className={teamError ? 'error' : ''}
        />
        {teamError && <ErrorMsg>Team ID is required.</ErrorMsg>}
      </FormGroup>

      <ButtonPrimary onClick={onSubmit}>
        {del ? "Delete" : "Add"}
      </ButtonPrimary>
    </div>
  )
}

export default PlayerTeamForm
