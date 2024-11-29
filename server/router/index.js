import express from 'express'
import { userController } from '../controllers/UserController.js'
import { errorHandler } from '../middlewares/errorHandler.js'
import { authentication } from '../middlewares/authentication.js'
import roomRouter from '../router/room.js'
import buildingRouter from './buildings.js'
import messageRouter from "./message.js"

export const router = express.Router()

router.post("/register", userController.register)
router.post("/login", userController.login)

router.use(authentication)
router.get("/profile")
router.use("/buildings",buildingRouter)
router.use("/room", roomRouter)
router.use("/message", messageRouter)



router.use(errorHandler)