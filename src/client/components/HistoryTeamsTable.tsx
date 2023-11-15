import React from 'react'
import { HistoryTeam } from '../types'
import { colors } from '../theme'
import styled from '@emotion/styled'
import { getFormattedDate } from '../utils'

const Table = styled.table`
  width: 100%;
  th {
    background-color: ${colors.paperLight};
  }
  th,
  td {
    text-align: left;
    padding: 8px 16px;
  }
  td {
    border-top: 1px solid ${colors.divider};
  }
  tr:hover {
    background-color: #fafafa;
  }
`

interface Props {
  teams: HistoryTeam[]
}

const HistoryTeamsTable: React.FC<Props> = ({ teams }) => (
  <Table cellPadding={0} cellSpacing={0}>
    <thead>
    <tr>
      <th>ID</th>
      <th>Team name</th>
      <th>Description</th>
      <th>Leaved</th>
    </tr>
    </thead>
    <tbody>
    {teams.map((t, i) => (
      <tr key={i} data-id={t.id}>
        <td>{t.id}</td>
        <td>{t.name}</td>
        <td>{t.description}</td>
        <td>{getFormattedDate(t.leaved)}</td>
      </tr>
    ))}
    </tbody>
  </Table>
)

export default HistoryTeamsTable
