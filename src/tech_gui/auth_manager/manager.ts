import { AuthController } from "../../logic/AuthController";
import { AuthPrinter } from "./printer";
import { AuthState } from "./state";
import { AppError } from "../app/error";

class InnerState {
  login: string;
  password: string;

  constructor() {
    this.login = "";
    this.password = "";
  }
}

export class AuthManager {
  controller: AuthController;
  state: AuthState;
  printer: AuthPrinter;
  inner: InnerState;

  constructor(authController: AuthController) {
    this.state = AuthState.NOOP;
    this.printer = new AuthPrinter();
    this.inner = new InnerState();
    this.controller = authController;
  }

  async processRequest(rawRequest: string) {
    switch (this.state) {
      case AuthState.WAIT_PASSWORD:
        return this.processLogin(rawRequest);

      case AuthState.WAIT_LOGIN:
        return this.controller.login(this.inner.login, rawRequest);

      default:
        break;
    }
  }

  processLogin(rawRequest: string) {
    if (this.state !== AuthState.WAIT_PASSWORD) {
      throw new AppError("Failed to change state in auth manager!");
    }

    this.inner.login = rawRequest;
    this.printer.invitePassword();
    this.state = AuthState.WAIT_LOGIN;
    return null;
  }

  signin() {
    this.printer.inviteLogin();
    this.state = AuthState.WAIT_PASSWORD;

    return null;
  }
}
