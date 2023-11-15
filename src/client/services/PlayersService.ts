import API from '../API'
import { Player, PlayersResponse, PlayerTeam } from '../types'
import { api401 } from '../utils'

interface GetPlayersOptions {
  limit?: number
}

export class PlayersService {
  static getAllPlayers(options?: GetPlayersOptions): Promise<PlayersResponse> {
    const { limit } = options || {};
    const params = { limit: limit }

    return API.get("/players", { params }).then(response => {
      return { ret: response.data }
    })
  }

  static addPlayer(player: Player): Promise<boolean> {
    return API.post("/players", JSON.stringify(player))
    .then(() => true)
    .catch(err => api401(err))
  }

  static delPlayer(id: number): Promise<boolean> {
    return API.delete(`/players/${id}`)
    .then(() => true)
    .catch(err => api401(err))
  }

  static addPlayerTeam(playerTeam: PlayerTeam): Promise<boolean> {
    const { playerid, teamid } = playerTeam;
    return API.patch(`/teams/${teamid}/players/${playerid}`)
      .then(() => true)
      .catch(err => api401(err))
  }

  static delPlayerTeam(playerTeam: PlayerTeam): Promise<boolean> {
    const { playerid, teamid } = playerTeam;
    return API.delete(`/teams/${teamid}/players/${playerid}`)
    .then(() => true)
    .catch(err => api401(err))
  }
}
