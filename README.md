# Flippr

Flippr is a simple, no-frills, no-ads loyalty card app.
It's built with [SvelteKit](https://kit.svelte.dev/), [TailwindCSS](https://tailwindcss.com/), and [Heroicons](https://heroicons.com/).

# Set up

Create an `.env` file in the root of the project with the following content:

```
DATABASE_URL="postgres://postgres:postgres@localhost:5432/flippr"
```

Create a database:

```
docker compose up -d
docker compose exec postgres -U postgres createdb flippr
```

Install dependencies:

```
npm install
```

Seed the database (optional):

```
npm run db:seed
```

Run the app:

```
npm run dev
```

Open [localhost:5173](http://localhost:5173) in your browser.
If you seeded the database, you can log in with `admin`/`password` or `user`/`password`.

# License

The software is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
