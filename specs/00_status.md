# Portfolio Project - Work Summary & Final Status

**Last Updated:** May 2, 2026  
**Project:** Marrok Agency — Digital Product Agency for MENA SMBs  
**Status:** 🚀 RELAUNCH IN PROGRESS (Phases 1-3 Complete)

**Live URLs:**
- Public Portfolio: https://marrok.netlify.app
- Custom Domain: https://www.marrok.org (DNS pending)
- Admin Panel: https://marrok.netlify.app/admin (Google OAuth Protected)

---

### Phase 1 — Rebranding & Navigation
- [x] Renamed project to **Marrok Agency**
- [x] Updated **Navbar** with new agency links: Home, Work, Services, About, Blog, Contact
- [x] Changed all CTAs from "Hire Me" to **"Let's Talk"**
- [x] Removed individual CV download links from the header to focus on agency positioning

### Phase 2 — Homepage Relaunch
- [x] **Hero Section** — Updated with enterprise-quality messaging and 4-pillar sub-headline
- [x] **Value Props** — Built 4-column grid (Speed, Quality, Affordability, Partnership)
- [x] **Services Overview** — Built 2x2 grid highlighting Digital Strategy, Design, Dev, and End-to-End products
- [x] **Work Preview** — Refactored portfolio grid to "Work We're Proud Of" with 3 featured projects
- [x] **FAQ Section** — Built animated accordion with agency-specific Q&A
- [x] **Final CTA** — Replaced contact form with high-intent "Ready to Build?" section

### Phase 3 — Dedicated Agency Pages
- [x] **Services Page (`/services`)** — Detailed breakdown of 4 core offerings with deliverables and timelines
- [x] **Work Page (`/work`)** — Dedicated gallery for all case studies
- [x] **About Page (`/about`)** — Origin story, beliefs, and integrated credentials (legacy CV sections)
- [x] **Contact Page (`/contact`)** — Dedicated standalone page with updated "What brings you here?" dropdown
- [x] **Routing** — Fully transitioned from hash-links (#) to absolute page routing (/)

### Phase 3 — Google Authentication
- [x] Google OAuth 2.0 via NextAuth.js
- [x] Only `marrokmar@gmail.com` allowed (ADMIN_EMAILS env var)
- [x] JWT session strategy (compatible with serverless proxy)
- [x] Login page at `/admin/login` with "Continue with Google" button
- [x] Protected routes via `proxy.ts` using `getToken` from `next-auth/jwt`
- [x] Auto-redirect `/admin` → `/admin/dashboard`

### Phase 4 — Admin API Routes (20+ endpoints)
```
/api/admin/projects          GET, POST
/api/admin/projects/[id]     GET, PATCH, PUT, DELETE
/api/admin/skills            GET, POST
/api/admin/skills/[id]       PATCH, DELETE
/api/admin/experience        GET, POST
/api/admin/experience/[id]   PATCH, DELETE
/api/admin/messages          GET
/api/admin/messages/[id]     PATCH, DELETE
/api/admin/settings          GET, PATCH
/api/admin/upload            POST (image upload → /public/uploads/)

/api/public/projects         GET
/api/public/skills           GET
/api/public/experience       GET
/api/public/contact          POST
/api/auth/[...nextauth]      NextAuth handlers
```

### Phase 5 — Admin Dashboard UI (6 pages)
- [x] **Dashboard** — real DB stats (projects, skills, messages, unread), recent messages list, quick actions
- [x] **Projects** — table with category badge, status, edit/delete; links to create/edit pages
- [x] **Skills** — grouped by category, star ratings, add/edit modal, delete
- [x] **Experience** — timeline table, add/edit modal with date pickers and "current" toggle
- [x] **Messages** — expandable rows, mark read/unread, reply by email, delete
- [x] **Settings** — available for projects toggle, show contact form toggle, social links

### Phase 6 — Image Upload
- [x] Drag-and-drop upload zone in ProjectForm
- [x] Click to select file
- [x] Instant preview with change/remove overlay
- [x] POST to `/api/admin/upload` → saves to `/public/uploads/` with UUID filename
- [x] Validation: 2 MB max, image types only
- [x] Manual URL input fallback (paste any external URL)

### Phase 7 — Deployment (Netlify)
- [x] `netlify.toml` with `@netlify/plugin-nextjs`
- [x] Neon serverless PostgreSQL (free tier) as production database
- [x] All environment variables set in Netlify dashboard
- [x] Google OAuth callback URIs updated for production
- [x] Auto-deploy on push to `main` branch

---

## 🗄️ Database Schema (PostgreSQL / Neon)

```prisma
model User              // NextAuth — Google OAuth user
model Account           // NextAuth — OAuth account link
model Session           // NextAuth — session (database strategy)
model VerificationToken // NextAuth — email verification

model Project          // Portfolio projects
model Category         // Desktop / Web / Full-Stack / 3D Graphics
model Skill            // Technical skills with proficiency (1-5)
model Experience       // Career/education timeline
model ContactMessage   // Contact form submissions
model Setting          // Key-value store for portfolio settings
```

**Note:** `technologies`, `highlights`, `skills` arrays are stored as JSON strings
(SQLite migration origin — compatible with PostgreSQL).

---

## ⚙️ Tech Stack (Final, As Built)

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.4 (Turbopack) |
| UI | React 19.2.4 + TypeScript |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion 12 |
| Icons | Lucide React 1.11.0 |
| Forms | React Hook Form 7 + Zod 4 |
| Auth | NextAuth.js v4 + Google OAuth |
| ORM | Prisma 6.19.3 |
| Database | PostgreSQL via Neon (production) |
| Hosting | Netlify (with `@netlify/plugin-nextjs`) |
| Source Control | GitHub (`abdomarrok/abdomarrok.github.io`) |
| CI/CD | Netlify auto-deploy on git push |

---

## 🔐 Authentication & Security

- **Provider:** Google OAuth 2.0 only (no passwords)
- **Allowed email:** `marrokmar@gmail.com` (configurable via `ADMIN_EMAILS`)
- **Session:** JWT stored in HTTP-only cookie
- **Protected routes:** `/admin/*` and `/api/admin/*` via `proxy.ts`
- **Unauthorized redirect:** → `/admin/login`
- **API auth:** Every admin API route calls `getServerSession(authOptions)`
- **Input validation:** Zod on client forms, basic validation on API routes
- **SQL injection:** Prevented by Prisma parameterized queries
- **File uploads:** Type + size validation (images only, max 2 MB)

---

## 🌍 Environment Variables

```env
# Production (Netlify)
DATABASE_URL="postgresql://...neon.tech/neondb?sslmode=require"
GOOGLE_CLIENT_ID="409588541725-...apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-..."
NEXTAUTH_SECRET="df57bb..."
NEXTAUTH_URL="https://marrok.netlify.app"
ADMIN_EMAILS="marrokmar@gmail.com"

# Local (.env)
DATABASE_URL="postgresql://...neon.tech/neondb?sslmode=require"
NEXTAUTH_URL="http://localhost:3000"
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                          # Homepage (force-dynamic)
│   ├── layout.tsx                        # Root layout + metadata
│   ├── globals.css                       # Tailwind + Google Fonts import
│   ├── admin/
│   │   ├── page.tsx                      # Redirect → /admin/dashboard
│   │   ├── login/page.tsx                # Google OAuth login page
│   │   └── (protected)/
│   │       ├── layout.tsx                # Admin shell + sidebar
│   │       ├── dashboard/page.tsx        # Real-time stats dashboard
│   │       ├── projects/page.tsx         # Projects table
│   │       ├── projects/new/page.tsx     # Create project form
│   │       ├── projects/edit/[id]/       # Edit project form
│   │       ├── skills/page.tsx           # Skills management
│   │       ├── experience/page.tsx       # Experience management
│   │       ├── messages/page.tsx         # Messages inbox
│   │       └── settings/page.tsx        # Portfolio settings
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── admin/projects/route.ts + [id]/route.ts
│   │   ├── admin/skills/route.ts + [id]/route.ts
│   │   ├── admin/experience/route.ts + [id]/route.ts
│   │   ├── admin/messages/route.ts + [id]/route.ts
│   │   ├── admin/settings/route.ts
│   │   ├── admin/upload/route.ts
│   │   └── public/projects|skills|experience|contact/route.ts
│   └── projects/[id]/page.tsx            # Public project detail
│
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── admin/
│   │   ├── AdminSidebar.tsx
│   │   └── ProjectForm.tsx               # With drag-and-drop image upload
│   ├── projects/
│   │   ├── ProjectGrid.tsx
│   │   └── ProjectCard.tsx
│   ├── skills/SkillsSection.tsx
│   ├── experience/ExperienceTimeline.tsx
│   ├── certifications/CertificationsSection.tsx
│   ├── contact/ContactSection.tsx
│   └── providers/AuthProvider.tsx
│
├── lib/
│   ├── auth.ts       # NextAuth config (Google provider, JWT strategy)
│   ├── prisma.ts     # Prisma client singleton
│   ├── data.ts       # Public data fetchers
│   └── utils.ts      # cn() helper
│
└── proxy.ts          # Next.js 16 auth guard (replaces middleware.ts)

prisma/
├── schema.prisma     # PostgreSQL schema
├── seed.ts           # Portfolio seed data
└── migrations/       # Migration history

public/
├── uploads/          # Admin-uploaded project images
└── images/           # Static assets

netlify.toml          # Netlify deployment config
```

---

## 🐛 Key Issues Resolved During Development

| Issue | Root Cause | Fix |
|-------|-----------|-----|
| `middleware.ts` deprecation warning | Next.js 16 renamed it to `proxy.ts` | Migrated to `proxy.ts` |
| `technologies.map is not a function` | SQLite stores arrays as JSON strings | Added `JSON.parse()` in components |
| Google Fonts build failure | Network blocked in Algeria during build | Switched to CSS `@import` |
| `redirect_uri_mismatch` (×2) | Wrong callback URI in Google Console | Added correct HTTPS URIs |
| Vercel persistent 404 | Wrong Vercel project URL being visited + possible framework preset issue | Switched to Netlify |
| `DATABASE_URL="npm"` | Accidental .env corruption | Restored correct Neon URL |
| Prisma startup crash on Vercel | `DIRECT_URL` env var referenced but not set | Removed `directUrl` from schema |
| `channel_binding=require` | Not supported in some Neon configs | Removed from connection string |
| `withAuth` proxy incompatibility | next-auth middleware HOC incompatible with Next.js 16 proxy | Replaced with `getToken` |

---

## 📊 Seeded Data (Production)

| Table | Count | Content |
|-------|-------|---------|
| Categories | 3 | Desktop, Web, Full-Stack |
| Projects | 5 | GstockDz ERP, HK-Wireguard, School Manager, StoryForge, Payment Generator |
| Skills | 12 | Java, JavaFX, Spring Boot, MVVM, MySQL, SQLite, Security, React, Next.js, TypeScript, etc. |
| Experience | 5 | Engineer degree, self-employed, Master's, Bachelor's, Architecture |

---

## 🔗 Google OAuth Configuration

**Authorized redirect URIs in Google Cloud Console:**
```
http://localhost:3000/api/auth/callback/google    ← local dev
https://marrok.netlify.app/api/auth/callback/google  ← production
https://www.marrok.org/api/auth/callback/google   ← custom domain
```

---

## 🚀 What's Production-Ready

- ✅ Public portfolio (Hero, Projects, Skills, Experience, Certifications, Contact)
- ✅ Project detail pages with full metadata
- ✅ Admin panel with Google OAuth
- ✅ Full CRUD for all content types
- ✅ Image upload with preview
- ✅ Contact form stores messages in DB
- ✅ Deployed and live on Netlify
- ✅ PostgreSQL on Neon (persistent, serverless)
- ✅ Auto-deploy on every git push to main

## 🔮 Potential Future Enhancements

- [ ] Connect `www.marrok.org` DNS to Netlify
- [ ] Blog section (new DB table + pages)
- [ ] Project view counter (analytics)
- [ ] Email notifications for new contact messages (Nodemailer)
- [ ] Image CDN (Cloudinary) to replace local `/public/uploads/`
- [ ] Dark/light mode toggle
- [ ] Multiple language support (AR, FR, EN)
- [ ] Project video demo embed
