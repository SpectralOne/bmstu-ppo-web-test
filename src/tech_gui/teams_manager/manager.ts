import { TeamsController } from "../../logic/TeamsController";
import { Team } from "../../model/Team";
import { AppError } from "../app/error";
import { TeamsPrinter } from "./printer";
import { TeamsState } from "./state";

class InnerState {
  teamId: number;
  teamName: string;
  teamDesc: string;
  requesterId: number;

  constructor() {
    this.teamId = -1;
    this.teamName = "";
    this.teamDesc = "";
    this.requesterId = -1;
  }

  buildTeam(): Team {
    return new Team(0, this.requesterId, this.teamDesc, this.teamName, []);
  }
}

export class TeamsManager {
  controller: TeamsController;
  state: TeamsState;
  printer: TeamsPrinter;
  inner: InnerState;

  constructor(teamsController: TeamsController) {
    this.controller = teamsController;
    this.state = TeamsState.NOOP;
    this.printer = new TeamsPrinter();
    this.inner = new InnerState();
  }

  async listTeams(): Promise<void> {
    const teams = await this.controller.getTeams();
    if (teams) {
      teams.forEach(t => this.printer.printTeam(t));
    } else {
      throw new AppError("No teams in db");
    }
  }

  async processRequest(rawRequest: string) {
    switch (this.state) {
      case TeamsState.WAIT_TEAM_DEL:
        this.printer.processing();
        await this.controller.delTeam(+rawRequest);
        
        return true;

      case TeamsState.GET_PLAYER_HISTORY:
        const history = await this.controller.getPlayerHistory(+rawRequest);
        if (history) {
          history.forEach(h => this.printer.printHistory(h));

        }
        return true;

      case TeamsState.WAIT_TEAM_ADD:
        this.printer.processing();
        await this.controller.addTeam(this.inner.buildTeam());
        return true;

      case TeamsState.WAIT_TEAM_NAME:
        return await this.processTeamName(rawRequest);

      case TeamsState.WAIT_TEAM_DESC:
        return await this.processTeamDesc(rawRequest);

      case TeamsState.GET_PLAYER_TEAMS:
        const teams = await this.controller.getPlayerTeams(+rawRequest);
        if (teams) {
          teams.forEach(t => this.printer.printTeam(t));
        }
        return true;

      default:
        return null;
    }
  }

  async getPlayerHistory(requesterId: number) {
    this.inner.requesterId = requesterId;
    this.printer.invitePlayerId();
    this.state = TeamsState.GET_PLAYER_HISTORY;

    return true;
  }

  async delTeam(requesterId: number) {
    this.inner.requesterId = requesterId;
    this.printer.inviteTeamId();
    this.state = TeamsState.WAIT_TEAM_DEL;

    return true;
  }

  async addTeam(requesterId: number) {
    this.inner.requesterId = requesterId;
    this.state = TeamsState.WAIT_TEAM_NAME;
    this.printer.inviteTeamName();

    return null;
  }

  async processTeamName(rawRequest: string) {
    if (this.state !== TeamsState.WAIT_TEAM_NAME) {
      throw new AppError("Wrong state in players manager transition!");
    }

    this.inner.teamName = rawRequest;
    this.state = TeamsState.WAIT_TEAM_DESC;
    this.printer.inviteTeamDesc();

    return null;
  }

  async processTeamDesc(rawRequest: string) {
    if (this.state !== TeamsState.WAIT_TEAM_DESC) {
      throw new AppError("Wrong state in players manager transition!");
    }

    this.inner.teamDesc = rawRequest;
    this.state = TeamsState.WAIT_TEAM_ADD;

    return true;
  }

  async listPlayerTeams(requesterId: number) {
    this.inner.requesterId = requesterId;
    this.printer.invitePlayerId();
    this.state = TeamsState.GET_PLAYER_TEAMS;

    return true
  }

}
