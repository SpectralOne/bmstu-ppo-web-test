import path from "path";

import { authController } from "../init";
import { safetyWrapper } from "../common";
import { NextFunction, Response, Request } from "express";
import { PermissionError } from "../../logic/error";

export const default_controller = (_req: Request, res: Response) => res.sendFile("PATH_TO_MAIN_PAGE");

export const setHeaders = (_req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Methods, Credentials');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Server", "dota teams (1.0.0)");
    next();
}

export const logger = (req: Request, _res: Response, next: NextFunction) => {
    console.log(req.url, req.method);
    console.log(`body:\n${JSON.stringify(req.body, null, 4)}`);
    console.log(`query params:\n${JSON.stringify(req.query, null, 4)}`);
    console.log(`headers:\n${JSON.stringify(req.headers)}`);
    next();
}

export interface UserRequest extends Request {
    user: string
}

export const auth = (): ((req: UserRequest, res: Response, next: NextFunction) => void) => {
    console.log("auth layer reached");
    return (req: UserRequest, res: Response, next: NextFunction) => {
        safetyWrapper(res, async () => {
            try {
                const token = await authController.extractToken(req);
                await authController.verify(token);
                const user = await authController.extractInfoFromToken(token);
                if (!user)
                    throw new PermissionError("Can't get user from token");
                req.user = user;
                next();
            } catch (e) {
                await authController.resetHeader(res);
                throw e;
            }
        });
    }
}

export const sendOld = (req: Request, res: Response, _next: NextFunction) => {
    res.sendFile(path.resolve() + "/src/web/static/old.html");
}
