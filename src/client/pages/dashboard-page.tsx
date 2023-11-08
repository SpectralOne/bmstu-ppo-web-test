import React, { useEffect, useState } from 'react'
import {
  SectionTitle
} from '../theme'
import config from '../config'

const DashboardPage: React.FC = () => {

  return (
    <SectionTitle>{`You're using: ${config.version}`}</SectionTitle>
  )
}
export default DashboardPage
