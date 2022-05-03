import { IPlayersRepo } from "../db/IPlayersRepo";
import { Player } from "../model/Player";

export class PlayersController {
  PlayersRepo: IPlayersRepo;

  constructor(IPlayersRepo: IPlayersRepo) {
    this.PlayersRepo = IPlayersRepo;
  }

  async delPlayer(id: number) {
    return await this.PlayersRepo.delPlayer(id);
  }

  async addPlayer(player: Player) {
    return await this.PlayersRepo.addPlayer(player);
  }

  async getPlayer(id: number) {
    return await this.PlayersRepo.getPlayer(id);
  }

  async getPlayers(limit: number | null) {
    return await this.PlayersRepo.getPlayers(limit);
  }

  async addPlayerTeam(playerId: number, teamId: number) {
    return await this.PlayersRepo.addPlayerTeam(playerId, teamId);
  }

  async delPlayerTeam(playerId: number, teamId: number) {
    return await this.PlayersRepo.delPlayerTeam(playerId, teamId);
  }
}
