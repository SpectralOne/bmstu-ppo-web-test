import React from 'react'
import { Player } from '../types'
import { colors, breakpoints } from '../theme'
import styled from '@emotion/styled'
import DeleteConfirmation from "./DeleteConfirmation";

const Table = styled.table`
  width: 100%;
  th {
    background-color: ${colors.paperLight};
  }
  th,
  td {
    text-align: left;
    padding: 8px 16px;
    @media screen and (max-width: ${breakpoints.md}px) {
      padding: 4px;
    }
  }
  td {
    border-top: 1px solid ${colors.divider};
  }
  tr:hover {
    background-color: #fafafa;
  }
`

interface Props {
  players: Player[]
  onDelete: (plant: Player) => void
}

const PlayersTable: React.FC<Props> = ({ players, onDelete }) => (
  <Table cellPadding={0} cellSpacing={0}>
    <thead>
    <tr>
      <th>ID</th>
      <th>Player Name</th>
      <th>Player Birthdate</th>
      <th/>
    </tr>
    </thead>
    <tbody>
    {players.map((p, i) => (
      <tr key={i} data-id={p.id}>
        <td>{p.id}</td>
        <td>{p.firstname} {p.lastname}</td>
        <td>{new Date(p.birthdate!).toLocaleDateString()}</td>
        <td>
          <DeleteConfirmation onDelete={() => onDelete(p)}/>
        </td>
      </tr>
    ))}
    </tbody>
  </Table>
)


export default PlayersTable
