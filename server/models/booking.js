import { db } from "../config";

export default class BookingModel {
    static getCollection() {
        return db.collection('Bookings')
    }
}