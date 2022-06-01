import React, { useEffect, useState } from 'react'
import { Player } from '../types'
import {
  TextInput,
  Label,
  FormGroup,
  MutedSpan,
  ButtonPrimary,
  ErrorMsg,
} from '../theme'
import DatePicker from './DatePicker'

interface Props {
  onSave: (player: Player) => void
}

const PlayersForm: React.FC<Props> = (props: Props) => {
  const [player, setPlayer] = useState<Player>({ firstname: '', lastname: '', id: 0, owner: 1, country: '', birthdate: new Date(), teams: [] })
  const [fnameError, setFnameError] = useState(false)
  const [lnameError, setLnameError] = useState(false)
  const [cntryError, setCntryError] = useState(false)
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
    setPlayer(prev => ({ ...prev, [id]: value }))
  }

  const handleDate = (d: Date) => {
    setPlayer(prev => ({ ...prev, birthdate: d }))
  }

  useEffect(() => {
    const verror: boolean = fnameError || lnameError || cntryError;
    if (submit && !verror) {
      onSave(player)
      setSubmit(false)
      setPlayer({ firstname: '', lastname: '', id: 1, owner: 0, country: '', birthdate: new Date(), teams: [] })
    }
  }, [submit, fnameError, lnameError, cntryError])

  const onSubmit = () => {
    validate(player.firstname, setFnameError)
    validate(player.lastname, setLnameError)
    validate(player.country, setCntryError)
    setSubmit(true)

  }

  return (
    <div>
      <FormGroup>
        <Label>ID:</Label>
        <MutedSpan>
          <small>The ID will be auto generated after creating the player</small>
        </MutedSpan>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="firstname">Firstname:</Label>
        <TextInput
          id="firstname"
          type="text"
          placeholder="Enter Player Firstname..."
          onKeyUp={e => validate(e.currentTarget.value, setFnameError)}
          onChange={handleInput}
          className={fnameError ? 'error' : ''}
        />
        {fnameError && <ErrorMsg>Firstname is required.</ErrorMsg>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="lastname">Lastname:</Label>
        <TextInput
          id="lastname"
          type="text"
          placeholder="Enter Player Lastname..."
          onKeyUp={e => validate(e.currentTarget.value, setLnameError)}
          onChange={handleInput}
          className={lnameError ? 'error' : ''}
        />
        {lnameError && <ErrorMsg>Lastname is required.</ErrorMsg>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="country">Country:</Label>
        <TextInput
          id="country"
          type="text"
          placeholder="Enter Players Country..."
          onKeyUp={e => validate(e.currentTarget.value, setCntryError)}
          onChange={handleInput}
          className={cntryError ? 'error' : ''}
        />
        {cntryError && <ErrorMsg>Country is required.</ErrorMsg>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="dob">Birthdate:</Label>
        <DatePicker
          onChange={handleDate}
        />
      </FormGroup>

      <ButtonPrimary onClick={onSubmit}>
        Add Player
      </ButtonPrimary>
    </div>
  )
}

export default PlayersForm
