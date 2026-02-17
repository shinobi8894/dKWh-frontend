# DTR Platform

Next.js application for the DTR (Delivery Transaction Rights) Platform landing experience.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command       | Description              |
|---------------|--------------------------|
| `npm run dev` | Start dev server         |
| `npm run build` | Production build       |
| `npm run start` | Start production server |
| `npm run lint`  | Run ESLint             |

## Project structure

- **`src/app/`** – Pages and root layout (Next.js App Router)
- **`src/components/`** – React components by feature (e.g. `landing/`)

Only **components** and **pages**. Icons from **lucide-react** only. Use the `@/` path alias (e.g. `@/components/landing`).
