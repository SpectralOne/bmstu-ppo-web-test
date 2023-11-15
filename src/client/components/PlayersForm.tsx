import React, { useEffect, useState } from 'react'
import { Player } from '../types'
import {
  TextInput,
  Label,
  FormGroup,
  ButtonPrimary,
  ErrorMsg,
} from '../theme'
import DatePicker from './DatePicker'
import { getOwner, setState, getState, newPlayerStateKey } from '../utils'

interface Props {
  onSave: (player: Player) => void
}

const PlayersForm: React.FC<Props> = (props: Props) => {
  const owner = getOwner()
  const cleanState = { firstname: '', lastname: '', id: 0, owner: owner, country: '', birthdate: new Date(), teams: [] }
  const lastCapturedState = getState(newPlayerStateKey) || cleanState
  const [player, setPlayer] = useState<Player>(lastCapturedState)
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

    const nextState = { ...player, [id]: value }
    setState(newPlayerStateKey, nextState)

    setPlayer(prev => ({ ...prev, [id]: value }))
  }

  const handleDate = (d: Date) => {
    const nextState = { ...player, birthdate: d }
    setState(newPlayerStateKey, nextState)

    setPlayer(prev => ({ ...prev, birthdate: d }))
  }

  useEffect(() => {
    const verror: boolean = fnameError || lnameError || cntryError;
    if (submit && !verror) {
      onSave(player)
      setSubmit(false)
      setState(newPlayerStateKey, cleanState)
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
        <Label htmlFor="firstname">Firstname:</Label>
        <TextInput
          id="firstname"
          type="text"
          value={lastCapturedState.firstname}
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
          value={lastCapturedState.lastname}
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
          value={lastCapturedState.country}
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
          date={lastCapturedState.birthdate}
        />
      </FormGroup>

      <ButtonPrimary onClick={onSubmit}>
        Add Player
      </ButtonPrimary>
    </div>
  )
}

export default PlayersForm
