import request from "request";
import db from "../config/koinx.mongo.js";

var etherloop = setInterval(function () {
    request({
        url: "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr",
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, async function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            if (db.readyState === 1) {
                let inr_price = await db.collection('ethereumData').findOne({ ethereum: { $exists: true } });
                if (db.collection('ethereumData').name === 'ethereumData') {
                    await db.collection('ethereumData').updateOne({ "ethereum": { "inr": inr_price.ethereum.inr } }, { $set: { "ethereum": { "inr": data.ethereum.inr } } });
                    console.log('ethereum price updated');
                }
            } else {
                console.log('Error connecting to database');
            }
            console.log(data);
        } else {
            console.log(error);
        }
    });
}, 100000);

export default etherloop;