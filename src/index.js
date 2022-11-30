import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import koinxRoute from "./route/koinx.route.js";
import path from "path";
import etherloop from "./controller/ethereum.controller.js";

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
    res.status(404).send('<h1>404! Page not found</h1>');
});

etherloop;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})