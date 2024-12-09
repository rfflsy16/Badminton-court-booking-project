import { MongoClient, Db } from 'mongodb'
import "dotenv/config";

const dbName = process.env.NODE_ENV === 'test' ? "badmintonCourtsDB_test" : 'badmintonCourtsDB'

const uri =
  process.env.MONGO_URI ||
  "mongodb+srv://admin:admin@cluster0.qh8xn.mongodb.net/";



const client = new MongoClient(uri);
const db = client.db(dbName);

export { db, client };
