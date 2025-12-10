import { articleGeneratorService } from '../../modules/article/article.generator.service.js';
import { huggingFaceService } from '../../modules/hugging-face/hugging-face.service.js';

class SeedService {
  async run(): Promise<void> {
    if (!huggingFaceService.isConfigured()) {
      console.warn('⚠️ HuggingFace API token not configured. Skipping article seeding.');
      console.warn(
        '   Set HUGGINGFACE_API_TOKEN in your .env file to enable AI article generation.'
      );
      return;
    }

    console.log('🌱 Running seed service...');

    // Ensure AI author exists and seed initial articles
    await articleGeneratorService.ensureAIAuthor();
    await articleGeneratorService.seedInitialArticles(3);

    console.log('🌱 Seed service completed');
  }
}

export const seedService = new SeedService();
