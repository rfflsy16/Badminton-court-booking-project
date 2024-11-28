import { db } from "../config";

export default class NotificationModel {
    static getCollection() {
        return db.collection('Notifications')
    }
}