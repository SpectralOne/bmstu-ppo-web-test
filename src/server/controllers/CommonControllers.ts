import path from "path";

import { authController } from "../init";
import { safetyWrapper } from "../common";
import { NextFunction, Response, Request } from "express";
import { PermissionError } from "../../logic/error";

export const default_controller = (_req: Request, res: Response) => res.sendFile("PATH_TO_MAIN_PAGE");

export const setHeaders = (_req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS, PATCH');
  res.header("Access-Control-Max-Age", "3600");
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept, Methods, Credentials');
  // res.header("Server", "dota teams (1.0.0)");
  next();
}

export const logger = (req: Request, _res: Response, next: NextFunction) => {
  console.log(req.url, req.method);
  console.log(`body:\n ${req.body}`);
  console.log(`query params:\n${JSON.stringify(req.query, null, 4)}`);
  console.log(`headers:\n${JSON.stringify(req.headers)}`);
  next();
}

export interface UserRequest extends Request {
  user: string
}

export const auth = (req: any, res: Response, next: NextFunction) => {
  const token = authController.extractToken(req);
  console.log(token);
  authController.verify(token);
  const user = authController.extractInfoFromToken(token);
  if (!user)
    throw new PermissionError("Can't get user from token");
  req.user = user;
  next();
}

export const sendOld = (req: Request, res: Response, _next: NextFunction) => {
  res.send("<p>old</p>");
}
