import React, { useState } from 'react'
import {
  SmallPage,
  SectionTitle,
  HorizontalLine,
  ButtonSecondary,
  ButtonPrimary,
  Flex,
} from '../theme'
import TeamsForm from '../components/TeamsForm'
import { TeamsService } from '../services'
import Success from '../components/Success'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import Loader from '../components/Loader'

const SavedContainer = styled.div`
  text-align: center;
`

const NewTeamsPage: React.FC = () => {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  return (
    <SmallPage>
      <SectionTitle>Add New Team</SectionTitle>
      <HorizontalLine />
      {saved ? (
        <SavedContainer>
          <Success message={'Saved!'} />
          <Link style={{ marginRight: '16px' }} to={'/teams'}>
            <ButtonPrimary>Show All Teams</ButtonPrimary>
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
            <TeamsForm
              onSave={async team => {
                setSaving(true)
                TeamsService.addTeam(team).then(() => {
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
export default NewTeamsPage
