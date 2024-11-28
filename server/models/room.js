import { db } from "../config";

export default class RoomModel {
    static getCollection() {
        return db.collection('Rooms')
    }
}