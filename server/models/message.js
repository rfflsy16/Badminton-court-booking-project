import { db } from "../config";

export default class MessageModel {
    static getCollection() {
        return db.collection('Messages')
    }
}