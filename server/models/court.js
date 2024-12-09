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

        if (!BuildingId || !category || !type || !description || !startTime || !endTime || !excludedTime || !excludedDate || !price || !dp) {
            throw { name: 'BADREQUEST' }
        }

        const findBuildingByBuildingId = await BuildingModel.readByIdBuilding(BuildingId)

        // console.log(findBuildingByBuildingId, "<<<<<<<,")
        if (!findBuildingByBuildingId) {
            throw new Error("Invalid BuildingId");
        }

        const locationBuilding = await findBuildingByBuildingId.address
        // console.log(locationBuilding, "<<<<<<")
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
            location: locationBuilding,
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
                {
                    $unwind: {
                        path: "$buildingDetails",
                        preserveNullAndEmptyArrays: true,
                    },
                }
            ])
            .toArray();

        if (court.length === 0) throw { name: "CourtNotFound" };
        return court[0];
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
        // console.log(result, "<<<<<<<")
        if (!result.length) {
            throw { name: "BuildingNotFound" };
        }
        return result[0];
    }
}
