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
  users: User[];

  constructor(users: User[]) {
    this.users = users;
  }

  async addUser(user: User) {
    this.users.push(user);
    return true;
  }

  async getUserByLogin(login: string, password: string) {
    const users = this.users.filter((instance) => instance.login === login && instance.password === password);
    return users.length ? users[0] : null;
  }

  async getUserById(id: number) {
    const users = this.users.filter((instance) => instance.id === id);
    return users.length ? users[0] : null;
  }

  async userExists(login: string) {
    const users = this.users.filter((instance) => instance.login === login);
    return users.length ? true : false;
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

  it("Get user by login and password", async () => {
    const gotUsers = [];
    for (let i = 0; i < users.length; i++) {
      const gotUser = await SUT.getUserByLogin(users[i].login, users[i].password);
      expect(gotUser).toBeTruthy();
      gotUsers.push(gotUser);
    }
    expect(users).toEqual(gotUsers);
  })

  it("Get user by id", async () => {
    const gotUsers = [];
    for (let i = 0; i < users.length; i++) {
      const gotUser = await SUT.getUserById(users[i].id);
      expect(gotUser).toBeTruthy();
      gotUsers.push(gotUser);
    }
    expect(users).toEqual(gotUsers);
  })

  it("User exists and not exist", async () => {
    const exists = await SUT.userExists(users[0].login);
    const notExists = await SUT.userExists("I dont exist");
    expect(exists).toBeTruthy();
    expect(notExists).toBeFalsy();
  })
});

class MockTeamsRepo implements ITeamsRepo {
  teams: Team[];

  constructor(teams: Team[]) {
    this.teams = teams;
  }

  async getTeam(id: number) {
    const teams = this.teams.filter((instance) => instance.id === id);
    return teams.length ? teams[0] : null;
  }

  async getTeams(limit: number | null) {
    const teams = this.teams;
    return teams.length
      ? limit
        ? teams.sort((c, n) => c.name > n.name ? -1 : 1).slice(0, limit)
        : teams
      : null;
  }

  async getPlayerTeams(id: number, limit: number | null) {
    const teams = this.teams.filter((instance) => instance.owner === id);
    return teams.length
      ? limit
        ? teams.sort((c, n) => c.name > n.name ? -1 : 1).slice(0, limit)
        : teams
      : null;
  }

  async addTeam(team: Team) {
    this.teams.push(team);
    return true;
  }

  async delTeam(teamid: number) {
    const idx: number = this.teams.findIndex(x => x.id === teamid);
    if (idx > -1) {
      this.teams.splice(idx, 1);
      return true;
    }

    return false;
  }
}

describe("Test TeamsController", () => {
  const teams = [
    new Team(1, 1, "Team Name 1", "Team Descr", [1, 2]),
    new Team(2, 2, "Team Name 2", "Team Descr", []),
    new Team(3, 2, "Team Name 3", "Team Descr", [])
  ];
  const SUT = new TeamsController(new MockTeamsRepo([]));

  it("Add team", async () => {
    for (let i = 0; i < teams.length; i++) {
      const opres = await SUT.addTeam(teams[i]);
      expect(opres).toBeTruthy();
    }
  })

  it("Get teams", async () => {
    const gotTeams = await SUT.getTeams(null);
    expect(gotTeams).toEqual(teams);
  })

  it("Delete team", async () => {
    const delres = await SUT.delTeam(3);
    const gotTeams = await SUT.getTeams(null);
    expect(delres).toBeTruthy();
    expect(gotTeams).toEqual(teams.slice(0, 2));
  })

  it("Get team", async () => {
    const team = await SUT.getTeam(1);
    expect(team).toEqual(teams[0]);
  })

  it("Get players teams", async () => {
    const opres = await SUT.getPlayerTeams(2, null);
    expect(opres).toEqual([teams[1]]);
  })
});

class MockPlayersRepo implements IPlayersRepo {
  players: Player[];
  teams: Team[];

  constructor(players: Player[], teams: Team[]) {
    this.players = players;
    this.teams = teams;
  }

  async addPlayer(player: Player) {
    this.players.push(player);
    return true;
  }

  async getPlayer(id: number) {
    const idx: number = this.players.findIndex(x => x.id === id);
    if (idx === -1) {
      return null;
    }
    return this.players[idx];
  }

  async getPlayers(limit: number | null) {
    const players = this.players;
    return players.length
      ? limit
        ? players.sort((c, n) => c.id > n.id ? -1 : 1).slice(0, limit)
        : players
      : null;
  }

  async delPlayer(id: number) {
    const idx: number = this.players.findIndex(x => x.id === id);
    if (idx > -1) {
      this.players.splice(idx, 1);
      return true;
    }
    return false;
  }

  async addPlayerTeam(playerId: number, teamId: number) {
    if (!this.teams.length || !this.players.length) {
      return false;
    }

    const teamIdx = this.teams.findIndex(x => x.id === teamId);
    if (teamIdx === -1) {
      return false;
    }

    const playerIdx = this.players.findIndex(x => x.id === playerId);
    if (playerIdx === -1) {
      return false;
    }

    const hasPlayer = this.teams[teamIdx].players.findIndex(x => x === playerId) > -1;
    if (hasPlayer) {
      return false;
    }

    this.players[playerIdx].teams.push(teamId);
    this.teams[teamIdx].players.push(playerId);
    return true;
  }

  async delPlayerTeam(playerId: number, teamId: number,) {
    if (!this.teams.length || !this.players.length) {
      return false;
    }

    const teamIdx = this.teams.findIndex(instance => instance.id === teamId);
    if (teamIdx === -1) {
      return false;
    }

    const playerIdx = this.players.findIndex(x => x.id === playerId);
    if (playerIdx === -1) {
      return false;
    }

    const delTeamIdx = this.players[playerIdx].teams.findIndex(x => x === teamId);
    if (delTeamIdx === -1) {
      return false;
    }

    const delPlayerIdx = this.teams[teamIdx].players.findIndex(x => x === playerId)
    if (delPlayerIdx === -1) {
      return false;
    }

    this.players[playerIdx].teams.splice(delTeamIdx, 1)
    this.teams[teamIdx].players.splice(delPlayerIdx, 1);
    return true;
  }
}

describe("Test PlayersController", () => {
  const players = [
    new Player(1, 1, "1", "n", "Russia", new Date("1987-01-01"), [1]),
    new Player(2, 1, "2", "n", "Russia", new Date("1970-01-01"), [1]),
    new Player(3, 2, "3", "n", "Canada", new Date("1990-01-01"), [])
  ];
  const teams = [
    new Team(1, 1, "Team Name 1", "Team Descr", [1, 2]),
    new Team(2, 2, "Team Name 2", "Team Descr", []),
    new Team(3, 2, "Team Name 3", "Team Descr", [])
  ];

  const SUT = new PlayersController(new MockPlayersRepo([], teams));

  it("Add players", async () => {
    for (let i = 0; i < players.length; i++) {
      const opres = await SUT.addPlayer(players[i]);
      expect(opres).toBeTruthy();
    }
  })

  it("Get Players", async () => {
    const actual = await SUT.getPlayers(null);
    expect(players).toEqual(actual);
  })

  it("Delete Player", async () => {
    const opres = await SUT.delPlayer(3);
    const actual = await SUT.getPlayers(null);
    expect(opres).toBeTruthy();
    expect(players.slice(0, 2)).toEqual(actual);
  })

  it("Add player to team", async () => {
    const opres = await SUT.addPlayerTeam(2, 3);
    const gotPlayer = await SUT.getPlayer(2);
    expect(opres).toBeTruthy();
    expect(gotPlayer!.teams).toEqual([1, 3]);
  })

  it("Delete player from team", async () => {
    const opres = await SUT.delPlayerTeam(2, 3);
    const gotPlayer = await SUT.getPlayer(2);
    expect(opres).toBeTruthy();
    expect(gotPlayer!.teams).toEqual([1]);
  })
})
