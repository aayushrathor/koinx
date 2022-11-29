import express from "express";
import { getAllKoinx, getKoinxById } from "../controller/koinx.controller.js";

const koinxRoute = express.Router();

koinxRoute.route('/')
    .get(getAllKoinx)

koinxRoute.route('/:id')
    .get(getKoinxById)

export default koinxRoute;