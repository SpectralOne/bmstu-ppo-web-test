import jwt from "jsonwebtoken";

import { AppState } from "./state";
import { AppPrinter } from "./printer";
import { RequestOps, parseRequest } from "./request";
import { PlayersManager } from "../players_manager/manager";
import { PlayersController } from "../../logic/PlayersController";
import { TeamsManager } from "../teams_manager/manager";
import { TeamsController } from "../../logic/TeamsController";
import { AuthManager } from "../auth_manager/manager";
import { AuthController } from "../../logic/AuthController";

export class App {
  state: AppState;
  printer: AppPrinter;
  playersManager: PlayersManager;
  teamsManager: TeamsManager;
  authManager: AuthManager;

  constructor(playersController: PlayersController, teamsController: TeamsController, authController: AuthController) {
    this.state = new AppState();
    this.printer = new AppPrinter();
    this.playersManager = new PlayersManager(playersController);
    this.teamsManager = new TeamsManager(teamsController);
    this.authManager = new AuthManager(authController);
  }

  async processAuth(request: string) {
    try {
      const res = await this.authManager.processRequest(request);
      if (res) {
        const decoded: any = jwt.decode(res);
        const parsed: any = JSON.parse(decoded.data);
        this.state.toAuthorizedId(parsed.id);
        this.printer.authentification(true, true);
      }
    } catch (err: any) {
      this.state.toUnauthorized();
      this.printer.authentification(true, false);
      this.printer.printError(err.exInfo());
    }
  }

  async processTeamsManagement(request: any) {
    try {
      const res = await this.teamsManager.processRequest(request);
      if (res) {
        this.state.toAuthorized();
        this.printer.teamsManager(true);
      }
    } catch (err: any) {
      this.state.toAuthorized()
      this.printer.teamsManager(false);
      console.log(err);
      this.printer.printError(err.exInfo());
    }
  }

  async processPlayersManagement(request: string) {
    try {
      const res = await this.playersManager.processRequest(request);
      if (res) {
        this.state.toAuthorized();
        this.printer.playersManager(true);
      }
    } catch (err: any) {
      this.state.toAuthorized()
      this.printer.playersManager(false);
      this.printer.printError(err.exInfo());
    }
  }

  async processRequest(rawRequest: string) {
    if (this.state.isAuthentification()) {
      await this.processAuth(rawRequest);
    } else if (this.state.isTeamsManagement()) {
      await this.processTeamsManagement(rawRequest);
    } else if (this.state.isPlayersManagement()) {
      await this.processPlayersManagement(rawRequest);
    } else {
      await this.processSelf(rawRequest);
    }
  }

  printInvite() {
    if (this.state.isAuthorized() || this.state.isUnauthorized())
      this.printer.printMenu();
  }

  parseRequest(rawRequest: any) {
    return parseRequest(rawRequest);
  }

  async processSelf(rawRequest: any) {
    const request = this.parseRequest(rawRequest);
    if (request === null) {
      this.printer.printError("Can't parse request");
    } else {
      await this.processParsedRequest(request);
    }
  }

  async processParsedRequest(request: RequestOps) {
    const requester = this.state.getId();

    switch (request) {
      case RequestOps.EXIT_ALL:
        process.exit(0);

      case RequestOps.EXIT:
        this.exitAccount();
        break;

      case RequestOps.SIGNIN:
        if (this.state.toAuthentification())
          this.authManager.signin();
        else {
          this.printer.printError("Can't start signup (already authorized)");
        }
        break;

      case RequestOps.LIST_PLAYERS:
        await this.playersManager.listPlayers();
        break;

      case RequestOps.ADD_PLAYER:
        if (!this.state.isAuthorized()) {
          this.printer.printError("Sign in to perform this operation");
        } else {
          this.playersManager.addPlayer(requester);
          this.state.toPlayersManagement();
        }
        break;

      case RequestOps.REMOVE_PLAYER:
        if (!this.state.isAuthorized()) {
          this.printer.printError("Sign in to perform this operation");
        } else {
          this.playersManager.delPlayer(requester);
          this.state.toPlayersManagement();
        }
        break;

      case RequestOps.ADD_TEAM:
        if (!this.state.isAuthorized()) {
          this.printer.printError("Sign in to perform this operation");
        } else {
          await this.teamsManager.addTeam(requester);
          this.state.toTeamsManagement();
        }
        break;

      case RequestOps.REMOVE_TEAM:
        if (!this.state.isAuthorized()) {
          this.printer.printError("Sign in to perform this operation");
        } else {
          await this.teamsManager.delTeam(requester);
          this.state.toTeamsManagement();
        }
        break;

      case RequestOps.ADD_TO_TEAM:
        if (!this.state.isAuthorized()) {
          this.printer.printError("Sign in to perform this operation");
        } else {
          await this.playersManager.addToTeam(requester);
          this.state.toTeamsManagement();
        }
        break;

      case RequestOps.REMOVE_FROM_TEAM:
        if (!this.state.isAuthorized()) {
          this.printer.printError("Sign in to perform this operation");
        } else {
          await this.playersManager.delFromTeam(requester);
          this.state.toTeamsManagement();
        }
        break;

      case RequestOps.LIST_TEAMS:
        if (!this.state.isAuthorized()) {
          this.printer.printError("Sign in to perform this operation");
        } else {
          await this.teamsManager.listTeams();
        }
        break;

      default:
        this.printer.printError("Unknown query");
        break;
    }
  }

  exitAccount() {
    return this.state.toUnauthorized();
  }
}
