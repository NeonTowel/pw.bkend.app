import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { secureHeaders } from 'hono/secure-headers'
import { QuoteEngine } from './quotes/engine'
import { GameOfThronesQuoteProvider, RonSwansonQuoteProvider, DadJokeQuoteProvider, StarWarsQuoteProvider, LotrQuoteProvider } from './quotes/providers'
import { processQuoteWithVariations, PasswordVariations } from './processing'
import { cloudflareRateLimiter } from "@hono-rate-limiter/cloudflare";
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

type AppType = {
  Variables: {
    rateLimit: boolean;
  };
  Bindings: {
    QUOTE_RATE_LIMITER: RateLimit;
  };
};

const app = new Hono<AppType>().use(
  cloudflareRateLimiter<AppType>({
    rateLimitBinding: (c) => c.env.QUOTE_RATE_LIMITER,
    keyGenerator: (c) => c.req.header("cf-connecting-ip") ?? "",
  })
);

app.use(secureHeaders())
app.use(cors({
  origin: ['https://pw.neontowel.dev', 'http://localhost:5173', 'http://127.0.0.1:5173'],
  allowHeaders: ['Content-Type'],
  allowMethods: ['GET', 'OPTIONS'],
  credentials: false,
  maxAge: 3600
}))

app.get('/', (c) => {
  return c.text('hello.')
})

const route = app.get(
  '/v1/generate/:count?',
  zValidator(
    'param',
    z.object({
      count: z.string().regex(/^\d+$/).transform(Number).pipe(z.number().min(1).max(10)).optional(),
    })
  ),
  async (c) => {
    const { count = 1 } = c.req.valid('param');
    const quoteEngine = new QuoteEngine([
      new GameOfThronesQuoteProvider(),
      new RonSwansonQuoteProvider(),
      new DadJokeQuoteProvider(),
      new StarWarsQuoteProvider(),
      new LotrQuoteProvider(),
    ]);
    const results: { sentence: string, source: string, passwords: PasswordVariations }[] = [];

    while (results.length < count) {
      const quotes = await quoteEngine.getRandomQuotes(count - results.length);
      for (const quote of quotes) {
        if (results.length >= count) {
          break;
        }
        const variations = processQuoteWithVariations(quote.sentence);
        if (variations) {
          results.push({ sentence: quote.sentence, source: quote.source, passwords: variations });
        }
      }
    }

    if (results.length === 1 && count === 1) {
      return c.json(results[0]);
    }

    return c.json({ results });
  }
);


export default app
