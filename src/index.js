import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import koinxRoute from "./route/koinx.route.js";
import path from "path";
import etherloop from "./controller/ethereum.controller.js";
import logger from "./utils/koinx.logger.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', koinxRoute);
app.get('/', (req, res) => {
    res.sendFile(path.resolve() + '/client/index.html');
});
app.all('*', (req, res) => {
    res.status(404).send('<h1><center>404! Page not found</center></h1>');
});

etherloop;

app.listen(PORT, () => {
    logger.info(`ServerInfo: Server started and running on http://localhost:${PORT}`);
})