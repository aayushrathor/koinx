import express from "express";
import { getAllKoinx, getAllTransByAdd } from "../controller/koinx.controller.js";

const koinxRoute = express.Router();

koinxRoute.route('/')
    .get(getAllKoinx)

koinxRoute.route('/transaction/:id')
    .get(getAllTransByAdd)

export default koinxRoute;