
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {router} from "./router/index.js"
const app = express();
const port = process.env.PORT || 3003;

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)

app.listen(port, () => {
    console.log(`Server Running on Port ${port}`)
}) 

