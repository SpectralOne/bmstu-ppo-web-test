import React, { useState, useEffect } from 'react'
import {
  SmallPage,
  SectionTitle,
  HorizontalLine,
  Button,
  ButtonPrimary,
  Flex,
  Label,
  TextInput,
  FormGroup,
  ErrorMsg,
} from '../theme'
import { TeamsService } from '../services'
import styled from '@emotion/styled'
import Loader from '../components/Loader'
import HistoryTeamsTable from '../components/HistoryTeamsTable'
import { HistoryTeam } from '../types'


const SavedContainer = styled.div`
  text-align: center;
`

const PlayerTeamsPage: React.FC = () => {
  const [teams, setTeams] = useState<HistoryTeam[]>([])
  const [id, setId] = useState(-1)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(false)
  const [saved, setSaved] = useState(false)
  const [submit, setSubmit] = useState(false)

  const validate = (val: string | undefined | number, f: any) => {
    if (!val || val === '') {
      f(true)
    } else {
      f(false)
      setSubmit(false)
    }
  }

  const handleInput = (e: any) => {
    e.persist()
    const { value } = e.target;
    setId(value)
  }

  useEffect(() => {    
    if (submit && !error) {
      TeamsService.getPlayerHistory(id).then(teamsRes => {
        setTeams(teamsRes.ret || [])
      })
      setSaved(true)
      setSubmit(false)
      setId(-1)
    }
  }, [submit, id])

  const onSubmit = () => {
    validate(id, setError)
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
          <Button onClick={() => setSaved(false)}>Request Again</Button>
        </SavedContainer>
      ) : (
        <>
          {saving ? (
            <Flex alignItems="center" justifyContent="center">
              <Loader />
            </Flex>
          ) : (
            <>
              <FormGroup>
                <Label htmlFor="name">Player ID:</Label>
                <TextInput
                  id="id"
                  type="number"
                  placeholder="Enter Player ID..."
                  onKeyUp={e => validate(e.currentTarget.value, setError)}
                  onChange={handleInput}
                  className={error ? 'error' : ''}
                />
                {error && <ErrorMsg>ID is required.</ErrorMsg>}
              </FormGroup>
              
              <ButtonPrimary onClick={onSubmit}>
                Proceed
              </ButtonPrimary>
            </>
          )}
        </>
      )}
    </SmallPage>
  )
}
export default PlayerTeamsPage
