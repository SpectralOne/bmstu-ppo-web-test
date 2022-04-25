export class User {
  id: number;
  login: string;
  password: string;
  privelegeLevel: number;

  constructor(id: number, login: string, password: string, privelegeLevel: number) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.privelegeLevel = privelegeLevel;
  }
}
