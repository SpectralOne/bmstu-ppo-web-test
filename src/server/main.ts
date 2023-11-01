import express from "express";
import bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from "path";
import marked from 'marked';
import fs from 'fs';

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


// const expressSwaggerGenerator = require("express-swagger-generator");
// const expressSwagger = expressSwaggerGenerator(app);
// expressSwagger({
//   route: {
//     url: '/api/swagger',
//     docs: '/api/v1/swagger.json'
//   },
//   swaggerDefinition: {
//     info: {
//       description: 'Teams constructor application',
//       title: 'Swagger',
//       version: '1.0.0',
//     },
//     host: 'localhost',
//     basePath: '/api/v1',
//     produces: [
//       "application/json",
//     ],
//     schemes: ['https', 'http'],
//     securityDefinitions: {
//       JWT: {
//         type: 'apiKey',
//         in: 'header',
//         name: 'Authorization',
//         description: "",
//       }
//     }
//   },
//   basedir: path.resolve('.'), //app absolute path
//   files: ['./dist/backend/server/routers/*.js'] //Path to the API handle folder
// });

const swaggerDocument = YAML.load(path.resolve('.') + '/main_swagger.yaml');

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/v1", apiRouter)

app.use("/old", sendOld);

app.use("/schemes", express.static(path.resolve('.') + '/schemes'));

// const renderer = new marked.Renderer();
// renderer.image = function(href, title, text) {
  // const imagePath = path.join(path.resolve('.'), 'schemes', href);
  // return `<img src="${imagePath}" src="${imagePath}" alt="${text}" title="${title}" />`; // for local references
// };

app.get('/readme', function(_req, res) {
  const file = fs.readFileSync(path.resolve('.') + '/README.md', 'utf8');
  res.send(marked.parse(file.toString()));
});

app.listen(port);
console.log(`Running on port ${port}`);
