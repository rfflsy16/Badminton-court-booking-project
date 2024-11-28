import { MongoClient, Db } from "mongodb";
import "dotenv/config";

const uri =
  process.env.MONGO_URI ||
  "mongodb+srv://rfflsy16:mamangGacor16@raffles.9c2dw.mongodb.net/";

const client = new MongoClient(uri);
const db = client.db("CourtsSystemDB");

export { db, client };
