import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import koinxRoute from "./route/koinx.route.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
    console.log("Connected to MongoDB");
})

const PORT = process.env.PORT || 8000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', koinxRoute);
app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to Koinx API'
    });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})