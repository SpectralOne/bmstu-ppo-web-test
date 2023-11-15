import API from '../API'
import { Team, TeamsResponse, HistoryTeamsResponse } from '../types'
import { api401 } from '../utils'

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
    return API.get(`/player/${playerId}/teams`).then(response => {
      return { ret: response.data }
    })
  }

  static delTeam(id: number): Promise<boolean> {
    return API.delete(`/teams/${id}`)
    .then(() => true)
    .catch(err => api401(err))
  }

  static addTeam(team: Team): Promise<boolean> {
    return API.post(`/teams`, JSON.stringify(team))
    .then(() => true)
    .catch(err => api401(err))
  }

  static getPlayerHistory(playerId: number): Promise<HistoryTeamsResponse> {
    return API.get(`/player/${playerId}/history`).then(response => {
      return { ret: response.data }
    })
  }
}
