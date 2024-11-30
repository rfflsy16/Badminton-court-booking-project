import { ObjectId } from "mongodb";
import { db } from "../config";

export default class CourtModel {
    static getCollection() {
        return db.collection('Courts')
    }

    static async readCourt() {
        const collection = this.getCollection()
        const courts = await collection.find().toArray()

        return courts
    }

    static async readByidCourt(id) {
        const _id = new ObjectId(id)
        const collection = this.getCollection()

        const court = await collection.findOne({ _id })
        if (!court) throw { name: 'NotFound' }

        return court
    }

    static async createNewCourt(body) {
        const { } = body
    }
}