# Admin Panel Implementation Plan (UPDATED)
## Next.js 15 Full-Stack Portfolio with Content Management

**Updated:** April 30, 2026  
**Authentication:** Google OAuth (Passwordless)  
**Database:** SQLite (Zero-config, file-based)  
**Framework:** Next.js 15 + React 19 + TypeScript

---

## 🔐 Authentication: Google OAuth (Updated)

### Why Google OAuth?
- ✅ **Zero password management** - No storing, hashing, or resetting passwords
- ✅ **Industry standard** - Trusted by billions of users
- ✅ **Multi-factor authentication** - Free if user has Google 2FA enabled
- ✅ **Automatic account security** - Google's security team manages it
- ✅ **Seamless experience** - One-click login
- ✅ **Easy to implement** - NextAuth.js handles everything

### Google OAuth Flow
```
┌─────────────────────────────────────┐
│  User clicks "Login with Google"    │
└────────────┬────────────────────────┘
             ↓
┌─────────────────────────────────────┐
│  Redirect to Google OAuth Screen    │
└────────────┬────────────────────────┘
             ↓
┌─────────────────────────────────────┐
│  User approves access               │
└────────────┬────────────────────────┘
             ↓
┌─────────────────────────────────────┐
│  Google redirects with auth code    │
└────────────┬────────────────────────┘
             ↓
┌─────────────────────────────────────┐
│  /api/auth/callback/google[?code]  │
│  ├─ Exchange code for ID token      │
│  ├─ Extract email & profile         │
│  ├─ Verify email is authorized      │
│  └─ Create/update admin_user        │
└────────────┬────────────────────────┘
             ↓
┌─────────────────────────────────────┐
│  Create JWT session                 │
│  ├─ Generate token                  │
│  ├─ Set HTTP-only cookie            │
│  └─ Redirect to /admin/dashboard    │
└─────────────────────────────────────┘
```

### Setup Steps
1. Create Google Cloud Project
2. Create OAuth 2.0 credentials (Web application)
3. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google`
4. Copy Client ID & Client Secret to `.env.local`
5. Configure NextAuth.js to use Google provider

### Code Example
```typescript
// auth.config.ts
import Google from "next-auth/providers/google";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // Only allow specific email addresses
    async signIn({ user, account, profile }) {
      const allowedEmails = [
        "your-email@gmail.com",
        // Add more admin emails here
      ];
      return allowedEmails.includes(user.email);
    },
  },
};
```

---

## 🗄️ Database: SQLite (Updated)

### Why SQLite?
- ✅ **Zero configuration** - No database server to set up
- ✅ **File-based** - Stored in `db.sqlite` in your project
- ✅ **Perfect for portfolios** - Lightweight, fast enough for your use case
- ✅ **Easy backups** - Just copy the file
- ✅ **No hosting costs** - Stored locally or in Vercel's ephemeral filesystem
- ✅ **Development to production** - Same database everywhere
- ✅ **Prisma integration** - Works seamlessly with Prisma ORM

### SQLite vs PostgreSQL (Comparison)

| Factor | SQLite | PostgreSQL |
|--------|--------|-----------|
| Setup | 0 minutes | 30 minutes |
| Cost | $0 | $5-30/month |
| Configuration | None | Database URL needed |
| Backups | Copy file | Database dumps |
| Scalability | 1-100 concurrent | 100+ concurrent |
| For this project? | ✅ Perfect | ⚠️ Overkill |

### SQLite Storage Options

**Option 1: Local Development**
```
Project structure:
abdomarrok-portfolio/
├── prisma/
│   └── dev.db          # Local SQLite file
├── app/
├── package.json
└── .env.local
```

**Option 2: Vercel Postgres with SQLite fallback**
```
Local: SQLite (fast development)
Production: Vercel Postgres (optional, can use SQLite)

Or just use SQLite everywhere!
```

**Option 3: Turso SQLite (Cloud)**
```
If you want cloud SQLite with replication:
- https://turso.tech (free tier available)
- SQLite replicated across regions
- Global read-only replicas
- But for portfolio, not necessary
```

**Recommendation: Store SQLite file locally**
- Keep it in version control with `.gitignore` to avoid conflicts
- Or keep a base `.sqlite` and ignore instance changes
- When deployed to Vercel, Vercel stores it in `/tmp` (temporary)
- For persistent storage, use Vercel Postgres as fallback

### Prisma SQLite Configuration
```typescript
// prisma/schema.prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

// .env.local
DATABASE_URL="file:./prisma/dev.db"
```

---

## 🗄️ Database Schema (SQLite)

### Core Tables

#### `projects` Table
```prisma
model Project {
  id                String    @id @default(cuid())
  title             String
  description       String    @db.Text
  longDescription   String?   @db.Text
  
  // Visual
  imageUrl          String?
  thumbnailUrl      String?
  
  // Categorization
  category          Category  @relation(fields: [categoryId], references: [id])
  categoryId        String
  technologies      String[]  // JSON: ["React", "Next.js", "TypeScript"]
  
  // Content
  highlights        String[]  // Key features
  metrics           String?   // JSON: { "lines_of_code": 5000 }
  
  // Links
  liveUrl           String?
  githubUrl         String?
  demoUrl           String?
  
  // Status
  featured          Boolean   @default(false)
  published         Boolean   @default(true)
  order             Int       @default(0)
  
  // Timestamps
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@index([categoryId])
}

model Category {
  id        String    @id @default(cuid())
  name      String    @unique
  slug      String    @unique
  color     String?
  projects  Project[]
}

model Skill {
  id          String    @id @default(cuid())
  name        String    @unique
  category    String    // "Frontend", "Backend", "Database", "Tools"
  proficiency Int       // 1-5 scale
  icon        String?
  description String?
  color       String?
  order       Int       @default(0)
  
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Experience {
  id          String    @id @default(cuid())
  title       String
  company     String?
  type        String    // "job", "education", "achievement"
  description String    @db.Text
  startDate   DateTime
  endDate     DateTime?
  current     Boolean   @default(false)
  
  skills      String[]  // Related skills
  order       Int       @default(0)
  
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model ContactMessage {
  id        String    @id @default(cuid())
  name      String
  email     String
  subject   String
  message   String    @db.Text
  read      Boolean   @default(false)
  
  createdAt DateTime  @default(now())
}

model AdminUser {
  id        String    @id @default(cuid())
  email     String    @unique  // Google email
  name      String?   // From Google profile
  image     String?   // From Google profile
  role      String    @default("editor")  // "admin", "editor"
  
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

### Why This Schema Works
- ✅ Fully normalized (no duplicates)
- ✅ Indexes on foreign keys for performance
- ✅ JSON fields for flexible data (technologies, metrics, skills)
- ✅ Timestamps for audit trail
- ✅ Soft deletes not needed (just use `published` flag)

---

## 🎛️ Admin Panel Pages (7 Pages)

### 1. Login Page (`/admin/login`)
```
┌───────────────────────────────────┐
│         Admin Login               │
├───────────────────────────────────┤
│                                   │
│   [Google Logo] Login with Google │
│                                   │
│   Or sign in with email/password  │
│   Email: [_______________]        │
│   Password: [_______________]     │
│                                   │
│   [Sign In]                       │
│                                   │
└───────────────────────────────────┘
```

### 2. Dashboard (`/admin`)
```
┌────────────────────────────────────────┐
│  Marrok's Portfolio Admin              │
├────────────────────────────────────────┤
│                                        │
│  📊 Quick Stats                        │
│  ├─ Projects: 5                        │
│  ├─ Skills: 28                         │
│  ├─ Messages: 3 unread                 │
│  └─ Last updated: 2 hours ago          │
│                                        │
│  📧 Recent Messages                    │
│  ├─ John: "Great work on GstockDz"    │
│  ├─ Sarah: "Available for projects?"  │
│  └─ [View all 5 messages]              │
│                                        │
│  ⚡ Quick Actions                      │
│  ├─ [+ Add Project]                    │
│  ├─ [+ Add Skill]                      │
│  └─ [View Analytics]                   │
│                                        │
└────────────────────────────────────────┘
```

### 3. Projects Management (`/admin/projects`)
```
┌──────────────────────────────────────────┐
│ Projects                   [+ Add Project]│
├──────────────────────────────────────────┤
│ [All] [Featured] [Drafts] [Search...]    │
├──────────────────────────────────────────┤
│ Title         │ Category  │ Status │ Acts │
├──────────────────────────────────────────┤
│ GstockDz      │ Desktop   │ ✓      │ ✏️ 🗑️│
│ chpub_next    │ Web       │ ✓      │ ✏️ 🗑️│
│ immo_lamis    │ Full      │ ✓      │ ✏️ 🗑️│
│ New Project   │ Web       │ ◯      │ ✏️ 🗑️│
└──────────────────────────────────────────┘
```

**Add/Edit Project Modal:**
```
Title: [_________________________]
Category: [Desktop ▼]

Description (short):
[_________________________________]

Long Description:
[__________________________________
 __________________________________]

Technologies:
[React] [TypeScript] [Tailwind] [X]
[+ Add Technology]

Images:
  Thumbnail: [Upload] 📷
  Gallery: [Upload Multiple] 📷📷

Links:
  Live: [https://...]
  GitHub: [https://...]
  Demo: [https://...]

Featured: [☑ Yes]
Published: [☑ Yes]
Order: [1]

[Save] [Preview] [Cancel]
```

### 4. Skills Management (`/admin/skills`)
```
┌─────────────────────────────────────┐
│ Skills              [+ Add Skill]    │
├─────────────────────────────────────┤
│ Category: [All ▼]                   │
├─────────────────────────────────────┤
│ Skill      │ Category  │ Level │ Acts│
├─────────────────────────────────────┤
│ React      │ Frontend  │ ★★★★★│ ✏️ 🗑️│
│ TypeScript │ Frontend  │ ★★★★★│ ✏️ 🗑️│
│ Next.js    │ Frontend  │ ★★★★★│ ✏️ 🗑️│
│ PostgreSQL │ Database  │ ★★★★☆│ ✏️ 🗑️│
└─────────────────────────────────────┘
```

### 5. Experience Timeline (`/admin/experience`)
```
┌─────────────────────────────────────┐
│ Experience          [+ Add Item]     │
├─────────────────────────────────────┤
│ Timeline View | List View            │
├─────────────────────────────────────┤
│ 2024 → Ingénieur d'État (Current)   │
│ 2021 → Self-Employed Developer      │
│ 2021 → Master's Degree (M'sila)     │
│ 2018 → Bachelor's Degree (M'sila)   │
│ 2016 → Architecture Background      │
└─────────────────────────────────────┘
```

### 6. Messages (`/admin/messages`)
```
┌──────────────────────────────────────┐
│ Messages            Unread: 3         │
├──────────────────────────────────────┤
│ From    │ Subject    │ Date   │ Acts │
├──────────────────────────────────────┤
│ John    │ Hiring     │ 2h ago │ ⊕ 🗑️│
│ Sarah   │ Collab     │ 1d ago │ ⊕ 🗑️│
│ Mike    │ Question   │ 2d ago │ ⊕ 🗑️│
└──────────────────────────────────────┘
```

### 7. Settings (`/admin/settings`)
```
┌────────────────────────────────────┐
│ Settings                           │
├────────────────────────────────────┤
│ Portfolio Status:                  │
│   ☑ Available for Projects         │
│   ☑ Show Contact Form              │
│                                    │
│ Social Links:                      │
│   GitHub: [https://github.com/...] │
│   LinkedIn: [https://linkedin/..]  │
│   Twitter: [https://twitter.com/]  │
│                                    │
│ Admin Users:                       │
│   marrok@gmail.com (Admin)         │
│   [+ Add Admin User]               │
│                                    │
│ [Save Changes]                     │
└────────────────────────────────────┘
```

---

## 🔌 API Routes (20+ Endpoints)

```
/app/api/
├── auth/
│   ├── signin                      [GET]     - Google auth page
│   ├── callback/google             [GET]     - OAuth callback
│   ├── session                     [GET]     - Check session
│   └── signout                     [POST]    - Logout
│
├── admin/
│   ├── projects/
│   │   ├── route.ts   [GET, POST]  - List/Create
│   │   └── [id]/route.ts [GET, PATCH, DELETE]
│   │
│   ├── skills/
│   │   ├── route.ts   [GET, POST]
│   │   └── [id]/route.ts [GET, PATCH, DELETE]
│   │
│   ├── experience/
│   │   ├── route.ts   [GET, POST]
│   │   └── [id]/route.ts [GET, PATCH, DELETE]
│   │
│   ├── messages/
│   │   ├── route.ts   [GET]
│   │   └── [id]/route.ts [PATCH, DELETE]
│   │
│   ├── settings/
│   │   └── route.ts   [GET, PATCH]
│   │
│   └── upload/
│       └── route.ts   [POST]       - File upload
│
└── public/
    ├── projects      [GET]         - Public projects
    ├── skills        [GET]         - Public skills
    ├── experience    [GET]         - Public timeline
    └── contact       [POST]        - Contact form
```

---

## 📁 Project Structure

```
abdomarrok-portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Home
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   │
│   ├── admin/
│   │   ├── login/page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx                # Dashboard
│   │   ├── projects/
│   │   ├── skills/page.tsx
│   │   ├── experience/page.tsx
│   │   ├── messages/page.tsx
│   │   └── settings/page.tsx
│   │
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── admin/projects/route.ts
│       ├── admin/projects/[id]/route.ts
│       ├── admin/skills/route.ts
│       ├── admin/experience/route.ts
│       ├── admin/messages/route.ts
│       ├── admin/settings/route.ts
│       ├── admin/upload/route.ts
│       └── public/...
│
├── components/
│   ├── admin/
│   │   ├── Sidebar.tsx
│   │   ├── ProjectForm.tsx
│   │   ├── SkillForm.tsx
│   │   ├── DataTable.tsx
│   │   └── UploadZone.tsx
│   │
│   └── public/
│       ├── Hero.tsx
│       ├── ProjectCard.tsx
│       └── SkillGrid.tsx
│
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── validation.ts               # Zod schemas
│   └── utils.ts
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   ├── seed.ts
│   └── dev.db                      # SQLite database file
│
├── .env.local
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## 📋 7-Phase Implementation Roadmap

### Phase 1: Setup & Database (1 week)
- [ ] Create Next.js 15 project
- [ ] Install Prisma, NextAuth, Tailwind
- [ ] Create Prisma schema (SQLite)
- [ ] Run migrations
- [ ] Create seed script
- [ ] Set up Google OAuth credentials

**Deliverables:** Working development environment

### Phase 2: Public Pages (1.5 weeks)
- [ ] Create all public pages
- [ ] Build reusable components
- [ ] Add Tailwind styling
- [ ] Implement animations
- [ ] SEO optimization

**Deliverables:** Full public portfolio

### Phase 3: Google Authentication (1 week)
- [ ] Configure NextAuth.js for Google
- [ ] Create login page
- [ ] Implement session handling
- [ ] Protect admin routes
- [ ] Add logout

**Deliverables:** Secure authentication

### Phase 4: Admin API Routes (1 week)
- [ ] Create all API endpoints
- [ ] Add validation (Zod)
- [ ] Implement error handling
- [ ] Add file upload handling
- [ ] Test all endpoints

**Deliverables:** Complete backend

### Phase 5: Admin Dashboard UI (1.5 weeks)
- [ ] Build all admin pages
- [ ] Create forms & modals
- [ ] Add data tables
- [ ] Implement loading states
- [ ] Style with Tailwind

**Deliverables:** Full admin interface

### Phase 6: Testing & Polish (1 week)
- [ ] Unit tests (Jest)
- [ ] E2E tests (Playwright)
- [ ] Performance optimization
- [ ] Security audit
- [ ] Bug fixes

**Deliverables:** Production-ready code

### Phase 7: Deployment (3 days)
- [ ] Deploy to Vercel
- [ ] Configure CI/CD
- [ ] Set up monitoring
- [ ] Database backups
- [ ] Create first admin account

**Deliverables:** Live at https://yourdomain.com

---

## 🔒 Security Features (Google OAuth)

### Automatic Security from Google
- ✅ 2FA if user has Google 2FA enabled
- ✅ Recovery codes backup
- ✅ Security key support
- ✅ Phishing & malware protection
- ✅ IP reputation checking

### Application Security
- ✅ JWT tokens (short-lived: 15 min)
- ✅ Refresh tokens (7 days)
- ✅ HTTP-only cookies (cannot be accessed by JS)
- ✅ CSRF protection (NextAuth built-in)
- ✅ Rate limiting on API endpoints
- ✅ Input validation (Zod schemas)
- ✅ SQL injection prevention (Prisma parameterized queries)

### Data Protection
- ✅ All traffic HTTPS (enforced by Vercel)
- ✅ SQLite database encrypted at rest (Vercel)
- ✅ File uploads validated & scanned
- ✅ Contact messages encrypted
- ✅ Admin actions logged

---

## ⚡ Performance Optimizations

### Frontend
- Next.js automatic code splitting
- Image optimization (Next.js Image)
- CSS minification (Tailwind)
- Route prefetching
- Lazy loading components

### Backend
- Database indexes on frequently queried fields
- Caching strategies (Next.js ISR)
- Vercel Edge Functions (optional)
- Request deduplication

### Database (SQLite)
- Indexes on `categoryId`, `email`
- Query optimization via Prisma
- Connection pooling (Prisma)
- Automatic VACUUM

---

## 💾 Data Persistence

### Local Development
```
abdomarrok-portfolio/
├── prisma/
│   └── dev.db              # Local SQLite file
```

When you run `npm run dev`, data is stored locally.

### Production (Vercel)

**Option A: File-based (Simple)**
```
SQLite file stored on Vercel's filesystem
Persists between deployments
Simple, no external services
```

**Option B: Turso SQLite (Advanced)**
```
Cloud-hosted SQLite with replication
Global read-only replicas
Automatic backups
If file-based doesn't work reliably
```

For a portfolio, file-based is perfect. No external costs.

---

## 📊 Environment Variables

```env
# .env.local

# Google OAuth
GOOGLE_CLIENT_ID="xxxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="xxxxx"

# NextAuth
NEXTAUTH_SECRET="generate-with-openssl-rand-hex-32"
NEXTAUTH_URL="http://localhost:3000"  # or https://domain.com

# Database
DATABASE_URL="file:./prisma/dev.db"

# Allowed admin emails (comma-separated)
ADMIN_EMAILS="your-email@gmail.com,other-admin@gmail.com"
```

---

## ✅ Tech Stack Final

### Frontend
- ✅ **Next.js 15**
- ✅ **React 19**
- ✅ **TypeScript**
- ✅ **Tailwind CSS 4**
- ✅ **Framer Motion**
- ✅ **React Hook Form**
- ✅ **Zod validation**

### Backend
- ✅ **Next.js API Routes**
- ✅ **NextAuth.js** (Google OAuth)
- ✅ **Prisma ORM**
- ✅ **SQLite Database**

### DevOps
- ✅ **Vercel** (hosting + auto-deploy)
- ✅ **GitHub** (source control)
- ✅ **GitHub Actions** (CI/CD)

### Testing
- ✅ **Jest** (unit tests)
- ✅ **Playwright** (E2E tests)

---

## 🎯 Summary

| Aspect | Specification |
|--------|---------------|
| **Framework** | Next.js 15 + React 19 + TypeScript |
| **Styling** | Tailwind CSS 4 |
| **Database** | SQLite (file-based) |
| **Auth** | Google OAuth (NextAuth.js) |
| **Backend** | Next.js API Routes |
| **Hosting** | Vercel |
| **CI/CD** | GitHub Actions |
| **Timeline** | 6-8 weeks |
| **Effort** | 150-200 hours |
| **Admin Pages** | 7 + Login |
| **API Endpoints** | 20+ |
| **Database Tables** | 6 |
| **Type Safety** | Full (TypeScript end-to-end) |
| **Cost** | $0 (Vercel free tier) |

---

## 🚀 Ready to Begin?

**Phase 1 involves:**
1. Creating Next.js project
2. Installing dependencies
3. Setting up Prisma + SQLite
4. Creating database schema
5. Configuring Google OAuth

**Expected output:** Development environment ready to code.

**Next Action:** Confirm to proceed with Phase 1 setup.
