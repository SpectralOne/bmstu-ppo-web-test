import { exec } from "child_process";
import { Player } from "../src/model/Player";
import { Team } from "../src/model/Team";
import { User } from "../src/model/User";
import { ConnParams } from "../src/types/ConnParams";
import { UsersRepo } from "../src/db/UsersRepo";
import { TeamsRepo } from "../src/db/TeamsRepo";
import { PlayersRepo } from "../src/db/PlayersRepo";

const USERNAME = "admin";
const HOST = "localhost";
const DATABASE = "test_db";
const PASSWORD = "admin";
const PORT = 5432;

const prepareTestDB = () => {
  const script_template = `PGPASSWORD=${PASSWORD} psql -h ${HOST} -U ${USERNAME} -d ${DATABASE} -f ./sql/db_init.sql`;
  exec(script_template);
}

const connParams: ConnParams = {
  user: USERNAME,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: PORT,
};

beforeAll(() => {
  prepareTestDB();
});

describe("Test UserRepo", () => {
  const users = [
    new User(1, "i", "just1", 0),
    new User(2, "hate", "just2", 0),
    new User(3, "ts", "just3", 1)
  ];
  const SUT = new UsersRepo(connParams);

  it("Create user", async () => {
    for (let i = 0; i < users.length; i++) {
      const opres = await SUT.addUser(users[i]);
      expect(opres).toBeTruthy();
    }
  })

  it("Get user by login and password", async () => {
    const gotUsers = [];
    for (let i = 0; i < users.length; i++) {
      const gotUser = await SUT.getUserByLogin(users[i].login);
      expect(gotUser).toBeTruthy();
      gotUsers.push(gotUser);
    }
    expect(users.map(x => x.login)).toEqual(gotUsers.map(x => x!.login));
  })

  it("User exists and not exist", async () => {
    const exists = await SUT.userExists(users[0].login);
    const notExists = await SUT.userExists("Idontexist");
    expect(exists).toBeTruthy();
    expect(notExists).toBeFalsy();
  })
});

describe("Test TeamsRepo", () => {
  const teams = [
    new Team(1, 1, "Team Name 1", "Team Descr", []),
    new Team(2, 2, "Team Name 2", "Team Descr", []),
    new Team(3, 2, "Team Name 3", "Team Descr", [])
  ];
  const SUT = new TeamsRepo(connParams);

  it("Add team", async () => {
    for (let i = 0; i < teams.length; i++) {
      const opres = await SUT.addTeam(teams[i]);
      expect(opres).toBeTruthy();
    }
  })

  it("Get teams", async () => {
    const gotTeams = await SUT.getTeams();
    expect(gotTeams).toEqual(teams);
  })

  it("Delete team", async () => {
    const delres = await SUT.delTeam(3);
    const gotTeams = await SUT.getTeams();
    expect(delres).toBeTruthy();
    expect(gotTeams).toEqual(teams.slice(0, 2));
  })

  it("Get team", async () => {
    const team = await SUT.getTeam(1);
    expect(team).toEqual(teams[0]);
  })

  it("Get players teams", async () => {
    const opres = await SUT.getPlayerTeams(2);
    expect(opres).toEqual([teams[1]]);
  })
});

describe("Test PlayersRepo", () => {
  const players = [
    new Player(1, 1, "1", "n", "Russia", new Date("1987-01-01"), [1]),
    new Player(2, 1, "2", "n", "Russia", new Date("1970-01-01"), [1]),
    new Player(3, 2, "3", "n", "Canada", new Date("1990-01-01"), [])
  ];
  const teams = [
    new Team(1, 1, "Team Name 1", "Team Descr", [1, 2]),
    new Team(2, 2, "Team Name 2", "Team Descr", []),
  ];

  const SUT = new PlayersRepo(connParams);

  it("Add players", async () => {
    for (let i = 0; i < players.length; i++) {
      const opres = await SUT.addPlayer(players[i]);
      expect(opres).toBeTruthy();
    }
  })

  it("Add players to teams", async () => {
    const opres1 = await SUT.addPlayerTeam(1, 1);
    const opres2 = await SUT.addPlayerTeam(2, 1);
    const gotPlayer = await SUT.getPlayer(2);
    expect(opres1).toBeTruthy();
    expect(opres2).toBeTruthy();
    expect(gotPlayer!.teams).toEqual([1]);
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

  it("Delete player from team", async () => {
    const opres = await SUT.delPlayerTeam(2, 2);
    const gotPlayer = await SUT.getPlayer(2);
    expect(opres).toBeTruthy();
    expect(gotPlayer!.teams).toEqual([1]);
  })
});
