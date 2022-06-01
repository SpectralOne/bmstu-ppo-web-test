import API from '../API'
import { Team, TeamsResponse } from '../types'

interface GetTeamsOptions {
  limit?: number
}

export class TeamsService {
  static getAllTeams(options?: GetTeamsOptions): Promise<TeamsResponse> {
    const { limit } = options || {};
    const params = { limit: limit }

    return API.get("/teams", { params }).then(response => {
      return { ret: response.data }
    })
  }

  static getPlayerTeams(playerId: number): Promise<TeamsResponse> {
    return API.get(`/teams/${playerId}/teams`).then(response => {
      return { ret: response.data}
    })
  }

  static delTeam(id: number): Promise<boolean> {
    return API.delete(`/teams/${id}`).then(() => true).catch(() => false)
  }

  static addTeam(team: Team): Promise<boolean> {
    return API.post(`/team`, JSON.stringify(team)).then(() => true).catch(() => false)
  }
}
