import { Player } from "../model/Player";
import { Team } from "../model/Team";
import { User } from "../model/User";

export const correctDate = (date: Date) => {
  if (typeof (date) === "string")
    date = new Date(date);

  if (date.getTimezoneOffset() !== 0)
    date.setTime(date.getTime() - date.getTimezoneOffset() * 60 * 1000);

  return date;
}

export class DTOUser {
  id: number;
  login: string;
  privelegelevel: number;

  constructor(obj: any) {
    this.id = obj.id;
    this.login = obj.login;
    this.privelegelevel = obj.privelegelevel;
  }

  toUser() {
    return new User(this.id, this.login, '', this.privelegelevel);
  }
};

export class DTOUserWithPass {
  id: number;
  login: string;
  password: string;
  privelegelevel: number;

  constructor(obj: any) {
    this.id = obj.id;
    this.login = obj.login;
    this.password = obj.password;
    this.privelegelevel = obj.privelegelevel;
  }

  toUser() {
    return new User(this.id, this.login, this.password, this.privelegelevel);
  }
};

export class DTOUserLoginInfo {
  login: string;
  password: string;

  constructor(obj: any) {
    this.login = obj.login;
    this.password = obj.password;
  }
};

export class DTOPlayer {
  id: number;
  owner: number;
  firstname: string;
  lastname: string;
  country: string;
  birthdate: Date;
  teams: number[];

  constructor(obj: any) {
    this.id = obj.id;
    this.owner = obj.owner;
    this.firstname = obj.firstname;
    this.lastname = obj.lastname;
    this.country = obj.country;
    this.birthdate = correctDate(obj.birthdate);
    this.teams = obj.teams;
  }

  toPlayer() {
    return new Player(this.id, this.owner, this.firstname, this.lastname, this.country, this.birthdate, this.teams);
  }
};

export class DTOPlayerUpdate {
  id: number;
  owner: number;
  firstname: string;
  lastname: string;
  country: string;
  birthdate: Date;
  teams: number[];

  constructor(obj: any) {
    this.id = obj.id;
    this.owner = obj.owner;
    this.firstname = obj.firstname;
    this.lastname = obj.lastname;
    this.country = obj.country;
    this.birthdate = correctDate(obj.birthdate);
    this.teams = obj.teams;
  }

  toPlayer() {
    return new Player(this.id, this.owner, this.firstname, this.lastname, this.country, this.birthdate, this.teams);
  }
};

export class DTOTeam {
  id: number;
  owner: number;
  name: string;
  description: string;
  players: number[];

  constructor(obj: any) {
    this.id = obj.id;
    this.owner = obj.owner;
    this.name = obj.name;
    this.description = obj.description;
    this.players = obj.players;
  }

  toTeam() {
    return new Team(this.id, this.owner, this.description, this.name, this.players);
  }
};
