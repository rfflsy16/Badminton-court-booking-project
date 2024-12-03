import { GoogleGenerativeAI } from "@google/generative-ai";
import BookingModel from "../models/booking.js";
import CourtModel from "../models/court.js";

export default class AIController {
    static async recommendation(req, res, next) {
        try {
            const checkAvailableOrNot = await BookingModel.read()
            if (checkAvailableOrNot) {
                return res.status(200).json({
                    message: 'Lapangan ini sudah di booking',
                    status: 'Booked'
                })
            }

            const availableCourt = await CourtModel.readCourts()
            console.log(availableCourt, "<<<<<<")

            const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
            const model = genAi.getGenerativeModel({ model: 'gemini-1.5-flash' })
            const prompt = ``
            const generate = await model.generateContent(prompt)

            res.status(200).json({
                availableCourt
            })



        } catch (error) {
            console.log(error)
            // next(error)
        }
    }
}