import { ObjectId } from "mongodb"
import { db } from "../config/mongoDB"

export default class BookingModel {
    static getCollection() {
        return db.collection('Bookings')
    }

    static async read() {
        const collection = this.getCollection()
        return await collection.find().toArray()
    }

    static async readById(id) {
        const _id = new ObjectId(id)
        const collection = this.getCollection()

        const BookingById = await collection.findOne({ _id })

        return BookingById
    }
}