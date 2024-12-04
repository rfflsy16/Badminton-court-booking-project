import { GoogleGenerativeAI } from "@google/generative-ai";
import BookingModel from "../models/booking.js";
import CourtModel from "../models/court.js";

export default class AIController {
    static async generateRecommendations(req, res, next) {
        try {
            const bookings = await BookingModel.read();
            const courts = await CourtModel.readCourts();

            const recommendations = courts.map((court) => {
                const bookedTimes = bookings
                    .filter(
                        (booking) =>
                            booking.CourtId?.toString() === court._id.toString() &&
                            new Date(booking.date).toDateString() === new Date().toDateString()
                    )
                    .flatMap((booking) => booking.selectedTime || []);

                const allTimes = Array.from(
                    { length: court.endTime - court.startTime },
                    (_, i) => court.startTime + i
                );

                const excludedTimes = court.excludedTime || [];
                const availableTimes = allTimes.filter(
                    (time) => !bookedTimes.includes(time) && !excludedTimes.includes(time)
                );
                return { GOR: court.buildingDetails[0].name, availableTimes };
            });

            if (recommendations.length === 0) {
                return res.status(200).json({ message: "Tidak ada lapangan yang tersedia." });
            }

            const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAi.getGenerativeModel({ model: "gemini-1.5-pro" });

            const prompt = `
                Buat kalimat gen z untuk memberikan rekomendasi apa saja lapangan yang tersedia dari GOR nya, dan saya mau kamu menganalisis data selama 1 minggu terakhir berdasarkan data berikut:
                ${recommendations
                    .map(
                        (rec) =>
                            `GOR: ${rec.GOR}, Waktu kosong: ${rec.availableTimes.join(", ")}`
                    )
                    .join("\n")} jangan ada enter  dan tanpa enter`;

            const aiResponse = await model.generateContent(prompt);
            const aiText = aiResponse.response.text();

            console.log(aiText, "<<<< ini ai text")
            res.status(200).json({
                message: "Rekomendasi lapangan yang tersedia:",
                aiText,
                rawData: recommendations,
            });
        } catch (error) {
            console.error("Error di AI:", error);
            throw error;
        }
    }
}
