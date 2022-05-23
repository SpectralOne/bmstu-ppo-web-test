import { Player } from "../model/Player";

export interface IPlayersRepo {
  delPlayer(id: number): Promise<boolean>;
  addPlayer(player: Player): Promise<boolean>;
  getPlayer(id: number): Promise<Player | null>;
  getPlayers(limit?: number): Promise<Player[] | null>;
  addPlayerTeam(playerId: number, teamId: number): Promise<boolean>;
  delPlayerTeam(playerId: number, teamId: number): Promise<boolean>;
}
