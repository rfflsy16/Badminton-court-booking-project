import { ObjectId } from "mongodb";
import { db } from "../config/mongoDB.js";

export default class PaymentModel {
    static getCollection() {
        return db.collection('Payments')
    }

    static async readPayment() {
        const collection = this.getCollection()
        const payments = await collection.find().toArray()

        return payments
    }

    static async readByIdPayment(id) {

        const _id = new ObjectId(id)
        const collection = this.getCollection()

        const payment = await collection.findOne({ _id })


        if (!payment) {
            throw { name: 'NotFound' }
        }

        return payment
    }

    static async readPaymentByBookingId(BookingId) {     
        const collection = this.getCollection()
        const payments = await collection.find({ BookingId }).toArray()

        return payments
    }

    static async createNewPayment(body, username) {
        const { BookingId, type, amount, status = "pending", userId } = body
        

        if (!BookingId || !type || !amount) {
            throw { name: 'BADREQUEST' }
        }

        const collection = this.getCollection()
        const newPayment = {
            userId,
            BookingId,
            type,
            amount,
            status,
            createdAt: new Date(),
            updatedAt: new Date()
        }

       const payment = await collection.insertOne(newPayment)
        return { message: 'Succeess Payment', _id: payment.insertedId }
    }

    static async updatePaymentStatus(id, status) {
        const _id = new ObjectId(id)
        const collection = this.getCollection()
        const updateData = {
            status,
            updatedAt: new Date()
        }

        const payment = await collection.updateOne({ _id }, { $set: updateData })

        return { message: 'Success update payment status', payment }
    }
}