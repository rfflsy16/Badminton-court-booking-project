import cron from 'node-cron'
import AIController from './controllers/AiController.js';

cron.schedule("1 0 * * *", async () => {
    console.log("Cron job jalan: Bikin notifikasi otomatis...");
    await AIController.generateRecommendations();
    console.log("Notifikasi sukses dibuat!");
});

export default cron;