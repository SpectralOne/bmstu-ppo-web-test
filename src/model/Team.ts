export class Team {
  id: number;
  owner: number;
  name: string;
  description: string;
  players: number[];

  constructor(id: number, owner: number, description: string, name: string, players: number[]) {
    this.id = id;
    this.owner = owner;
    this.name = name;
    this.description = description;
    this.players = players;
  }
}
