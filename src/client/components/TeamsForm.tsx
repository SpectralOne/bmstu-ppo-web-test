import React, { useEffect, useState } from 'react'
import { Team } from '../types'
import {
  TextInput,
  Label,
  FormGroup,
  MutedSpan,
  ButtonPrimary,
  ErrorMsg,
} from '../theme'
import { getOwner, getState, setState, newTeamStateKey } from '../utils'

interface Props {
  onSave: (team: Team) => void
}

const TeamsForm: React.FC<Props> = (props: Props) => {
  const owner = getOwner()
  const cleanState = { name: '', description: '', id: 0, owner: owner, players: [] }
  const lastCapturedState = getState(newTeamStateKey) || cleanState
  const [team, setTeam] = useState<Team>(lastCapturedState)
  const [nameError, setNameError] = useState(false)
  const [descrError, setDescrError] = useState(false)
  const [submit, setSubmit] = useState(false)
  const { onSave } = props

  const validate = (val: string | undefined, f: any) => {
    if (!val || val === '') {
      f(true)
    } else {
      f(false)
      setSubmit(false)
    }
  }

  const handleInput = (e: any) => {
    e.persist()
    const { id, value } = e.target;
    const nextState = { ...team, [id]: value }
    setState(newTeamStateKey, nextState)

    setTeam(prev => ({ ...prev, [id]: value }))
  }

  useEffect(() => {
    const verror: boolean = nameError || descrError;
    if (submit && !verror) {
      onSave(team)
      setSubmit(false)
      setState(newTeamStateKey, cleanState)
    }
  }, [submit, nameError, descrError])

  const onSubmit = () => {
    validate(team.name, setNameError)
    validate(team.description, setDescrError)
    setSubmit(true)

  }

  return (
    <div>
      <FormGroup>
        <Label htmlFor="name">Name:</Label>
        <TextInput
          id="name"
          type="text"
          value={lastCapturedState.name}
          placeholder="Enter Team Name..."
          onKeyUp={e => validate(e.currentTarget.value, setNameError)}
          onChange={handleInput}
          className={nameError ? 'error' : ''}
        />
        {nameError && <ErrorMsg>Name is required.</ErrorMsg>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="description">Description:</Label>
        <TextInput
          id="description"
          type="text"
          value={lastCapturedState.description}
          placeholder="Enter Team Description..."
          onKeyUp={e => validate(e.currentTarget.value, setDescrError)}
          onChange={handleInput}
          className={descrError ? 'error' : ''}
        />
        {descrError && <ErrorMsg>Description is required.</ErrorMsg>}
      </FormGroup>

      <ButtonPrimary onClick={onSubmit}>
        Add Team
      </ButtonPrimary>
    </div>
  )
}

export default TeamsForm
