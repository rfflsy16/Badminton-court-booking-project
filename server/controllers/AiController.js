import { GoogleGenerativeAI } from "@google/generative-ai";
import BookingModel from "../models/booking.js";
import CourtModel from "../models/court.js";

export default class AIController {
    static async generateRecommendations() {
        try {
            const bookings = await BookingModel.read();
            const courts = await CourtModel.readCourts();

            const recommendations = courts.map((court) => {
                const bookedTimes = bookings
                    .filter((booking) => booking.courtId?.toString() === court._id.toString())
                    .flatMap((booking) => booking.selectedTime || []);

                const allTimes = Array.from(
                    { length: court.endTime - court.startTime },
                    (_, i) => court.startTime + i
                );
                const availableTimes = allTimes.filter((time) => !bookedTimes.includes(time));

                return { courtName: court.name, availableTimes };
            });

            const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `
                Tampilkan daftar lapangan kosong dan jam tersedia:
                ${recommendations
                    .map(
                        (rec) =>
                            `Lapangan: ${rec.courtName}, Waktu kosong: ${rec.availableTimes.join(", ")}`
                    )
                    .join("\n")}
            `;
            const aiResponse = await model.generateContent(prompt);

            console.log("AI Jawab:", aiResponse.text);

            return recommendations;
        } catch (error) {
            console.error("Error di AI:", error);
            throw error;
        }
    }
}
