import express from 'express'
import { userController } from '../controllers/UserController.js'
import { errorHandler } from '../middlewares/errorHandler.js'
import { authentication } from '../middlewares/authentication.js'
import buildings from "./buildings.js"
import room from "./room.js"
import message from "./message.js"

export const router = express.Router()

router.post("/register", userController.register)
router.post("/login", userController.login)

router.use(authentication)
router.get("/profile")
router.use("/buildings",buildings)
router.use("/room", room)
router.use("/message", message)



router.use(errorHandler)
