import db from "../config/koinx.mongo.js";
import QUERY from "../query/koinx.query.js";
import dotenv from "dotenv";

dotenv.config();

const apikey = process.env.API_TOKEN;

export const getAllKoinx = async (req, res) => {

}

export const getAllTransByAdd = async (req, res) => {
    let url = "https://api.etherscan.io/api?module=account"
    const response = await fetch(`${url}&action=txlist&address=${req.params.id}&startblock=0&endblock=99999999&sort=asc&apikey=${apikey}`);
    const data = await response.json();

    if ( db.readyState === 1 ) {
        await db.dropCollection('cryptoAddressData');
        await db.collection('cryptoAddressData').insertMany(data.result);
        res.send(data);
    } else {
        res.status(500).send({ message: "Error connecting to database" });
    }
}