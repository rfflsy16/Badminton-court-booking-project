import express from 'express';
import { BookingController } from '../controllers/BookingController.js';


export default function bookingRouter() {
    const router = express.Router();

    router.get("/", BookingController.getBooking);
    router.post("/", BookingController.addBooking);
    router.get("/user", BookingController.getBookingByUserID);
    router.get("/transaction/user", BookingController.getTransactionByUserID);
    router.post('/:bookingId/complete-payment', BookingController.completePayment);
    router.get("/:id", BookingController.getBookingById);


    return router

}


