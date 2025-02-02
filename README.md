# Flippr

Flippr is a simple, no-frills, no-ads loyalty card app.
It's built with [SvelteKit](https://kit.svelte.dev/), [TailwindCSS](https://tailwindcss.com/), and [Heroicons](https://heroicons.com/).

# Set up

Create an `.env` file in the root of the repository, following the `.env.example` file.

Build and start the application:

```
docker compose up -d
```

Seed the database (optional):

```
docker compose exec app pnpm run db:migrate 
docker compose exec app pnpm run db:seed
```

Open [localhost:5173](http://localhost:5173) in your browser.
If you seeded the database, you can log in with `admin`/`password` or `user`/`password`.

# License

The software is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
