import express from 'express'
import { userController } from '../controllers/UserController'
import { errorHandler } from '../middlewares/errorHandler'

export const router = express.Router()

router.post("/register", userController.register)
router.post("/login", userController.login)

router.use(errorHandler)
