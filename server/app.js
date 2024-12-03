
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./router/index.js"
import cron from "./cronJob.js";
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router)


cron;
export { app } 
