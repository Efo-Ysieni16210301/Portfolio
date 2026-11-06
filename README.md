# Getahun Guadie Mamo — Portfolio

A responsive Next.js portfolio and private content studio. Update the public
site from `/admin`—no component edits needed. The studio supports rich-text
formatting, editable experience and skills, contact links, and project drafts
that can be published, hidden, featured, or removed.

## Run locally

```bash
npm install
Copy-Item .env.example .env.local
```

Set the environment variables described below, then start the app:

```bash
npm run dev
```

Visit http://localhost:3000 and open http://localhost:3000/admin to sign in.

## Supabase database and admin login

1. In Supabase, open **Connect** and copy both the **Transaction pooler** and
   **Direct connection** strings. Use the exact pooler host Supabase provides.
2. Set `DATABASE_URL` to the Transaction pooler URL for app requests. It uses
   port `6543` and should include `pgbouncer=true` (as shown in `.env.example`).
   This is the recommended choice for serverless deployments such as Vercel.
3. Set `DIRECT_URL` to the Direct connection URL for Prisma CLI commands such
   as migrations. If your network cannot reach Supabase's direct IPv6 endpoint,
   use the **Session pooler** URL on port `5432` for `DIRECT_URL`. Do not use
   the Transaction pooler for migrations.
4. Set `ADMIN_USERNAME` and `ADMIN_PASSWORD` to your own unique credentials.
   Use a long, unique password. Never commit these values or share them in chat.
5. Generate a random secret of at least 32 characters for `ADMIN_SESSION_SECRET`.
   For example, run `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`.
6. Add all five variables to `.env.local` for local development. Prisma CLI
   reads `DIRECT_URL` from this file via `prisma.config.ts`.
7. Create a separate development database/project. Set both URLs in
   `.env.local` to that development database, then create and apply the initial
   migration:

   ```bash
   npm run db:migrate:dev -- --name init
   ```

   Commit the generated `prisma/migrations/` folder with your code. For future
   schema changes, update `prisma/schema.prisma` and run
   `npm run db:migrate:dev -- --name describe_change` against the development
   database.
8. Apply committed migrations to production from your computer: temporarily
   set `DIRECT_URL` in `.env.local` to the production project's Direct (or
   Session pooler) URL, then run:

   ```bash
   npm run db:migrate:deploy
   ```

   Restore the development URL afterwards. This command applies existing
   migration files; it does not create migrations.
9. In Vercel, add only the four runtime variables: production
   `DATABASE_URL` (Transaction pooler), `ADMIN_USERNAME`, `ADMIN_PASSWORD`,
   and `ADMIN_SESSION_SECRET`. Keep `DIRECT_URL` local; database migrations
   are run separately and do not need to be part of the Vercel build.
10. Do not expose database URLs, passwords, or the session secret through
    `NEXT_PUBLIC_*` variables.

`npm run db:push` remains available for disposable prototypes, but it does not
create migration history. Prefer the migration commands above for ongoing
development and production deployments.

The public portfolio renders its starter content before a database is
configured. The admin editor requires the database and credentials and shows
an error rather than pretending a save succeeded. Once configured, changes
are stored in PostgreSQL and shown to all visitors.

## Content studio

- **Rich text:** format introductions, project descriptions, and experience
  details with headings, emphasis, links, and lists.
- **Projects:** add new projects, edit links and technologies, mark a project
  featured, or hide it from the public site without deleting its draft.
- **Other sections:** edit your introduction, about story, experience,
  skills, contact methods, résumé link, image URL, site identity, and footer.
- **Résumé and portrait:** place a résumé PDF or image in `public/` and enter
  its site-relative path, such as `/resume.pdf` or `/avatar.png`.
- **Security:** admin credentials stay in server environment variables. Admin
  sessions are signed, `HttpOnly`, and expire after eight hours. Rich text is
  sanitized on the server before it is stored or rendered.

## Stack

- Next.js 16 App Router, React 19, and TypeScript
- Tailwind CSS v4 plus a custom responsive visual system
- Framer Motion and lucide-react
- Supabase PostgreSQL via Prisma
- Tiptap rich-text editing and server-side HTML sanitization
