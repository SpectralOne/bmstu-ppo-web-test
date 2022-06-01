import { PlayersController } from "../../logic/PlayersController";
import { Player } from "../../model/Player";
import { AppError } from "../app/error";
import { PlayersPrinter } from "./printer";
import { PlayersState } from "./state";

class InnerState {
  fname: string;
  lname: string;
  cntry: string;
  dob: string;

  teamid: number;
  playerid: number;

  requesterId: number;

  constructor() {
    this.fname = "";
    this.lname = "";
    this.cntry = "";
    this.dob = "";

    this.teamid = -1;
    this.playerid = -1;

    this.requesterId = 0;
  }

  buildPlayer() {
    return new Player(0, this.requesterId, this.fname, this.lname, this.cntry, new Date(this.dob), []);
  }
}

export class PlayersManager {
  controller: PlayersController;
  state: PlayersState;
  printer: PlayersPrinter;
  inner: InnerState;

  constructor(playersController: PlayersController) {
    this.controller = playersController;
    this.state = PlayersState.NOOP;
    this.printer = new PlayersPrinter();
    this.inner = new InnerState();
  }

  async listPlayers(): Promise<void> {
    const players = await this.controller.getPlayers();
    if (players) {
      players.forEach(p => this.printer.printPlayer(p));
    } else {
      throw new AppError("No players in db");
    }
  }

  async processRequest(rawRequest: string) {
    switch (this.state) {
      case PlayersState.WAIT_DEL:
        this.printer.processing();
        await this.controller.delPlayer(+rawRequest);

        return true;

      case PlayersState.WAIT_FNAME:
        return await this.processFname(rawRequest);

      case PlayersState.WAIT_LNAME:
        return await this.processLname(rawRequest);

      case PlayersState.WAIT_CNTRY:
        return await this.processCntry(rawRequest);

      case PlayersState.WAIT_DOB:
        return await this.processDob(rawRequest);

      case PlayersState.WAIT_ADD:
        this.printer.processing();
        await this.controller.addPlayer(this.inner.buildPlayer());

        return true;

      case PlayersState.WAIT_PLAYER_TO_ADD:
        return await this.processAddToTeam(rawRequest);

      case PlayersState.WAIT_PLAYER_TO_DEL:
        return await this.processDelFromTeam(rawRequest);

      case PlayersState.WAIT_ADD_TO_TEAM:
        this.printer.processing();
        await this.controller.addPlayerTeam(+rawRequest, this.inner.teamid);

        return true;

      case PlayersState.WAIT_DEL_FROM_TEAM:
        this.printer.processing();
        await this.controller.delPlayerTeam(+rawRequest, this.inner.teamid);

        return true;

      default:
        return null;
    }
  }

  delPlayer(requesterId: number) {
    this.inner.requesterId = requesterId;
    this.printer.inviteDelId();
    this.state = PlayersState.WAIT_DEL;

    return null;
  }

  async addPlayer(requesterId: number) {
    this.inner.requesterId = requesterId;
    this.state = PlayersState.WAIT_FNAME;
    this.printer.inviteFname();

    return null;
  }

  async processFname(rawRequest: string) {
    if (this.state !== PlayersState.WAIT_FNAME) {
      throw new AppError("Wrong state in players manager transition!");
    }

    this.inner.fname = rawRequest;
    this.state = PlayersState.WAIT_LNAME;
    this.printer.inviteLname();

    return null;
  }

  async processLname(rawRequest: string) {
    if (this.state !== PlayersState.WAIT_LNAME) {
      throw new AppError("Wrong state in players manager transition!");
    }

    this.inner.lname = rawRequest;
    this.state = PlayersState.WAIT_CNTRY;
    this.printer.inviteCntry();

    return null;
  }

  async processCntry(rawRequest: string) {
    if (this.state !== PlayersState.WAIT_CNTRY) {
      throw new AppError("Wrong state in players manager transition!");
    }

    this.inner.cntry = rawRequest;
    this.state = PlayersState.WAIT_DOB;
    this.printer.inviteDob();

    return null;
  }

  async processDob(rawRequest: string) {
    if (this.state !== PlayersState.WAIT_DOB) {
      throw new AppError("Wrong state in players manager transition!");
    }

    this.inner.dob = rawRequest;
    this.state = PlayersState.WAIT_ADD;

    return true;
  }

  async addToTeam(requesterId: number) {
    this.inner.requesterId = requesterId;
    this.state = PlayersState.WAIT_PLAYER_TO_ADD;
    this.printer.inviteTeamId();

    return null;
  }

  async delFromTeam(requesterId: number) {
    this.inner.requesterId = requesterId;
    this.state = PlayersState.WAIT_PLAYER_TO_DEL;
    this.printer.inviteTeamId();

    return null;
  }

  async processAddToTeam(rawRequest: string) {
    if (this.state !== PlayersState.WAIT_PLAYER_TO_ADD) {
      throw new AppError("Wrong state in players manager transition!");
    }

    this.inner.teamid = +rawRequest;
    this.state = PlayersState.WAIT_ADD_TO_TEAM;
    this.printer.invitePlayerId();

    return null;
  }

  async processDelFromTeam(rawRequest: string) {
    if (this.state !== PlayersState.WAIT_PLAYER_TO_DEL) {
      throw new AppError("Wrong state in players manager transition!");
    }

    this.inner.teamid = +rawRequest;
    this.state = PlayersState.WAIT_DEL_FROM_TEAM;
    this.printer.invitePlayerId();

    return null;
  }
}
