import { Player } from "../model/Player";

interface PgPlayersRepo {
  addPlayer(_player: Player, _conn: any): Promise<any>;
  getPlayers(_limit: number | null, _conn: any): Promise<any>;
  getPlayer(_id: number, _conn: any): Promise<any>;
  delPlayer(_id: number, _conn: any): Promise<any>;
  addPlayerTeam(_playerId: number, _teamId: number, _conn: any): Promise<any>;
  delPlayerTeam(_playerId: number, _teamId: number, _conn: any): Promise<any>;
}

export interface IPlayersRepo extends PgPlayersRepo {
  delPlayer(id: number): Promise<boolean>;
  addPlayer(player: Player): Promise<boolean>;
  getPlayer(id: number): Promise<Player | null>;
  getPlayers(limit: number | null): Promise<Player[] | null>;
  addPlayerTeam(playerId: number, teamId: number): Promise<boolean>;
  delPlayerTeam(playerId: number, teamId: number): Promise<boolean>;
}
