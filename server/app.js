
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./router/index.js"
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)

export { app } 
