export class User {
  id: number;
  login: string;
  password: string;
  // password?: string;
  privelegelevel: number;

  constructor(id: number, login: string, password: string, privelegelevel: number) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.privelegelevel = privelegelevel;
  }
}
