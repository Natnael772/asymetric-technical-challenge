import { createApp } from './app.js';
import { config } from './config/index.js';
import { seedService } from './scripts/seed/article-seed.service.js';
import { schedulerService } from './infrastructure/scheduler/article.scheduler';

const app = createApp();

app.listen(config.port, async () => {
  console.log(`🚀 Server running on http://localhost:${config.port}`);
  console.log(`📚 Swagger docs: http://localhost:${config.port}/api-docs`);

  // Seed initial articles and start scheduler
  await seedService.run();
  schedulerService.start();
});
