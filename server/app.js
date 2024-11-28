import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import router from "./router/index"
const app = express()
const port = 3000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)

app.listen(port, () => {
    console.log(`Server Running on Port ${port}`)
}) 