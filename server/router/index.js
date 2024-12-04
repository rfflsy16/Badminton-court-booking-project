import express from 'express'
import { UserController } from '../controllers/UserController.js'
import { errorHandler } from '../middlewares/errorHandler.js'
import { authentication } from '../middlewares/authentication.js'
import roomRouter from '../router/room.js'

import buildingRouter from './buildings.js'
import messageRouter from "./message.js"
import courtRouter from './courts.js'
import bookingRouter from './booking.js'
import { BookingController } from '../controllers/BookingController.js';
import geminiRouter from './gemini.js'
export const router = express.Router()

router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.post('/midtrans-notification', BookingController.handleNotification);
router.post('/complete-payment', BookingController.completePayment);



router.use(authentication)

router.get("/profile", UserController.getProfile)
router.use("/buildings", buildingRouter())
router.use('/courts', courtRouter())
router.use("/room", roomRouter())
router.use("/message", messageRouter())
router.use("/booking", bookingRouter())
router.use('/send-notification', geminiRouter())

router.use(errorHandler)