import cron from 'node-cron'
import NotificationController from './controllers/NotificationController.js'

cron.schedule("0 2 * * *", async () => {
    console.log("Cron job jalan: Bikin notifikasi otomatis...");
    await NotificationController.generateAndSaveNotifications();
    console.log("Notifikasi sukses dibuat!");
});

export default cron;