import express from 'express'
import { userController } from '../controllers/UserController.js'
import { errorHandler } from '../middlewares/errorHandler.js'

export const router = express.Router()

router.post("/register", userController.register)
router.post("/login", userController.login)

router.use(errorHandler)
