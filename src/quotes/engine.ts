import { Quote, QuoteProvider } from './providers';

export class QuoteEngine {
  private providers: QuoteProvider[];

  constructor(providers: QuoteProvider[]) {
    this.providers = providers;
  }

  async getRandomQuote(): Promise<Quote & { source: string }> {
    const provider = this.providers[Math.floor(Math.random() * this.providers.length)];
    const quote = await provider.getQuote();
    return { ...quote, source: provider.name };
  }

  async getRandomQuotes(count: number): Promise<(Quote & { source: string })[]> {
    const quotes: (Quote & { source: string })[] = [];
    for (let i = 0; i < count; i++) {
      const provider = this.providers[Math.floor(Math.random() * this.providers.length)];
      const quote = await provider.getQuote();
      quotes.push({ ...quote, source: provider.name });
    }
    return quotes;
  }
} 