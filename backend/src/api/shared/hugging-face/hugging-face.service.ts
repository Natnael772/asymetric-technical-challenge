import { HfInference } from '@huggingface/inference';
import { config } from '@/config';

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

  async generateFullArticle(topic: string): Promise<{
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
  }> {
    const prompt = `
    Write a complete blog post about "${topic}".
    Return the result strictly as a valid JSON object with the following fields:
    {
      "title": "Catchy title",
      "excerpt": "2 sentence summary",
      "content": "Full article content (500-800 words) in Markdown format (use #, ##, -, *, etc.)",
      "tags": ["tag1", "tag2", "tag3"]
    }
    
    Ensure the content is engaging, informative, and well-structured.
    Do not include any markdown formatting (like \`\`\`json) outside the JSON object.
    `;

    const response = await this.generateTextWithRetry(prompt, 2000);

    try {
      // Clean the response to make sure it's valid JSON
      const jsonStr = this.cleanJsonOutput(response);
      const data = JSON.parse(jsonStr);

      return {
        title: this.cleanText(data.title || `Exploring ${topic}`),
        excerpt: this.cleanText(data.excerpt || `A guide to ${topic}`),
        content: data.content || `Content generation failed for ${topic}`,
        tags: Array.isArray(data.tags) ? data.tags.slice(0, 3) : ['Technology', 'Software'],
      };
    } catch (error) {
      console.error('Failed to parse AI response as JSON:', error);
      console.log('Raw response:', response);

      // Fallback if JSON parsing fails
      return {
        title: `Exploring ${topic}`,
        excerpt: `A comprehensive guide to ${topic}.`,
        content: `We are currently unable to generate the full content for this article. Please check back later.`,
        tags: ['Technology', 'Software'],
      };
    }
  }

  private cleanJsonOutput(text: string): string {
    // Remove markdown code blocks if present
    let clean = text.replace(/```json\n?|\n?```/g, '');
    // Find the first '{' and last '}' to extract just the JSON object
    const firstOpen = clean.indexOf('{');
    const lastClose = clean.lastIndexOf('}');

    if (firstOpen !== -1 && lastClose !== -1) {
      clean = clean.substring(firstOpen, lastClose + 1);
    }

    return clean;
  }

  async generateTopic(): Promise<string> {
    const prompt =
      'Generate a unique, specific, and interesting blog post topic about software engineering, web development, system design, or cloud computing. Only output the topic, nothing else.';
    const topic = await this.generateTextWithRetry(prompt, 50);
    return this.cleanText(topic) || 'The Future of Web Development';
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
    // Remove common artifacts from LLM output
    return text
      .replace(/^["']|["']$/g, '') // Remove surrounding quotes
      .replace(/^Title:\s*/i, '') // Remove "Title:" prefix
      .replace(/^Excerpt:\s*/i, '') // Remove "Excerpt:" prefix
      .replace(/^Article:\s*/i, '') // Remove "Article:" prefix
      .trim();
  }

  isConfigured(): boolean {
    return !!config.huggingfaceApiToken && config.huggingfaceApiToken !== '';
  }
}

export const huggingFaceService = new HuggingFaceService();
