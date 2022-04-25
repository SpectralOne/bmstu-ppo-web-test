import { User } from "./User";

export class Team {
  id: number;
  owner: number;
  name: string;
  description: string;

  constructor(id: number, owner: number, description: string, name: string) {
    this.id = id;
    this.owner = owner;
    this.name = name;
    this.description = description;
  }
}
