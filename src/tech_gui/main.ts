
import { ConnParams } from "../types/ConnParams";
import { App } from "./app/app";
import { PlayersController } from "../logic/PlayersController";
import { PlayersRepo } from "../db/PlayersRepo";
import { TeamsRepo } from "../db/TeamsRepo";
import { TeamsController } from "../logic/TeamsController";
import { UsersRepo } from "../db/UsersRepo";
import { AuthController } from "../logic/AuthController";

import { MySQLPlayersRepo } from "../db/MySQLPlayersRepo";
import { MySQLTeamsRepo } from "../db/MySQLTeamsRepo";
import { MySQLUsersRepo } from "../db/MySQLUsersRepo";
import { dbContextEnum } from "../types/Context";
import { question } from "readline-sync";

import dotenv from "dotenv";
dotenv.config();

const connParams: ConnParams = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASS,
  port: parseInt(process.env.PG_PORT as string),
};

const connMysql: ConnParams = {
  user: process.env.MYSQL_USER,
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DB,
  password: process.env.MYSQL_PASS,
  port: parseInt(process.env.MYSQL_PORT as string),
};

console.log(process.env.DBCONTEXT)

const main = async () => {
  const dbContext: dbContextEnum = parseInt(process.env.DBCONTEXT as string) || dbContextEnum.POSTGRES;

  const playersRepo = dbContext === dbContextEnum.POSTGRES ? new PlayersRepo(connParams) : new MySQLPlayersRepo(connMysql);
  const playersController = new PlayersController(playersRepo);

  const teamsRepo = dbContext === dbContextEnum.POSTGRES ? new TeamsRepo(connParams) : new MySQLTeamsRepo(connMysql);
  const teamsController = new TeamsController(teamsRepo);

  const usersRepo = dbContext === dbContextEnum.POSTGRES ? new UsersRepo(connParams) : new MySQLUsersRepo(connMysql);
  const authController = new AuthController(usersRepo);


  const app = new App(playersController, teamsController, authController);
  for (; ;) {
    app.printInvite();
    const request = await question("> ");
    await app.processRequest(request);
  }
}

main()
