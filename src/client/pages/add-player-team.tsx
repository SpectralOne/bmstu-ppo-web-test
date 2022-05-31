import React, { useState } from 'react'
import {
  SmallPage,
  SectionTitle,
  HorizontalLine,
  Button,
  Flex,
} from '../theme'
import { PlayersService } from '../services'
import Success from '../components/Success'
import styled from '@emotion/styled'
import Loader from '../components/Loader'
import PlayerTeamForm from '../components/PlayerTeamForm'

const SavedContainer = styled.div`
  text-align: center;
`

const AddPlayerTeamPage: React.FC = () => {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  return (
    <SmallPage>
      <SectionTitle>Add Player To Team</SectionTitle>
      <HorizontalLine />
      {saved ? (
        <SavedContainer>
          <Success message={'Saved!'} />
          <Button onClick={() => setSaved(false)}>Add Another</Button>
        </SavedContainer>
      ) : (
        <>
          {saving ? (
            <Flex alignItems="center" justifyContent="center">
              <Loader />
            </Flex>
          ) : (
            <PlayerTeamForm
              del={false}
              onSave={async pteam => {
                setSaving(true)
                PlayersService.addPlayerTeam(pteam).then(() => {
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
export default AddPlayerTeamPage
