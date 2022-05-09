import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();

let db;
const mongoClient = new MongoClient(process.env.DB_URL);

try{
    await mongoClient.connect();
    db = mongoClient.db(process.env.DB_NAME);
}catch(err){
    console.log(err);
}

export default db;