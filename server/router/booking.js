import express from 'express';
import { BookingController } from '../controllers/BookingController.js';


export default function bookingRouter() {
    const router = express.Router();

    // Routes
    router.get("/", BookingController.getBooking);
    router.post("/", BookingController.addBooking);
    router.delete("/:id", BookingController.deleteBooking);
    router.patch("/:id/payment", BookingController.updatePayment);

    return router

}


