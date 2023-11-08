import React, { useState } from 'react'
import {
  SmallPage,
  SectionTitle,
  HorizontalLine,
  ButtonPrimary,
  Flex,
  ErrorMsg,
} from '../theme'
import { AuthService } from '../services'
import Success from '../components/Success'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import Loader from '../components/Loader'
import LoginForm from '../components/LoginForm'
import config from '../config'

const SavedContainer = styled.div`
  text-align: center;
`

interface Props {
  setToken: (t: any) => void
  setSuccess: (t: any) => void
}

const LoginPage: React.FC<Props> = (props: Props) => {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(false)
  const { setToken, setSuccess } = props

  return (
    <SmallPage>
      <SectionTitle>{`Login (${config.version})`}</SectionTitle>
      <HorizontalLine />
      {saving ? (
            <Flex alignItems="center" justifyContent="center">
              <Loader />
            </Flex>
          ) : (
            <LoginForm
              onSuccess={async user => {
                setSaving(true)
                AuthService.login(user).then((response: any) => {
                  setToken(response.data)
                  setError(false)
                  setSuccess(true)
                  setSaving(false)
                }).catch(() => setError(true))
              }}
            />
          )}
    </SmallPage>
  )
}
export default LoginPage
