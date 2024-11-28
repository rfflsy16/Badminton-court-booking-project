import { ObjectId } from "mongodb";
import { db } from "../config";

export default class BuildingModel {
    static getCollection() {
        return db.collection('Buildings')
    }

    static async readBuilding() {
        const collection = this.getCollection()
        const building = await collection.find().toArray()

        return building
    }

    static async readByIdBuilding(id) {
        const _id = new ObjectId(id)
        const collection = this.getCollection()

        const detailBuilding = await collection.findOne({ _id })
        if (!detailBuilding) throw new Error('Building is not found')
        return detailBuilding
    }

    static async createNewBuilding(body) {
        const { name, address, location } = body
    }
}