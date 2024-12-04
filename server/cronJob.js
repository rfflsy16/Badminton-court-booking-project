import cron from 'node-cron'
import NotificationModel from './models/notification.js';

export default function schedule() {

    cron.schedule("0 15 * * *", async () => {
        console.log("Cron job jalan: Bikin notifikasi otomatis...");
        await NotificationModel.getNotification();
        console.log("Notifikasi sukses dibuat!");
    });
}
