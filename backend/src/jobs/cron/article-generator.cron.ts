import cron from 'node-cron';
import { articleGeneratorService } from '../../modules/article/article.generator.service.js';

class SchedulerService {
  private dailyJob: ReturnType<typeof cron.schedule> | null = null;

  start(): void {
    // Schedule article generation at midnight every day (00:00)
    this.dailyJob = cron.schedule('0 0 * * *', async () => {
      console.log('⏰ Scheduled job triggered: Generating daily article...');
      await articleGeneratorService.generateArticle();
    });

    console.log('📅 Article scheduler started - will generate 1 article daily at midnight');
  }

  stop(): void {
    if (this.dailyJob) {
      this.dailyJob.stop();
      this.dailyJob = null;
      console.log('📅 Article scheduler stopped');
    }
  }

  // Manual trigger (for testing)
  async triggerNow(): Promise<void> {
    console.log('🔄 Manually triggering article generation...');
    await articleGeneratorService.generateArticle();
  }
}

export const schedulerService = new SchedulerService();
