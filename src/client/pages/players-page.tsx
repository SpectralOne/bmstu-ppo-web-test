import React, { useState, useEffect } from 'react'
import PlayersTable from '../components/PlayersTable'
import { PlayersService } from '../services'
import { ButtonSuccess, Section, SectionTitle, Flex } from '../theme'
import styled from '@emotion/styled'
import { Link, useParams } from 'react-router-dom'
import { Player } from '../types'
import Loader from '../components/Loader'

const NewPlayerButton = styled(ButtonSuccess)`
  margin-bottom: 24px;
`

const PaginationWrapper = styled.div`
  margin-left: auto;
`

const PlayersPage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [players, setPlayers] = useState<Player[]>([])
  const { limit } = useParams<{ limit: string }>();

  const reloadPlayers = () => {
    const parsedLimit = parseInt(limit);

    setLoading(true)
    PlayersService.getAllPlayers({ limit: parsedLimit }).then(playersRes => {
      setPlayers(playersRes.ret)
      setLoading(false)
    })
  }

  useEffect(reloadPlayers, [limit])

  return (
    <Section>
      <SectionTitle>All Players</SectionTitle>
      <Flex>
        <Link to={'/players/new'}>
          <NewPlayerButton>+ Add New Player</NewPlayerButton>
        </Link>
      </Flex>
      {loading ? (
        <Flex alignItems="center" justifyContent="center">
          <Loader />
        </Flex>
      ) : (
        <PlayersTable
          players={players}
          onDelete={(p: Player) => {
            const id: number = p.id || -1
            PlayersService.delPlayer(id).then(() => {
              setPlayers(players.filter(p => p.id !== id))
              reloadPlayers()
            })
          }}
        />
      )}
    </Section>
  )
}

export default PlayersPage
