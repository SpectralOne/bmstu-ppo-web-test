import express from "express";
import bodyParser from "body-parser";

import { logger, setHeaders, sendOld } from "./controllers/CommonControllers";
import apiRouter from "./routers/apiRouter";

const port = process.env.SPORT || 3000;

const app = express();

app.use(logger);

// response headers
app.use(setHeaders);

app.use(bodyParser.text());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", apiRouter)

app.use("/old", sendOld);

app.listen(port);
console.log(`Running on port ${port}`);
