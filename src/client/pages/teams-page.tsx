import React, { useState, useEffect } from 'react'
import TeamsTable from '../components/TeamsTable'
import { TeamsService } from '../services'
import { ButtonSuccess, Section, SectionTitle, Flex } from '../theme'
import styled from '@emotion/styled'
import { Link, useParams } from 'react-router-dom'
import { Team } from '../types'
import Loader from '../components/Loader'

const NewTeamButton = styled(ButtonSuccess)`
  margin-bottom: 24px;
`

const TeamsPage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [teams, setTeams] = useState<Team[]>([])
  const { limit } = useParams<{ limit: string }>();

  const reloadTeams = () => {
    const parsedLimit = parseInt(limit);

    setLoading(true)
    TeamsService.getAllTeams({ limit: parsedLimit }).then(teamsRes => {
      setTeams(teamsRes.ret)
      setLoading(false)
    })
  }

  useEffect(reloadTeams, [limit])

  return (
    <Section>
      <SectionTitle>All Teams</SectionTitle>
      <Flex>
        <Link to={'/teams/new'}>
          <NewTeamButton>+ Add New Team</NewTeamButton>
        </Link>
      </Flex>
      {loading ? (
        <Flex alignItems="center" justifyContent="center">
          <Loader />
        </Flex>
      ) : (
        <TeamsTable
          teams={teams}
          onDelete={(t: Team) => {
            const id: number = t.id || -1
            TeamsService.delTeam(id).then(() => {
              setTeams(teams.filter(t => t.id !== id))
              reloadTeams()
            })
          }}
        />
      )}
    </Section>
  )
}

export default TeamsPage
