# Nuxt 3 , openai minimal starter with function calling

I have created this simple starter to get up and running with a nuxt-openai base along with function calling. It uses [vercel AI SDK](https://github.com/vercel-labs/ai).

## Setup

To run the example locally you need to:

1. Sign up at [OpenAI's Developer Platform](https://platform.openai.com/signup).
2. Go to [OpenAI's dashboard](https://platform.openai.com/account/api-keys) and create an API KEY.
3. Set the required OpenAI environment variable as the token value as shown [the example env file](./.env.example) but in a new file called `.env`.
4. `pnpm install` to install the required dependencies.
5. `pnpm dev` to launch the development server.
   Make sure to install the dependencies:

## Production

Build the application for production:

```bash
# pnpm
pnpm run build
```

Locally preview production build:

```bash
# pnpm
pnpm run preview
```
