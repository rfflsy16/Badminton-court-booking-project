import { MongoClient, Db } from 'mongodb'
import "dotenv/config";

const uri =
  process.env.MONGO_URI ||
  "mongodb+srv://admin:admin@cluster0.qh8xn.mongodb.net/";

const client = new MongoClient(uri);
const db = client.db("badmintonCourtsDB");

export { db, client };
