import { db } from "../config";

export default class PaymentModel {
    static getCollection() {
        return db.collection('Payments')
    }
}