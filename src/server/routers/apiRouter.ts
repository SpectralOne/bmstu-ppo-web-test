import express, { Router } from "express";

import playerRouter from "./playerRouter";
import teamRouter from "./teamRouter";
import userRouter from "./userRouter";

const apiRouter: Router = express.Router();

apiRouter.use("/", playerRouter);
apiRouter.use("/", teamRouter);
apiRouter.use("/user", userRouter);

export default apiRouter;
