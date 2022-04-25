import { PlayersController } from "../src/logic/PlayersController";
import { TeamsController } from "../src/logic/TeamsController";
import { UsersController } from "../src/logic/UsersController";

import { exec } from "child_process";
import { Player } from "../src/model/Player";
import { Team } from "../src/model/Team";
import { User } from "../src/model/User";

const USERNAME = "admin";
const HOST = "localhost";
const DATABASE = "test_db";
const PASSWORD = "admin";
const PORT = 5432;

const prepareTestDB = () => {
    const script_template = `PGPASSWORD=${PASSWORD} psql -h ${HOST} -U ${USERNAME} -d ${DATABASE} -f ./sql/db_init.sql`;
    exec(script_template);
}

const connParams = {
    user: USERNAME,
    host: HOST,
    database: DATABASE,
    password: PASSWORD,
    port: PORT,
};

const uc = new UsersController(connParams);
const tc = new TeamsController(connParams);
const pc = new PlayersController(connParams);

prepareTestDB()

describe("Database access component tests", () => {
    const players = [
        new Player(1, 1, "1", "n", "Russia", new Date("1987-01-01")),
        new Player(2, 1, "2", "n", "Russia", new Date("1970-01-01")),
        new Player(3, 2, "3", "n", "Canada", new Date("1990-01-01"))
    ];
    const users = [
        new User(1, "i", "just1", 0),
        new User(2, "hate", "just2", 0),
        new User(3, "ts", "just3", 1)
    ];

    describe("Users manipulation", () => {
        it("Create user and get his id", async () => {
            for (let i = 0; i < users.length; i++) {
                const opres = await uc.addUser(users[i]);
                expect(opres).toBeTruthy();
            }
            const gotIds = [];
            for (let i = 0; i < users.length; i++) {
                const gotId = await uc.getUserId(users[i].login, users[i].password);
                expect(gotId).toBeTruthy();
                gotIds.push(gotId);
            }
            expect(users.map(u => u.id)).toEqual(gotIds);
        })
        
        it("Get user by id", async () => {
            const gotUsers = [];
            for (let i = 0; i < users.length; i++) {
                const gotUser = await uc.getUser(users[i].id);
                expect(gotUser).toBeTruthy();
                gotUsers.push(gotUser);
            }
            expect(users).toEqual(gotUsers);
        })
        
        it("Add & delete team for user", async () => {
            for (let i = 0; i < users.length; i++) {
                const team = new Team(0, users[i].id, users[i].login, users[i].password);
                const opres = await tc.addTeam(team);
                team.id = users[i].id;
                expect(opres).toBeTruthy();
            }
            const delres = await tc.delTeam(3);
            expect(delres).toBeTruthy();
        })
    });


    describe("Players manipulation", () => {
        test("Add and get players", async () => {
            for (let i = 0; i < players.length; i++) {
                const opres = await pc.addPlayer(players[i]);
                players[i].id = +i + 1;
                expect(opres).toBeTruthy();
            }
            const gotPlayers = await pc.getPlayers();
            expect(players).toEqual(gotPlayers);
        })
        it("Delete player", async () => {
            const delRes = await pc.delPlayer(players[2].id);
            expect(delRes).toBeTruthy();
            const gotPlayers = await pc.getPlayers();
            expect(players.slice(0, 2)).toEqual(gotPlayers);
        })
    });
});
