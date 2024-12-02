import BookingModel from "../models/booking.js";

export class BookingController {
    // Get all bookings
    static async getBooking(req, res, next) {
        try {
            const bookings = await BookingModel.read();
            res.status(200).json(bookings);
        } catch (error) {
            next(error);
        }
    }

    // Add a new booking
    static async addBooking(req, res, next) {
        try {
            const { UserId, CourtId, date, selectedTime, paymentType, price } = req.body;

            // Validate input
            if (!UserId || !CourtId || !date || !selectedTime || !paymentType || !price) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            // Calculate total price
            const totalPrice = selectedTime.length * price;

            const bookingData = {
                UserId,
                CourtId,
                date,
                selectedTime,
                paymentType,
                price,
                totalPrice,
                statusBooking: paymentType === "fullpayment" ? "paid" : "ongoing",
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const newBooking = await BookingModel.create(bookingData);
            res.status(201).json({ message: "Booking created successfully", booking: newBooking.ops[0] });
        } catch (error) {
            next(error);
        }
    }

    // Delete a booking
    static async deleteBooking(req, res, next) {
        try {
            const { id } = req.params;

            const result = await BookingModel.deleteById(id);
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "Booking not found" });
            }

            res.status(200).json({ message: "Booking deleted successfully" });
        } catch (error) {
            next(error);
        }
    }

    // Update booking payment status for DP
    static async updatePayment(req, res, next) {
        try {
            const { id } = req.params;
            const { paymentAmount } = req.body;

            const booking = await BookingModel.readById(id);
            if (!booking) {
                return res.status(404).json({ message: "Booking not found" });
            }

            const paidAmount = booking.paidAmount || 0;
            const newPaidAmount = paidAmount + paymentAmount;

            if (newPaidAmount >= booking.totalPrice) {
                // Payment complete
                booking.statusBooking = "paid";
                booking.paidAmount = booking.totalPrice;
            } else {
                // Partial payment
                booking.paidAmount = newPaidAmount;
            }

            booking.updatedAt = new Date();

            await BookingModel.updateById(id, booking);
            res.status(200).json({ message: "Payment updated successfully", booking });
        } catch (error) {
            next(error);
        }
    }
}
