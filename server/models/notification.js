import BookingModel from "./booking.js";
import axios from "axios";
import CourtModel from "./court.js";
import { User } from "./user.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default class NotificationModel {
    static async getNotification() {
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

        const users = await User.get()
        const expoTokens = users.map((user) => user.deviceId)

        const body = {
            to: expoTokens,
            sound: 'default',
            title: 'Rekomendasi lapangan yang tersedia',
            body: aiText,
            data: { someData: 'goes here' },
        }

        await axios({
            method: 'POST',
            url: 'https://exp.host/--/api/v2/push/send',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            data: body
        })

        return aiText
    }
}