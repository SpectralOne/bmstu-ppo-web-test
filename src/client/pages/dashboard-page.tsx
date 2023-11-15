import React, { useEffect, useState } from 'react'
import {
  DashboardSection
} from '../theme'
import config from '../config'

const DashboardPage: React.FC = () => {

  return (
    <DashboardSection>{`You're using: ${config.version}`}</DashboardSection>
  )
}
export default DashboardPage
