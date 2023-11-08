import { ConnParams } from "../types/ConnParams";
import { PlayersController } from "../logic/PlayersController";
import { MySQLPlayersRepo } from "../db/MySQLPlayersRepo";
import { PlayersRepo } from "../db/PlayersRepo";
import { MySQLTeamsRepo } from "../db/MySQLTeamsRepo";
import { TeamsRepo } from "../db/TeamsRepo";
import { TeamsController } from "../logic/TeamsController";
import { MySQLUsersRepo } from "../db/MySQLUsersRepo";
import { UsersRepo } from "../db/UsersRepo";
import { AuthController } from "../logic/AuthController";
import { UsersController } from "../logic/UsersController";
import { dbContextEnum } from "../types/Context";

// import dotenv from "dotenv";
// dotenv.config();


const connParams: ConnParams = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASS,
  port: parseInt(process.env.PG_PORT as string),
};
console.log(connParams);
const connMysql: ConnParams = {
  user: process.env.MYSQL_USER,
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DB,
  password: process.env.MYSQL_PASS,
  port: parseInt(process.env.MYSQL_PORT as string),
};

const dbContext: dbContextEnum = parseInt(process.env.DBCONTEXT as string) || dbContextEnum.POSTGRES;

const playersRepo = dbContext === dbContextEnum.POSTGRES ? new PlayersRepo(connParams) : new MySQLPlayersRepo(connMysql);
export const playersController = new PlayersController(playersRepo);

const teamsRepo = dbContext === dbContextEnum.POSTGRES ? new TeamsRepo(connParams) : new MySQLTeamsRepo(connMysql);
export const teamsController = new TeamsController(teamsRepo);

const usersRepo = dbContext === dbContextEnum.POSTGRES ? new UsersRepo(connParams) : new MySQLUsersRepo(connMysql);
export const userController = new UsersController(usersRepo);
export const authController = new AuthController(usersRepo);
