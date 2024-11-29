import express from 'express'
import { UserController } from '../controllers/UserController.js'
import { errorHandler } from '../middlewares/errorHandler.js'
import { buildingRouter } from './building.js'

export const router = express.Router()

router.post("/register", UserController.register)
router.post("/login", UserController.login)

router.use('/buildings', buildingRouter)

router.use(errorHandler)
