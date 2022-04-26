import { MockQueryResult } from "./testUtils";

import { PlayersController } from "../src/logic/PlayersController";
import { TeamsController } from "../src/logic/TeamsController";
import { UsersController } from "../src/logic/UsersController";

import { IPlayersRepo } from "../src/db/IPlayersRepo";
import { ITeamsRepo } from "../src/db/ITeamsRepo";
import { IUsersRepo } from "../src/db/IUsersRepo";

import { Player } from "../src/model/Player";
import { Team } from "../src/model/Team";
import { User } from "../src/model/User";

class MockUserRepo implements IUsersRepo {
  conn: any;
  users: User[];

  constructor(users: User[]) {
    this.users = users;
  }

  async addUser(user: User) {
    this.users.push(user);
    return new MockQueryResult(null, 1);
  }

  async getUserId(login: string, password: string) {
    const users = this.users.filter((instance) => instance.login === login && instance.password === password);
    return users.length ? users[0].id : null;
  }

  async getUser(id: number) {
    const users = this.users.filter((instance) => instance.id === id);
    if (users.length) {
      const { id, login, password, privelegelevel } = users[0];
      return new User(id, login, password, privelegelevel);
    }
    return null;
  }
}

describe("Test UserController", () => {
  const users = [
    new User(1, "i", "just1", 0),
    new User(2, "hate", "just2", 0),
    new User(3, "ts", "just3", 1)
  ];
  const SUT = new UsersController(new MockUserRepo([]));

  it("Create user", async () => {
    for (let i = 0; i < users.length; i++) {
      const opres = await SUT.addUser(users[i]);
      expect(opres).toBeTruthy();
    }
  })

  it("Get user id", async () => {
    const gotIds = [];
    for (let i = 0; i < users.length; i++) {
      const gotId = await SUT.getUserId(users[i].login, users[i].password);
      expect(gotId).toBeTruthy();
      gotIds.push(gotId);
    }
    expect(users.map(u => u.id)).toEqual(gotIds);
  })

  it("Get user by id", async () => {
    const gotUsers = [];
    for (let i = 0; i < users.length; i++) {
      const gotUser = await SUT.getUser(users[i].id);
      expect(gotUser).toBeTruthy();
      gotUsers.push(gotUser);
    }
    expect(users).toEqual(gotUsers);
  })
});

class MockTeamsRepo implements ITeamsRepo {
  conn: any;
  teams: Team[];

  constructor(teams: Team[]) {
    this.teams = teams;
  }

  async addTeam(team: Team) {
    this.teams.push(team);
    return new MockQueryResult(null, 1);
  }

  async delTeam(teamid: number) {
    const idx: number = this.teams.findIndex(x => x.id === teamid);
    if (idx > -1) {
      this.teams.splice(idx, 1);
    }

    return new MockQueryResult(null, 1);
  }
}

describe("Test TeamsController", () => {
  const SUT = new TeamsController(new MockTeamsRepo([]));

  it("Add team", async () => {
    const team = new Team(1, 1, "Team Name", "Team Descr");
    const opres = await SUT.addTeam(team);
    expect(opres).toBeTruthy();
  })

  it("Delete team", async () => {
    const delres = await SUT.delTeam(1);
    expect(delres).toBeTruthy();
  })
});

class MockPlayersRepo implements IPlayersRepo {
  conn: any;
  players: Player[];

  constructor(players: Player[]) {
    this.players = players;
  }

  async addPlayer(player: Player) {
    this.players.push(player);
    return new MockQueryResult(null, 1);
  }

  async getPlayers() {
    return this.players;
  }

  async delPlayer(id: number) {
    const idx: number = this.players.findIndex(x => x.id === id);
    if (idx > -1) {
      this.players.splice(idx, 1);
    }
    return new MockQueryResult(null, 1);
  }

  async addPlayerTeam(playerId: number, teamId: number) {
    return new MockQueryResult(null, 1);
  }

  async delPlayerTeam(playerId: number, teamId: number,) {
    return new MockQueryResult(null, 1);
  }
}

describe("Test PlayersController", () => {
  const players = [
    new Player(1, 1, "1", "n", "Russia", new Date("1987-01-01")),
    new Player(2, 1, "2", "n", "Russia", new Date("1970-01-01")),
    new Player(3, 2, "3", "n", "Canada", new Date("1990-01-01"))
  ];
  const SUT = new PlayersController(new MockPlayersRepo([]));

  it("Add players", async () => {
    for (let i = 0; i < players.length; i++) {
      const opres = await SUT.addPlayer(players[i]);
      expect(opres).toBeTruthy();
    }
  })

  it("Get Players", async () => {
    const actual = await SUT.getPlayers();
    expect(players).toEqual(actual);
  })

  it("Delete Player", async () => {
    const opres = await SUT.delPlayer(3);
    const actual = await SUT.getPlayers();
    expect(opres).toBeTruthy();
    expect(players.slice(0, 2)).toEqual(actual);
  })
})
