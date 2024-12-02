import { ObjectId } from "mongodb";
import { db } from "../config/mongoDB.js";

export default class BookingModel {
    static getCollection() {
        return db.collection('Bookings');
    }

    static async read() {
        const collection = this.getCollection();
        return await collection.find().toArray();
    }

    static async readById(id) {
        const _id = new ObjectId(id);
        const collection = this.getCollection();
        return await collection.findOne({ _id });
    }

    static async create(data) {
        const collection = this.getCollection();
        return await collection.insertOne(data);
    }

    static async deleteById(id) {
        const _id = new ObjectId(id);
        const collection = this.getCollection();
        return await collection.deleteOne({ _id });
    }

    static async updateById(id, updateData) {
        const _id = new ObjectId(id);
        const collection = this.getCollection();
        return await collection.updateOne({ _id }, { $set: updateData });
    }
}
