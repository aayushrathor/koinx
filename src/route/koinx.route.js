import express from "express";
import { fetchBalance, getAllTransByAdd } from "../controller/koinx.controller.js";

const koinxRoute = express.Router();

koinxRoute.route('/fetch/:id')
    .get(fetchBalance);

koinxRoute.route('/transaction/:id')
    .get(getAllTransByAdd);

export default koinxRoute;