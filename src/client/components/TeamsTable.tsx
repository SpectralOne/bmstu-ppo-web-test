import React from 'react'
import { Team } from '../types'
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
  teams: Team[]
  deletea: boolean
  onDelete: (t: Team) => void
}

const TeamsTable: React.FC<Props> = ({ teams, onDelete, deletea }) => (
  <Table cellPadding={0} cellSpacing={0}>
    <thead>
      <tr>
        <th>ID</th>
        <th>Team name</th>
        <th>Description</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {teams.map((t, i) => (
        <tr key={i} data-id={t.id}>
          <td>{t.id}</td>
          <td>{t.name}</td>
          <td>{t.description}</td>
          {deletea ? <td>
            <DeleteConfirmation onDelete={() => onDelete(t)} />
          </td> : <td />}
        </tr>
      ))}
    </tbody>
  </Table>
)


export default TeamsTable
