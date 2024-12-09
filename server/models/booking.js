import { ObjectId } from "mongodb";
import { db } from "../config/mongoDB.js";

export default class BookingModel {
    static getCollection() {
        return db.collection('Bookings');
    }

    static async read() {
        const collection = this.getCollection();
        // console.log(collection, "collection================")
        return await collection.find().toArray();
    }

    static async readById(id) {
        const _id = new ObjectId(id);
        const collection = this.getCollection();
        return await collection.findOne({ _id });
    }

    static async readByUserId(userId) {

        const id = new ObjectId(userId);
        console.log(id, "id================")
        const collection = this.getCollection();

        return await collection.aggregate([
            {
                $match: { userId: id }
            },

            {
                $lookup: {
                    from: "Courts",
                    localField: "courtId",
                    foreignField: "_id",
                    as: "court"
                }
            },

            {
                $unwind: {
                    path: "$court",
                    preserveNullAndEmptyArrays: false
                }
            },

            {
                $lookup: {
                    from: "Buildings",
                    localField: "court.BuildingId",
                    foreignField: "_id",
                    as: "building"
                }
            },

            {
                $unwind: {
                    path: "$building",
                    preserveNullAndEmptyArrays: false
                }
            }
        ]).toArray();

    }

    static async bookingById(bookingId) {
        const _id = new ObjectId(bookingId);
        console.log(_id, "id================")
        const collection = this.getCollection();
        const booking = await collection.aggregate([
            {
                $match: { _id }
            },
            {
                $lookup: {
                    from: "Payments",
                    localField: "_id",
                    foreignField: "BookingId",
                    as: "payment"
                }
            },
            {
                $lookup: {
                    from: "Courts",
                    localField: "courtId",
                    foreignField: "_id",
                    as: "court"
                }
            },
            {
                $unwind: {
                    path: "$court",
                    preserveNullAndEmptyArrays: true
                },
            },
            {
                $lookup: {
                    from: "Buildings",
                    localField: "court.BuildingId",
                    foreignField: "_id",
                    as: "building"
                }
            },

            {
                $unwind: {
                    path: "$building",
                    preserveNullAndEmptyArrays: true
                }
            }
        ]).toArray();
        if (booking.length > 0) {

            return booking[0]
        } else {
            return null
        }

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

    static async updateBookingStatus(id, status) {
        const _id = new ObjectId(id)
        const collection = this.getCollection()
        const updateData = {
            statusBooking: status,
            updatedAt: new Date()
        }

        const booking = await collection.updateOne({ _id }, { $set: updateData })

        return { message: 'Success update booking status', booking }
    }

    static async findByCourtAndDate(courtId, date) {
        const collection = this.getCollection();

        // Convert courtId to ObjectId if it's a string
        const courtObjectId = typeof courtId === 'string' ? new ObjectId(courtId) : courtId;

        // Create start and end of the day for the given date
        const searchDate = new Date(date);
        const startOfDay = new Date(searchDate.getFullYear(), searchDate.getMonth(), searchDate.getDate());
        const endOfDay = new Date(searchDate.getFullYear(), searchDate.getMonth(), searchDate.getDate() + 1);

        return await collection.find({
            courtId: courtObjectId,
            date: {
                $gte: startOfDay.toISOString(),
                $lt: endOfDay.toISOString()
            }
        }).toArray();
    }
}
