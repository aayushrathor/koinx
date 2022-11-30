import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../utils/koinx.logger.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", function () {
    logger.error("MongoDB: Error connecting to database");
});
db.once("open", function () {
    logger.info("MongoDB: Connected to database");
})

export default db;