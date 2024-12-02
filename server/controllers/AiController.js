import { GoogleGenerativeAI } from "@google/generative-ai";
import BookingModel from "../models/booking";
import CourtModel from "../models/court";

export default class AIController {
    static async recommendation(req, res, next) {
        try {
            const checkAvailableOrNot = await BookingModel.read()
            if (checkAvailableOrNot.length === 0) {
                return res.status(200).json({
                    message: 'Lapangan ini sudah di booking',
                    status: 'Booked'
                })
            } else {
                const availableCourt = await CourtModel.readCourts()

                const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
                const model = genAi.getGenerativeModel({ model: 'gemini-1.5-flash' })

                const prompt = ``
            }

        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}