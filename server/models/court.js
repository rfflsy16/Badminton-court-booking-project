import { db } from "../config";

export default class CourtModel {
    static getCollection() {
        return db.collection('Courts')
    }
}