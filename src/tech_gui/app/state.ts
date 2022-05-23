enum InnerState {
  UNAUTHORIZED,
  AUTHENTICATION,
  AUTHORIZED,
  TEAMS_MANAGEMENT,
  PLAYERS_MANAGEMENT
}

export class AppState {
  inner: InnerState;
  id: number;

  constructor() {
    this.inner = InnerState.UNAUTHORIZED;
    this.id = -1;
  }

  toTeamsManagement(): InnerState | null {
    if (this.inner === InnerState.AUTHORIZED) {
      this.inner = InnerState.TEAMS_MANAGEMENT;
      return this.inner;
    }
    return null;
  }

  toPlayersManagement(): InnerState | null {
    if (this.inner === InnerState.AUTHORIZED) {
      this.inner = InnerState.PLAYERS_MANAGEMENT;
      return this.inner;
    }
    return null;
  }

  toAuthentification(): InnerState | null {
    if (this.inner === InnerState.UNAUTHORIZED) {
      this.inner = InnerState.AUTHENTICATION;
      return this.inner;
    }
    return null;
  }

  toAuthorized(): InnerState | null {
    if (this.inner !== InnerState.UNAUTHORIZED) {
      this.inner = InnerState.AUTHORIZED;
      return this.inner;
    }
    return null;
  }

  toAuthorizedId(id: number): InnerState | null {
    if (this.inner !== InnerState.UNAUTHORIZED) {
      this.inner = InnerState.AUTHORIZED;
      this.id = id;
      return this.inner;
    }
    return null;
  }

  toUnauthorized(): InnerState | null {
    if (this.inner === InnerState.UNAUTHORIZED ||
      this.inner === InnerState.AUTHORIZED ||
      this.inner === InnerState.AUTHENTICATION) {
      this.inner = InnerState.UNAUTHORIZED;
      return this.inner;
    }
    return null;
  }

  isAuthorized(): boolean {
    return this.inner === InnerState.AUTHORIZED;
  }

  isUnauthorized(): boolean {
    return this.inner === InnerState.UNAUTHORIZED;
  }

  isAuthentification(): boolean {
    return this.inner === InnerState.AUTHENTICATION;
  }

  isTeamsManagement(): boolean {
    return this.inner === InnerState.TEAMS_MANAGEMENT;
  }

  isPlayersManagement(): boolean {
    return this.inner === InnerState.PLAYERS_MANAGEMENT;
  }

  getId(): number {
    return this.id;
  }
}
