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

  toString(): string {
    return `${this.id}: ${this.name} (${this.description})`;
  }
}

export class HistoryTeam extends Team {
  leaved: Date;

  constructor(id: number, owner: number, description: string, name: string, players: number[], leaved: Date) {
    super(id, owner, description, name, players);
    this.leaved = leaved;
  }

  toString(): string {
    return `${this.id}: ${this.name} (${this.description}). Leaved -- ${this.leaved.toISOString()}`;
  }
}
