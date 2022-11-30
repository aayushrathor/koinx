import dotenv from "dotenv";
import db from "../config/koinx.mongo.js";

dotenv.config();

const apikey = process.env.API_TOKEN;

export const getAllKoinx = async (req, res) => {

}

export const getAllTransByAdd = async (req, res) => {
    let url = "https://api.etherscan.io/api?module=account"
    const response = await fetch(`${url}&action=txlist&address=${req.params.id}&startblock=0&endblock=99999999&sort=asc&apikey=${apikey}`);
    const data = await response.json();

    if (db.readyState === 1) {
        if (db.collection('cryptoAddressData').name === 'cryptoAddressData' && await db.collection('cryptoAddressData').countDocuments({ address: req.params.id }) === 1) {
            await db.collection('cryptoAddressData').updateOne({ address: req.params.id }, { $set: { transactions: data.result } });
            console.log('Transaction list updated');
        } else {
            await db.collection('cryptoAddressData').insertOne({ address: req.params.id, transactions: data.result });
            console.log('Transaction list added');
        }
        res.send(data);
    } else {
        res.status(500).send({ message: "Error connecting to database" });
    }
}