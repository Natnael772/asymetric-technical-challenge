import { HfInference } from '@huggingface/inference';
import { config } from '../../config/index.js';

class HuggingFaceService {
  private client: HfInference;
  private model: string = 'openai/gpt-oss-120b:fastest';

  constructor() {
    this.client = new HfInference(config.huggingfaceApiToken);
  }

  async generateText(prompt: string, maxTokens: number = 500): Promise<string> {
    try {
      const response = await this.client.chatCompletion({
        model: this.model,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: maxTokens,
        temperature: 0.7,
      });

      const content = response.choices[0]?.message?.content;
      return content?.trim() || '';
    } catch (error) {
      if (error instanceof Error) {
        console.error('HuggingFace API error:', error.message);
      } else {
        console.error('HuggingFace API error:', error);
      }
      throw new Error('Failed to generate text from HuggingFace API');
    }
  }

  // Generate Topic and Article
  async generateTopicAndArticle(): Promise<{
    topic: string;
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
  }> {
    const prompt = `
Generate a fresh and specific blog post topic in software engineering, web development, system design, or cloud computing.
Then write a complete blog post about that topic.

Return ONLY a valid JSON object with:

{
  "topic": "string",
  "title": "string",
  "excerpt": "2 sentence summary",
  "content": "500-800 word markdown article (#, ##, lists, etc)",
  "tags": ["tag1", "tag2", "tag3"]
}

NO explanations.
NO markdown fences like \`\`\`.
NO text outside the JSON.
    `;

    const response = await this.generateTextWithRetry(prompt, 2000);

    try {
      const jsonStr = this.cleanJsonOutput(response);
      const data = JSON.parse(jsonStr);

      return {
        topic: this.cleanText(data.topic || 'The Future of Web Development'),
        title: this.cleanText(data.title || 'Exploring Technology'),
        excerpt: this.cleanText(data.excerpt || 'A comprehensive guide.'),
        content:
          data.content ||
          'We are currently unable to generate the full content for this article. Please check back later.',
        tags: Array.isArray(data.tags) ? data.tags.slice(0, 3) : ['Technology', 'Software'],
      };
    } catch (error) {
      console.error('Failed to parse AI response as JSON:', error);
      console.log('Raw response:', response);

      return {
        topic: 'The Future of Web Development',
        title: 'Exploring Technology',
        excerpt: 'A comprehensive guide to technology.',
        content:
          'We are currently unable to generate the full content for this article. Please check back later.',
        tags: ['Technology', 'Software'],
      };
    }
  }

  private cleanJsonOutput(text: string): string {
    let clean = text.replace(/```json\n?|\n?```/g, '');
    const firstOpen = clean.indexOf('{');
    const lastClose = clean.lastIndexOf('}');

    if (firstOpen !== -1 && lastClose !== -1) {
      clean = clean.substring(firstOpen, lastClose + 1);
    }

    return clean;
  }

  private async generateTextWithRetry(
    prompt: string,
    maxTokens: number,
    retries: number = 2
  ): Promise<string> {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const result = await this.generateText(prompt, maxTokens);
        if (result && result.length > 0) {
          return result;
        }
        console.warn(`Empty response on attempt ${attempt + 1}, retrying...`);
      } catch {
        if (attempt === retries) {
          console.error(`Failed after ${retries + 1} attempts`);
          return '';
        }
        console.warn(`Attempt ${attempt + 1} failed, retrying...`);
        // Small delay before retry
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    return '';
  }

  private cleanText(text: string): string {
    // Remove common artifacts (prefixes) from LLM output
    return text
      .replace(/^["']|["']$/g, '')
      .replace(/^Title:\s*/i, '')
      .replace(/^Excerpt:\s*/i, '')
      .replace(/^Article:\s*/i, '')
      .trim();
  }

  isConfigured(): boolean {
    return !!config.huggingfaceApiToken && config.huggingfaceApiToken !== '';
  }
}

export const huggingFaceService = new HuggingFaceService();
