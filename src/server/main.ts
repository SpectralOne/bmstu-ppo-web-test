import express from "express";
import body_parser from "body-parser";

import {logger, setHeaders, sendOld} from "./controllers/CommonControllers";
import apiRouter from "./routers/apiRouter";

const port = process.env.PORT || 3000;

const app = express();

app.use(logger);

// response headers
app.use(setHeaders);

app.use(body_parser.text());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

app.use("/api/v1", apiRouter)

app.use("/old", sendOld);

app.listen(port);
console.log(`Running on port ${port}`);
