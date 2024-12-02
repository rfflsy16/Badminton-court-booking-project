import { db } from "../config/mongoDB.js";
import { ObjectId } from "mongodb";
import BuildingModel from "./building.js";

export default class CourtModel {
    static getCollection() {
        return db.collection("Courts");
    }

    static async createCourt(body) {
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
            location,
        } = body;

        const findBuildingByBuildingId = await BuildingModel.readByIdBuilding(BuildingId)

        if (!findBuildingByBuildingId) {
            throw new Error("Invalid BuildingId");
        }

        const newCourt = {
            BuildingId: new ObjectId(BuildingId),
            category,
            type,
            description,
            startTime,
            endTime,
            excludedTime,
            excludedDate,
            price,
            dp,
            location,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await this.getCollection().insertOne(newCourt);

        return { message: 'Success added new Court' };
    }

    static async readCourts() {
        return await this.getCollection()
            .aggregate([
                {
                    $lookup: {
                        from: "Buildings",
                        localField: "BuildingId",
                        foreignField: "_id",
                        as: "buildingDetails",
                    },
                },
            ])
            .toArray();
    }

    static async readCourtById(id) {
        const court = await this.getCollection()
            .aggregate([
                { $match: { _id: new ObjectId(id) } },
                {
                    $lookup: {
                        from: "Buildings",
                        localField: "BuildingId",
                        foreignField: "_id",
                        as: "buildingDetails",
                    },
                },
            ])
            .toArray();

        if (court.length === 0) throw { name: "CourtNotFound" };
        return court[0];
    }

    static async updateCourt(id, data) {
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
            location,
        } = data;

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
            ...(location && { location }),
            updatedAt: new Date(),
        };

        const result = await this.getCollection().findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: updateData },
            { returnDocument: "after" }
        );

        if (!result.value) throw { name: "CourtNotFound" };
        return result.value;
    }

    static async deleteCourt(id) {
        const result = await this.getCollection().deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) throw { name: "CourtNotFound" };
        return { message: "Court deleted successfully" };
    }

    static async findBuildingWithCourt(courtId) {
        const collection = this.getCollection();

        const pipeline = [
            { $match: { _id: new ObjectId(courtId) } },
            {
                $lookup: {
                    from: "Courts",
                    localField: "_id",
                    foreignField: "BuildingId",
                    as: "courts",
                },
            },
        ]

        const result = await collection.aggregate(pipeline).toArray();
        console.log(result, "<<<<<<<")
        if (!result.length) {
            throw { name: "BuildingNotFound" };
        }
        return result[0];
    }
}
