import { db } from "../config/mongoDB.js";
import { ObjectId } from "mongodb";

export default class BuildingModel {
    static getCollection() {
        return db.collection("Buildings");
    }

    static async readBuilding() {
        const collection = this.getCollection();
        const buildings = await collection.find().toArray();
        return buildings;
    }

    static async readByIdBuilding(id) {
        const _id = new ObjectId(id);
        const collection = this.getCollection();
        const building = await collection.findOne({ _id });

        if (!building) {
            throw new Error("Building not found");
        }

        return building;
    }

    static async createNewBuilding(body) {
        const { name, address, location } = body;

        if (!name || !address || !location || !location.type || !location.coordinates) {
            throw new Error("Invalid data. Provide name, address, and a valid location.");
        }

        const collection = this.getCollection();
        const newBuilding = {
            name,
            address,
            location,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await collection.insertOne(newBuilding);
        return result.ops[0];
    }

    static async updateBuilding(id, body) {
        const _id = new ObjectId(id);
        const { name, address, location } = body;

        const updateData = {
            ...(name && { name }),
            ...(address && { address }),
            ...(location && { location }),
            updatedAt: new Date(),
        };

        const collection = this.getCollection();
        const result = await collection.findOneAndUpdate(
            { _id },
            { $set: updateData },
            { returnDocument: "after" }
        );

        if (!result.value) {
            throw new Error("Building not found or no changes made");
        }

        return result.value;
    }

    static async deleteBuilding(id) {
        const _id = new ObjectId(id);
        const collection = this.getCollection();
        const result = await collection.deleteOne({ _id });

        if (result.deletedCount === 0) {
            throw new Error("Building not found");
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
}
