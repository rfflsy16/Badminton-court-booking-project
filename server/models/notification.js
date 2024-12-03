import { db } from "../config/mongoDB.js"

export default class NotificationModel {
    static getCollection() {
        return db.collection('Notifications')
    }
}