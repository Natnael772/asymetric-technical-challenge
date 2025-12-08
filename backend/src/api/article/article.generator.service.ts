import { prisma } from '@/infrastructure/prisma/client.js';
import { huggingFaceService } from '../shared/hugging-face/hugging-face.service';

class ArticleGeneratorService {
  private aiAuthorId: string | null = null;

  async ensureAIAuthor(): Promise<string> {
    if (this.aiAuthorId) {
      return this.aiAuthorId;
    }

    const aiAuthorName = 'AI Writer';

    let author = await prisma.author.findFirst({
      where: { name: aiAuthorName },
    });

    if (!author) {
      author = await prisma.author.create({
        data: {
          name: aiAuthorName,
          bio: 'An AI-powered content creator generating insightful articles on technology and software development.',
          avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=aiwriter',
        },
      });
      console.log('✅ AI Writer author created');
    } else {
      console.log('✅ AI Writer author found');
    }

    this.aiAuthorId = author.id;
    return author.id;
  }

  getImageUrl(topic: string): string {
    // Generate a random image URL based on the topic keywords with loremflickr
    const keywords = topic.split(' ').slice(0, 2).join(',');
    return `https://loremflickr.com/800/400/${keywords},technology?random=${Date.now()}`;
  }

  calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  }

  async generateArticle(): Promise<void> {
    if (!huggingFaceService.isConfigured()) {
      console.warn('⚠️ HuggingFace API token not configured. Skipping article generation.');
      return;
    }

    try {
      const authorId = await this.ensureAIAuthor();

      // Generate dynamic topic using AI
      console.log('🤔 Generating interesting topic...');
      const topic = await huggingFaceService.generateTopic();

      console.log(`📝 Generating article about: "${topic}"...`);

      const { title, excerpt, content, tags } = await huggingFaceService.generateFullArticle(topic);
      console.log(`🏷️ Generated tags: ${tags.join(', ')}`);
      const readingTime = this.calculateReadingTime(content);
      const imageUrl = this.getImageUrl(topic);

      const article = await prisma.article.create({
        data: {
          title,
          excerpt,
          content,
          readingTime,
          imageUrl,
          publishedAt: new Date(),
          authorId,
          tags,
        },
      });

      console.log(`✅ Article generated: "${article.title}" (ID: ${article.id})`);
    } catch (error) {
      console.error('❌ Failed to generate article:', error);
    }
  }

  async seedInitialArticles(count: number = 3): Promise<void> {
    const existingCount = await prisma.article.count();

    if (existingCount >= count) {
      console.log(`📚 Already have ${existingCount} articles. Skipping seed.`);
      return;
    }

    const articlesToGenerate = count - existingCount;
    console.log(`📚 Seeding ${articlesToGenerate} initial articles...`);

    for (let i = 0; i < articlesToGenerate; i++) {
      await this.generateArticle();
      // Add small delay between generations (to avoid rate limiting)
      if (i < articlesToGenerate - 1) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    console.log('✅ Initial articles seeded successfully');
  }
}

export const articleGeneratorService = new ArticleGeneratorService();
