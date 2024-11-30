import { db } from "../config/mongoDB.js";
import { ObjectId } from "mongodb";

export default class CourtModel {
    static getCollection() {
        return db.collection("Courts");
    }

    static async readCourts() {
        const collection = this.getCollection();
        const courts = await collection.find().toArray();
        return courts;
    }

    static async readByIdCourt(id) {
        const _id = new ObjectId(id);
        const collection = this.getCollection();

        const court = await collection.findOne({ _id });
        if (!court) {
            throw { name: "CourtNotFound" };
        }

        return court;
    }

    static async createNewCourt(body) {
        const {
            BuildingId,
            category,
            type,
            description,
            startTime,
            endTime,
            excludedTime,
            excludedDate,
            price,
            dp,
        } = body;

        if (
            !BuildingId ||
            !category ||
            !type ||
            !startTime ||
            !endTime ||
            !price ||
            !dp
        ) {
            throw { name: "BADREQUEST" };
        }

        const collection = this.getCollection();
        const newCourt = {
            BuildingId: new ObjectId(BuildingId),
            category,
            type,
            description,
            startTime,
            endTime,
            excludedTime: excludedTime || [],
            excludedDate: excludedDate || [],
            price,
            dp,
            rating: [],
            review: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await collection.insertOne(newCourt);
        return result.ops[0];
    }

    static async updateCourt(id, body) {
        const _id = new ObjectId(id);
        const {
            category,
            type,
            description,
            startTime,
            endTime,
            excludedTime,
            excludedDate,
            price,
            dp,
        } = body;

        const updateData = {
            ...(category && { category }),
            ...(type && { type }),
            ...(description && { description }),
            ...(startTime && { startTime }),
            ...(endTime && { endTime }),
            ...(excludedTime && { excludedTime }),
            ...(excludedDate && { excludedDate }),
            ...(price && { price }),
            ...(dp && { dp }),
            updatedAt: new Date(),
        };

        const collection = this.getCollection();
        const result = await collection.findOneAndUpdate(
            { _id },
            { $set: updateData },
            { returnDocument: "after" }
        );

        if (!result.value) {
            throw { name: "CourtNotFound" };
        }

        return result.value;
    }

    static async deleteCourt(id) {
        const _id = new ObjectId(id);
        const collection = this.getCollection();
        const result = await collection.deleteOne({ _id });

        if (result.deletedCount === 0) {
            throw { name: "CourtNotFound" };
        }

        return { message: "Court deleted successfully" };
    }

    static async findCourtsByBuilding(BuildingId) {
        const collection = this.getCollection();
        const courts = await collection
            .find({ BuildingId: new ObjectId(BuildingId) })
            .toArray();

        return courts;
    }
}
