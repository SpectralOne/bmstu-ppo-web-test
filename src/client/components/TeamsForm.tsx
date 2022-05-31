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

interface Props {
  onSave: (team: Team) => void
}

const TeamsForm: React.FC<Props> = (props: Props) => {
  const [team, setTeam] = useState<Team>({ name: '', description: '', id: 0, owner: 1, players: [] })
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
    setTeam(prev => ({ ...prev, [id]: value }))
  }

  useEffect(() => {
    const verror: boolean = nameError || descrError;
    if (submit && !verror) {
      onSave(team)
      setSubmit(false)
      setTeam({ name: '', description: '', id: 0, owner: 1, players: [] })
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
        <Label>ID:</Label>
        <MutedSpan>
          <small>The ID will be auto generated after creating the team</small>
        </MutedSpan>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="name">Name:</Label>
        <TextInput
          id="name"
          type="text"
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
