# Password Generator API

This is a Hono-based API running on Cloudflare Workers that generates memorable passwords from famous quotes.

## Features

- **Multiple Quote Sources**: Fetches quotes from a variety of internal and external sources, including:
  - Game of Thrones
  - Ron Swanson
  - I Can Haz Dad Joke
  - Star Wars
  - Lord of The Rings
- **Password Generation**: Transforms quotes into two different password formats:
  - **noSpaces**: A compact version with special character replacements (`a` -> `4`, `e` -> `3`, `i` -> `1`).
  - **hyphenated**: A memorable, hyphen-separated version with a unique character replacement rule for the last letter of each word.
- **Rate Limiting**: Implements rate limiting to ensure fair usage and protect the API from abuse.
- **Input Validation**: Uses Zod to sanitize and validate user input, enhancing API security.

## API Endpoint

### `GET /v1/generate/:count?`

Generates one or more passwords from random quotes.

- **`count`** (optional): The number of passwords to generate. Defaults to `1`, with a maximum value of `10`.

**Example Response (`/v1/generate/1`)**

```json
{
  "sentence": "I’m just a simple man trying to make my way in the universe.",
  "source": "Star Wars",
  "passwords": {
    "noSpaces": "I’mJustASimpl3M4nTryingToM4k3MyW4yInTh3Un1v3rs3#",
    "hyphenated": "I'm-Just-A-Simple-Man-Trying-To-Make-My-Way-In-The-Univers3#"
  }
}
```

## Getting Started

### Installation

```bash
bun install
```

### Development

```bash
bun dev
```

### Deployment

```bash
bun deploy
```

### Type Generation

To generate or synchronize types based on your Worker configuration, run:

```bash
bun cf-typegen
```

When instantiating `Hono`, pass the `CloudflareBindings` as a generic:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>();
```
