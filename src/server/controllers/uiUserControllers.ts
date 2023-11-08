import { Request, Response, NextFunction } from "express";
import { authController, userController } from "../init";
import { NotFoundError, InvalidArgumentError, dbError } from "../../logic/error";
import { DTOUserLoginInfo, DTOUser, DTOUserWithPass } from "../models";
import { safetyWrapper } from "../common";

export const login = (req: Request, res: Response, _next: NextFunction) => {
  safetyWrapper(res, async () => {
    const { login, password } = new DTOUserLoginInfo(req.body);
    const token = await authController.login(login, password);
    res.status(200).json(token);
  });
};

export const logout = (_req: Request, res: Response, _next: NextFunction) => {
  safetyWrapper(res, async () => {
    // await authController.logout();
    authController.resetHeader(res);
    res.status(200).send("ok");
  });
};

export const getByUsername = (req: Request, res: Response, _next: NextFunction) => {
  safetyWrapper(res, async () => {
    if (!req.query.login)
      throw new InvalidArgumentError("username not found");
    const login: string | any = req.query.login;
    const user = await userController.getUserByLogin(login);
    if (!user)
      throw new NotFoundError("user not found by username");
    res.status(200).json(new DTOUser(user));
  });
};

// const updateUser = (req: Request, res: Response, _next: NextFunction) => {
//     safetyWrapper(res, async () => {
//         const user = (new DTOUserWithPass(req.body)).toUser();
//         await userController.updateUser(user);
//         res.status(200).send("ok");
//     });
// };

// const updateUserPassword = (req: Request, res: Response, _next: NextFunction) => {
//     safetyWrapper(res, async () => {
//         const userId = req.user.id;
//         const password = req.body;
//         if (!password)
//             throw new InvalidArgumentError("Can't parse password");
//         await userController.updateUserPassword(userId, password);
//         res.status(200).send("ok");
//     });
// };

export const createUser = (req: Request, res: Response, _next: NextFunction) => {
  safetyWrapper(res, async () => {
    const user = (new DTOUserWithPass(req.body)).toUser();
    const status = await userController.addUser(user);
    if (!status)
      throw new dbError("Add failed");

    const newUser = await userController.getUserByLogin(user.login);
    if (!newUser)
      throw new NotFoundError("Unnable to fetch newly added user");

    user.id = newUser!.id;
    const token = authController.generateToken(user);
    res.status(200).json(token);
  });
};
