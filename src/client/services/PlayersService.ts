import API from '../API'
import { Player, PlayersResponse, PlayerTeam } from '../types'

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
    return API.post("/player", JSON.stringify(player)).then(() => true).catch(() => false)
  }

  static delPlayer(id: number): Promise<boolean> {
    return API.delete(`/players/${id}`).then(() => true).catch(() => false)
  }

  static addPlayerTeam(playerTeam: PlayerTeam): Promise<boolean> {
    console.log(playerTeam)
    const { playerid, teamid } = playerTeam;
    return API.patch(`/players/${teamid}/player`, JSON.stringify({ playerid })).then(() => true).catch(() => false)
  }

  static delPlayerTeam(playerTeam: PlayerTeam): Promise<boolean> {
    const { playerid, teamid } = playerTeam;
    return API.delete(`/players/${teamid}/player`, { data: { playerid: playerid } }).then(() => true).catch(() => false)
  }
}
