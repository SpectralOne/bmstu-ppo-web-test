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
        return await this.controller.delTeam(+rawRequest);

      case TeamsState.WAIT_TEAM_ADD:
        this.printer.processing();
        return await this.controller.addTeam(this.inner.buildTeam());

      case TeamsState.WAIT_TEAM_NAME:
        return this.processTeamName(rawRequest);

      case TeamsState.WAIT_TEAM_DESC:
        return this.processTeamDesc(rawRequest);

      default:
        break;
    }

  }
  
  delTeam(requesterId: number) {
    this.inner.requesterId = requesterId;
    this.printer.inviteTeamId();
    this.state = TeamsState.WAIT_TEAM_DEL;

    return null;
  }

  addTeam(requesterId: number) {
    this.inner.requesterId = requesterId;
    this.state = TeamsState.WAIT_TEAM_NAME;
    this.printer.inviteTeamName();

    return null;
  }

  processTeamName(rawRequest: string) {
    if (this.state !== TeamsState.WAIT_TEAM_NAME) {
      throw new AppError("Wrong state in players manager transition!");
    }

    this.inner.teamName = rawRequest;
    this.state = TeamsState.WAIT_TEAM_DESC;
    this.printer.inviteTeamDesc();

    return null;
  }

  processTeamDesc(rawRequest: string) {
    if (this.state !== TeamsState.WAIT_TEAM_DESC) {
      throw new AppError("Wrong state in players manager transition!");
    }

    this.inner.teamDesc = rawRequest;
    this.state = TeamsState.WAIT_TEAM_ADD;

    return null;
  }
}
