import dotenv from "dotenv";
import db from "../config/koinx.mongo.js";

dotenv.config();

const apikey = process.env.API_TOKEN;
const url = "https://api.etherscan.io/api?module=account";

export const fetchBalance = async (req, res) => {
    const collection_data = await db.collection('cryptoAddressData').findOne({ address: req.params.id, transactions: { $exists: true } });
    const range = collection_data.transactions.length;
    
    let balance = 0;

    for (let i = 0; i < range; i++) {
        let to_user = collection_data.transactions[i].to;
        let from_user = collection_data.transactions[i].from;
        let value = collection_data.transactions[i].value;

        if (to_user === req.params.id) {
            balance += parseInt(value);
        } else if (from_user === req.params.id) {
            balance -= parseInt(value);
        }
    }
    
    const ethereum_rate = await db.collection('ethereumData').findOne({ ethereum: { $exists: true } });

    res.status(200).json({ address: req.params.id, balance: balance, ethereum_rate: ethereum_rate.ethereum.inr });
}

export const getAllTransByAdd = async (req, res) => {
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