import React, { useState } from 'react'
import {
  SmallPage,
  SectionTitle,
  HorizontalLine,
  ButtonSecondary,
  ButtonPrimary,
  Flex,
} from '../theme'
import PlayersForm from '../components/PlayersForm'
import {PlayersService} from '../services'
import Success from '../components/Success'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import Loader from '../components/Loader'

const SavedContainer = styled.div`
  text-align: center;
`

const NewPlayersPage: React.FC = () => {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  return (
    <SmallPage>
      <SectionTitle>Add New Player</SectionTitle>
      <HorizontalLine />
      {saved ? (
        <SavedContainer>
          <Success message={'Saved!'} />
          <Link style={{ marginRight: '16px' }} to={'/players'}>
            <ButtonPrimary>Show All Players</ButtonPrimary>
          </Link>
          <ButtonSecondary onClick={() => setSaved(false)}>Add Another</ButtonSecondary>
        </SavedContainer>
      ) : (
        <>
          {saving ? (
            <Flex alignItems="center" justifyContent="center">
              <Loader />
            </Flex>
          ) : (
            <PlayersForm
              onSave={async player => {
                setSaving(true)
                PlayersService.addPlayer(player).then(() => {
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
export default NewPlayersPage
