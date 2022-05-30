import API from '../API'
import { Player, PlayersResponse } from '../types'

interface GetPlayersOptions {
  limit?: number
}

export class PlayersService {
  static getAllPlayers(options?: GetPlayersOptions): Promise<PlayersResponse> {
    const { limit } = options || {}
    const params = { limit: limit }

    return API.get("/players").then(response => {
      return { ret: response.data }
    })
  }

  static addPlayer(options?: Player): Promise<boolean> {
    return API.post("/player", JSON.stringify(options))
      .then(() => true)
      .catch(() => false)
  }

  static delPlayer(id: number): Promise<boolean> {
    return API.delete(`/players/${id}`).then(() => true).catch(() => false)
  }
}
