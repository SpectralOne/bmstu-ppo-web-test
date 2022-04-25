import { Pool } from "pg";
import { IPlayersRepo } from "../db/IPlayersRepo";
import { Player } from "../model/Player";
import { buildConn } from "../db/utils";

export class PlayersController extends IPlayersRepo {
  conn: Pool;
  IPlayersRepo: IPlayersRepo;

  constructor(connParams: any) {
    super();
    this.conn = buildConn(connParams);
    this.IPlayersRepo = new IPlayersRepo;
  }

  async delPlayer(id: number) {
    return await this.IPlayersRepo.delPlayer(id, this.conn);
  }

  async addPlayer(player: Player) {
    return await this.IPlayersRepo.addPlayer(player, this.conn);
  }

  async getPlayers() {
    return await this.IPlayersRepo.getPlayers(this.conn);
  }

  async addPlayerTeam(playerId: number, teamId: number) {
    return await this.IPlayersRepo.delPlayerTeam(playerId, teamId, this.conn);
  }

  async delPlayerTeam(playerId: number, teamId: number) {
    return await this.IPlayersRepo.delPlayerTeam(playerId, teamId, this.conn);
  }
}
