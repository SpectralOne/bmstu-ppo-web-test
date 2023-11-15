import React from 'react'
import styled from '@emotion/styled'
import { breakpoints } from '../theme'

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 16px;
  @media screen and (max-width: ${breakpoints.md}px) {
    padding: 0;
    img {
      height: 38px;
    }
  }
`

const Logo: React.FC = () => (
  <LogoContainer>
    <img src="/assets/logo.svg" alt="" />
  </LogoContainer>
)

export default Logo
