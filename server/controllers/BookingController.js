import BookingModel from "../models/booking.js";
import PaymentModel from "../models/payment.js";
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
            const { userId, username } = req.loginInfo;
            const { courtId, date, selectedTime, paymentType, price } = req.body;

            // Validate input
            if (!courtId || !date || !selectedTime || !paymentType || !price) {
                return res.status(400).json({ message: "Missing required fields" });
            }


            // Validasi apakah waktu sudah di-booking
            const existingBookings = await BookingModel.findByCourtAndDate(courtId, date);
            const conflictingTimes = existingBookings.flatMap(booking => booking.selectedTime)
                .filter(time => selectedTime.includes(time));

            if (conflictingTimes.length > 0) {
                return res.status(400).json({
                    message: `Lapangan penuh pada waktu ${conflictingTimes.join(', ')}`
                });
            }

            // Calculate total price
            const totalPrice = selectedTime.length * price;

            //validasi untuk booking dp
            let paymentAmount = totalPrice; // Default to full price
            if (paymentType === "Dp") {
                paymentAmount = totalPrice * 0.5; // Set DP to 50%
            }

            const bookingData = {
                userId,
                courtId,
                date,
                selectedTime,
                paymentType,
                price,
                totalPrice,
                statusBooking: paymentType === "fullpayment" ? "paid" : "ongoing",
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            // Simpan booking
            const newBooking = await BookingModel.create(bookingData, userId);

            // Simpan ke data payment
            const bodyPayment = {
                BookingId: newBooking.insertedId,
                type: paymentType,
                amount: paymentAmount,
                status: "pending"
            };
            const newPayment = await PaymentModel.createNewPayment(bodyPayment, username);

            res.status(201).json({
                message: "Booking created successfully",
                booking: newBooking,
                paymentUrl: "",
                newPayment,
            });
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
