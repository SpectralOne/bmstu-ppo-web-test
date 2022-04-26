import { IPlayersRepo } from "../db/IPlayersRepo";
import { Player } from "../model/Player";

export class PlayersController {
  IPlayersRepo: IPlayersRepo;

  constructor(IPlayersRepo: IPlayersRepo) {
    this.IPlayersRepo = IPlayersRepo;
  }

  async delPlayer(id: number) {
    return await this.IPlayersRepo.delPlayer(id);
  }

  async addPlayer(player: Player) {
    return await this.IPlayersRepo.addPlayer(player);
  }

  async getPlayers() {
    return await this.IPlayersRepo.getPlayers();
  }

  async addPlayerTeam(playerId: number, teamId: number) {
    return await this.IPlayersRepo.delPlayerTeam(playerId, teamId);
  }

  async delPlayerTeam(playerId: number, teamId: number) {
    return await this.IPlayersRepo.delPlayerTeam(playerId, teamId);
  }
}
