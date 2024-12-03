import { db } from "../config/mongoDB.js";

export default class TestLocation {
    static getCollection() {
        return db.collection("TestLocation");
    }

    // static findDataByLocations(lat, long) {
    //     const collection = this.getCollection();
    //     return collection.find({
    //         location: {
    //             $near: {
    //                 $geometry: {
    //                     type: "Point",
    //                     coordinates: [Number(long), Number(lat)]
    //                 },
    //                 $maxDistance: 1000
    //             }
    //         }
    //     }).toArray();

    // }
}
