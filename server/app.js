import express from 'express'
import 'dotenv/config'
import cors from 'cors'
const app = express()
const port = 3003

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log(`Server Running on Port ${port}`)
}) 