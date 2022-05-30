import React from 'react'
import { Player } from '../types'
import { colors } from '../theme'
import styled from '@emotion/styled'
import DeleteConfirmation from "./DeleteConfirmation";

const Table = styled.table`
  th {
    background-color: ${colors.appBg};
  }
  th,
  td {
    text-align: left;
    padding: 8px 16px;
  }
  td {
    border-top: 1px solid ${colors.divider};
    &:first-of-type {
      width: 100%;
    }
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
      <th>Player Name</th>
      <th/>
    </tr>
    </thead>
    <tbody>
    {players.map((p, i) => (
      <tr key={i} data-id={p.id}>
        <td>{p.firstname} {p.lastname}</td>
        <td>
          <DeleteConfirmation onDelete={() => onDelete(p)}/>
        </td>
      </tr>
    ))}
    </tbody>
  </Table>
)


export default PlayersTable
