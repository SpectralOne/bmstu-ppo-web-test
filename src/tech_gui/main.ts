
import { ConnParams } from "../types/ConnParams";
import { App } from "./app/app";
import { PlayersController } from "../logic/PlayersController";
import { PlayersRepo } from "../db/PlayersRepo";
import { TeamsRepo } from "../db/TeamsRepo";
import { TeamsController } from "../logic/TeamsController";
import { UsersRepo } from "../db/UsersRepo";
import { AuthController } from "../logic/AuthController";

import { question } from "readline-sync";

const connParams: ConnParams = {
  user: "admin",
  host: "localhost",
  database: "app_db",
  password: "admin",
  port: 5432,
};

const main = async () => {
  const playersRepo = new PlayersRepo(connParams);
  const playersController = new PlayersController(playersRepo);

  const teamsRepo = new TeamsRepo(connParams);
  const teamsController = new TeamsController(teamsRepo);

  const usersRepo = new UsersRepo(connParams);
  const authController = new AuthController(usersRepo);

  const app = new App(playersController, teamsController, authController);
  for (; ;) {
    app.printInvite();
    const request = question("> ");
    await app.processRequest(request);
  }
}

main()
