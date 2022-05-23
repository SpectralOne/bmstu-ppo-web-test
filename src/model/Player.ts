export class Player {
  id: number;
  owner: number;
  firstname: string;
  lastname: string;
  country: string;
  birthdate: Date;
  teams: number[];

  constructor(id: number, owner: number, firstname: string, lastname: string, country: string, birthdate: Date, teams: number[]) {
    this.id = id;
    this.owner = owner;
    this.firstname = firstname;
    this.lastname = lastname;
    this.country = country;
    this.birthdate = birthdate;
    this.teams = teams;
  }

  toString(): string {
    return `${this.id}: ${this.lastname} ${this.firstname} from ${this.country}, born ${this.birthdate.toString()}\n`;
  }
}
