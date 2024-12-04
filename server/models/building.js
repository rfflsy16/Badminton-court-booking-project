import { db } from "../config/mongoDB.js";
import { ObjectId } from "mongodb";

export default class BuildingModel {
    static getCollection() {
        return db.collection("Buildings");
    }

    static async readBuilding() {
        const collection = this.getCollection();
        const buildings = await collection.aggregate([
            {
                $lookup: {
                    from: "Courts",
                    localField: "_id",
                    foreignField: "BuildingId",
                    as: "courts",
                },
            },
        ]).toArray();
        return buildings;
    }

    static async readByIdBuilding(id) {
        const _id = new ObjectId(id);
        const collection = this.getCollection();

        const building = await collection.aggregate([
            { $match: { _id } },
            {
                $lookup: {
                    from: "Courts",
                    localField: "_id",
                    foreignField: "BuildingId",
                    as: "courts",
                },
            }]).toArray();

        if (!building || building.length === 0) {
            throw { name: "BuildingNotFound" };
        }

        return building[0];
    }

    static async createNewBuilding(body, userId) {
        const { name, address, location, city, imgUrl } = body;

        if (!name || !address || !city || !imgUrl || !location || !location.type || !location.coordinates) {
            throw { name: "BADREQUEST" }
        }

        // console.log(body, "<<<<<<")

        const collection = this.getCollection();
        const newBuilding = {
            name,
            address,
            city,
            imgUrl,
            location,
            userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await collection.insertOne(newBuilding);
        // console.log(result, "<<<<<<,")
        return result.ops;
    }


    static async deleteBuilding(id) {
        const _id = new ObjectId(id);
        const collection = this.getCollection();
        const result = await collection.deleteOne({ _id });

        if (result.deletedCount === 0) {
            throw { name: 'BuildingNotFound' }
        }

        return { message: "Building deleted successfully" };
    }

    static async findNearestBuildings(userLocation, maxDistanceInMeters = 1000) {
        const collection = this.getCollection();

        const buildings = await collection.find({
            location: {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates: userLocation,
                    },
                    $maxDistance: maxDistanceInMeters,
                },
            },
        }).toArray();

        return buildings;
    }

    static async findBuildingByCoordinates(longitude, latitude) {
        const collection = this.getCollection();

        if (typeof longitude !== 'number' || typeof latitude !== 'number') {
            throw { name: 'InvalidCoordinates' }
        }

        const buildings = await collection.find({
            location: {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 5000,
                },
            },
        }).toArray();

        console.log('Found nearby courts:', buildings.length);

        if (!buildings || buildings.length === 0) {
            return [];
        }

        return buildings;
    }

}