import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3003;

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(port, () => {
  console.log(`Server Running on  http://localhost:${port}`);
});


export { app }