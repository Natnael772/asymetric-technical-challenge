import { createApp } from './app.js';
import { config } from './config/index.js';
import { schedulerService } from './jobs/cron/article-generator.cron.js';
import { seedService } from './jobs/seed/article.seed.js';

const app = createApp();

app.listen(config.port, async () => {
  console.log(`🚀 Server running on http://localhost:${config.port}`);
  console.log(`📚 Swagger docs: http://localhost:${config.port}/api-docs`);

  // Seed initial articles and start scheduler
  await seedService.run();
  schedulerService.start();
});
