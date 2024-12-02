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

    static async createNewPayment(body, username) {
        const { BookingId, type, amount, status = "pending" } = body

        if (!BookingId || !type || !amount) {
            throw { name: 'BADREQUEST' }
        }

        const collection = this.getCollection()
        const newPayment = {
            username,
            BookingId,
            type,
            amount,
            status,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        await collection.insertOne(newPayment)
        return { message: 'Succeess Payment' }
    }
}