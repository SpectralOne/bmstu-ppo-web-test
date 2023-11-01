import jwt from "jsonwebtoken";

import { Request, Response } from "express";
import { PermissionError, NotFoundError } from "../logic/error";
import { IUsersRepo } from "../db/IUsersRepo";
import { User } from "../model/User";

const SECRET = "MY_SECRET";

export class AuthController {
  usersRepo: IUsersRepo;
  constructor(UsersRepo: IUsersRepo) {
    this.usersRepo = UsersRepo;
  }

  // encode password
  async login(login: string, password: string) {
    const dbUser = await this.usersRepo.getUserByLogin(login);
    if (!dbUser)
      throw new NotFoundError("User not found in database");
    if (dbUser.password !== password)
      throw new PermissionError("Wrong password");
    return this.generateToken(dbUser);
  }

  generateToken(user: User) {
    user.password = '';
    return 'Bearer ' + jwt.sign({
      data: JSON.stringify(user)
    }, SECRET, { expiresIn: '1h' });
  }

  verify(token: string) {
    try {
      jwt.verify(token, SECRET);
    } catch (e) {
      throw new PermissionError("Failed to verify token");
    }
  }

  extractToken(req: Request) {
    console.log(req.headers.authorization?.split(' ')[0]);
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
      return req.headers.authorization.split(' ')[1];
    else if (req.cookies && req.cookies.jwtToken)
      return req.cookies.jwtToken;
    else if (req.params && req.params.token)
      return req.params.token;
    throw new PermissionError("Credentials weren't provided");
  }

  extractInfoFromToken(token: string) {
    const decoded: any = jwt.decode(token);
    return JSON.parse(decoded.data);
  }

  // ?
  resetHeader(res: Response) {
    res.clearCookie("jwtToken");
  }

  async logout(token?: any) {
  }
}
