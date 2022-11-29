import db from "../config/koinx.mongo.js";
import { getAllTransByAdd } from "../controller/koinx.controller.js";

const QUERY = {
    UPDATE_COLLECTION: db.collection('cryptoAddressData'),
    // UPDATE_COLLECTION: db.collection('cryptoAddressData').updateMany("*", "*"),
    //FIND_COLLECTION: db.collection('cryptoAddressData').find(),
}

export default QUERY;