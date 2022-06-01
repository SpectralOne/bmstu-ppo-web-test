import { ConnParams } from "../types/ConnParams";
import { PlayersController } from "../logic/PlayersController";
import { PlayersRepo } from "../db/PlayersRepo";
import { TeamsRepo } from "../db/TeamsRepo";
import { TeamsController } from "../logic/TeamsController";
import { UsersRepo } from "../db/UsersRepo";
import { AuthController } from "../logic/AuthController";
import { UsersController } from "../logic/UsersController";

const connParams: ConnParams = {
  user: "admin",
  host: "localhost",
  database: "app_db",
  password: "admin",
  port: 5432,
};

const playersRepo = new PlayersRepo(connParams);
export const playersController = new PlayersController(playersRepo);

const teamsRepo = new TeamsRepo(connParams);
export const teamsController = new TeamsController(teamsRepo);

const usersRepo = new UsersRepo(connParams);
export const userController = new UsersController(usersRepo);
export const authController = new AuthController(usersRepo);
