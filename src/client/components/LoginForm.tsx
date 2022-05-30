import React, { useEffect, useState } from 'react'
import { User } from '../types'
import {
  TextInput,
  Label,
  FormGroup,
  ButtonPrimary,
  ErrorMsg,
} from '../theme'

interface Props {
  onSuccess: (u: User) => void
}

const LoginForm: React.FC<Props> = (props: Props) => {
  const [user, setUser] = useState<User>({ login: '', password: '' })
  const [loginError, setLoginError] = useState(false)
  const [passError, setPassError] = useState(false)
  const [submit, setSubmit] = useState(false)
  const { onSuccess } = props;

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
    setUser(prev => ({ ...prev, [id]: value }))
  }

  useEffect(() => {
    const verror: boolean = loginError || passError;
    if (submit && !verror) {
      onSuccess(user)
      setSubmit(false)
      setUser({ login: '', password: '' })
    }
  }, [submit, passError, loginError])

  const onSubmit = () => {
    validate(user.login, setLoginError)
    validate(user.password, setPassError)
    setSubmit(true)
  }

  return (
    <div>
      <FormGroup>
        <Label htmlFor="login">Login:</Label>
        <TextInput
          id="login"
          type="text"
          placeholder=""
          onKeyUp={e => validate(e.currentTarget.value, setLoginError)}
          onChange={handleInput}
          className={passError ? 'error' : ''}
        />
        {loginError && <ErrorMsg>Login is required.</ErrorMsg>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="password">Password:</Label>
        <TextInput
          id="password"
          type="password"
          placeholder=""
          onKeyUp={e => validate(e.currentTarget.value, setPassError)}
          onChange={handleInput}
          className={passError ? 'error' : ''}
        />
        {passError && <ErrorMsg>Password is required.</ErrorMsg>}
      </FormGroup>

      <ButtonPrimary onClick={onSubmit}>
        Login
      </ButtonPrimary>
    </div>
  )
}

export default LoginForm
