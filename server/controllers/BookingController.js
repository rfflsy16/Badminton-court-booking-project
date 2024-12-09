import BookingModel from "../models/booking.js";
import { ObjectId } from "mongodb";
import PaymentModel from "../models/payment.js";
import midtransClient from 'midtrans-client';
import { User } from "../models/user.js";
import CourtModel from "../models/court.js";
import 'dotenv/config'

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

    static async getBookingByUserID(req, res, next) {
        try {
            const { userId } = req.loginInfo;
            const bookings = await BookingModel.readByUserId(userId)

            res.status(200).json(bookings);
        } catch (error) {
            next(error);
        }
    }

    static async getBookingById(req, res, next) {
        try {
            const { id } = req.params;
            console.log(id, "ini id booking")
            const booking = await BookingModel.bookingById(id);

            // console.log(booking, "<<<<<<<<<<<<<<<<<<<<<< ini booking");

            res.status(200).json(booking);

        } catch (error) {
            next(error);
        }
    }

    static async getTransactionByUserID(req, res, next) {
        try {
            const { userId } = req.loginInfo;
            const bookings = await BookingModel.readByUserId(userId)

            res.status(200).json(bookings);
        } catch (error) {
            next(error);
        }
    }

    // Add a new booking
    static async addBooking(req, res, next) {

        try {
            const { userId } = req.loginInfo;
            const { courtId, date, selectedTime, paymentType } = req.body;
            const court = await CourtModel.readCourtById(courtId);
            const price = court.price;

            // Validate input
            if (!courtId || !date || !selectedTime || !paymentType || !price) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            // Validasi apakah waktu sudah di-booking
            const existingBookings = await BookingModel.findByCourtAndDate(courtId, date);

            if (existingBookings && existingBookings.length > 0) {
                const conflictingTimes = existingBookings
                    .filter(booking => booking.statusBooking !== 'cancelled') // Only check non-cancelled bookings
                    .flatMap(booking => booking.selectedTime)
                    .filter(time => selectedTime.includes(time));

                if (conflictingTimes.length > 0) {
                    return res.status(400).json({
                        message: `Lapangan sudah di-booking pada jam ${conflictingTimes.join(', ')}:00`
                    });
                }
            }

            const totalPrice = selectedTime.length * price;

            let paymentAmount = totalPrice;
            if (paymentType === "dp") {
                paymentAmount = totalPrice * 0.5;
            }

            const bookingData = {
                userId,
                courtId: new ObjectId(courtId), // Gunakan ObjectId untuk konversi
                date,
                selectedTime,
                paymentType,
                price,
                totalPrice,
                statusBooking: "pending",
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const newBooking = await BookingModel.create(bookingData, userId);

            const bodyPayment = {
                userId,
                BookingId: newBooking.insertedId,
                type: paymentType,
                amount: paymentAmount,
                status: "pending"
            };
            const newPayment = await PaymentModel.createNewPayment(bodyPayment, userId);

            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY
            });

            const userData = await User.getById(userId);

            let parameter = {
                "transaction_details": {
                    "order_id": newPayment._id,
                    "gross_amount": bodyPayment.amount
                },
                "credit_card": {
                    "secure": true
                },

                "customer_details": {
                    "first_name": userData.fullName,
                    "last_name": "",
                    "email": userData.email,
                    "phone": ""
                }
            };

            const transaction = await snap.createTransaction(parameter)

            res.status(201).json({
                message: "Booking created successfully",
                booking: newBooking,
                paymentUrl: "",
                newPayment,
                midtransUrl: transaction.redirect_url,
                midtransToken: transaction.token
            });

        } catch (error) {
            next(error);
        }
    }

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

    static async handleNotification(req, res, next) {
        try {
            const notificationBody = req.body;

            //ini khusus payment status
            if (notificationBody.transaction_status === 'capture') {
                // Payment successful
                const payment = await PaymentModel.readByIdPayment(notificationBody.order_id);
                if (payment) {
                    payment.status = 'paid';
                    payment.updatedAt = new Date();

                    await PaymentModel.updatePaymentStatus(notificationBody.order_id, payment.status);

                    const booking = await BookingModel.readById(payment.BookingId);

                    if (booking) {
                        if (booking.paymentType === 'fullpayment') {
                            booking.statusBooking = 'paid';
                            booking.updatedAt = new Date();
                            await BookingModel.updateBookingStatus(booking._id, booking.statusBooking);
                        } else if (booking.paymentType === 'dp') {
                            // get payment by booking id
                            const payments = await PaymentModel.readPaymentByBookingId(booking._id);

                            // sum payment amount by booking id
                            let totalPayment = 0;

                            payments.forEach(element => {
                                totalPayment += element.amount
                            });

                            if (totalPayment === booking.totalPrice) {
                                booking.statusBooking = 'paid';
                                booking.updatedAt = new Date();
                                await BookingModel.updateBookingStatus(booking._id, booking.statusBooking);
                            }

                        }
                    }
                    res.status(200).json({ message: 'Successfully Update Status' });
                }
            }
        } catch (error) {
            next(error);
        }
    }

    static async completePayment(req, res, next) {
        try {
            const { bookingId } = req.body; // ID booking dari parameter
            // const { paymentAmount } = req.body; // Nominal pembayaran pelunasan

            // Cari booking berdasarkan ID
            if (bookingId.length < 24) throw { name: 'InvalidInputID' }
            const booking = await BookingModel.readById(bookingId);

            if (!booking) {
                return res.status(404).json({ message: "Booking not found" });
            }

            // Validasi status booking
            if (booking.statusBooking === "paid") {
                return res.status(400).json({ message: "Booking is already fully paid" });
            }

            // Ambil semua pembayaran terkait booking ini
            const payments = await PaymentModel.readPaymentByBookingId(booking._id);

            // Hitung total pembayaran yang sudah dilakukan
            let totalPayment = 0;
            payments.forEach((element) => {
                totalPayment += element.amount;
            });

            // Hitung sisa pembayaran
            const remainingPayment = booking.totalPrice - totalPayment;

            if (remainingPayment <= 0) {
                return res.status(400).json({ message: "No remaining payment required" });
            }

            // Opsional: Simpan transaksi pelunasan sementara ke database untuk pelacakan
            const paymentData = {
                userId: booking.userId,
                BookingId: booking._id,
                type: "dp",
                amount: remainingPayment,
                status: "pending",
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const newPayment = await PaymentModel.createNewPayment(paymentData, booking.userId);

            const user = await User.getById(booking.userId);
            // Buat transaksi ke Midtrans untuk pelunasan
            let snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY,
            });

            let parameter = {
                transaction_details: {
                    order_id: `${newPayment._id}`, // Gunakan ID unik dari pembayaran baru
                    gross_amount: remainingPayment,
                },
                credit_card: {
                    secure: true,
                },
                customer_details: {
                    first_name: user.fullName, // Ubah sesuai data user
                    last_name: "",
                    email: user.email, // Tambahkan email user jika ada
                    phone: "",
                },
            };

            const transaction = await snap.createTransaction(parameter);

            res.status(200).json({
                message: "Pelunasan berhasil diinisiasi",
                booking,
                paymentUrl: transaction.redirect_url, // URL untuk melanjutkan pelunasan di Midtrans
            });
        } catch (error) {
            next(error);
        }
    }


}
