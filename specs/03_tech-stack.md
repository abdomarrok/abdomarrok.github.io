# Technology Stack
**Full-Stack Engineer** • Desktop • Web • Backend • 3D Graphics

## Dual Specialization

You work across **two distinct technology domains**:
1. **Enterprise Desktop** (JavaFX, Spring Boot)
2. **Modern Web Full-Stack** (Next.js, React, NestJS)

---

## Desktop Stack (JavaFX Enterprise)

### Frontend - Desktop UI
- **JavaFX 17+** - Modern desktop application framework
- **MVVM Architecture** - Separation of concerns and testability
- **FXML** - XML-based UI markup
- **CSS3** - Styling and animations
- **SceneBuilder** - Visual layout tool

### Backend - Java Enterprise
- **Spring Boot 2.x/3.x** - Application framework
- **Spring Data JPA** - Data access layer
- **Hibernate ORM** - Object-relational mapping
- **REST APIs** - JSON-based communication

### Database - Persistence
- **MySQL** - Primary relational database
- **SQLite** - Local/offline-first storage
- **JPA/Hibernate Annotations** - Database mapping

### Reporting & Export
- **JasperReports** - Advanced PDF/export reporting
- **iText/Apache PDFBox** - PDF manipulation
- **Apache POI** - Excel export

### Build & Deployment
- **Maven** - Build automation
- **JLink** - Modular runtime creation
- **JPackage** - Native installer generation
- **GitHub Actions** - CI/CD

### Security (Desktop)
- **Post-Quantum Cryptography** - Future-proof security
- **WireGuard** - VPN client integration
- **Java Security APIs** - Encryption
- **bcrypt** - Password hashing

---

## Modern Web Stack (Full-Stack TypeScript)

### Frontend - Web Applications

#### **Next.js 15/16** (Primary Framework)
- **React 19** - UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Next.js App Router** - File-based routing
- **Server Components** - Performance optimization
- **Async Route Params** - Required pattern for Next.js 15+ (awaiting params in APIs and Server Components)

#### **3D Graphics & Animation**
- **Three.js** - 3D rendering library
- **React Three Fiber** - React abstraction for Three.js
- **Motion** - Animation library (React animations)
- **Framer Motion** (when needed) - Advanced animations

#### **UI & Components**
- **Lucide React** - Icon library (modern icons)
- **CVA (Class Variance Authority)** - Component variants
- **React Hook Form** - Form management
- **Zod** - Schema validation (TypeScript-first)

#### **Data Visualization**
- **Recharts** - React chart library
- **Charts for dashboards** - Real-time data

#### **React Ecosystem**
- **React Router** (v7) - Client-side routing (when not using Next.js)
- **Vite** - Build tool alternative (for non-Next.js projects)
- **Axios** - HTTP client
- **React PDF Renderer** - PDF generation

### Backend - Node.js & NestJS

#### **Next.js** (Full-Stack)
- **API Routes** - Built-in backend
- **Server Actions** - RPC-like backend calls
- **Edge Functions** - Serverless compute

#### **NestJS 11** (Dedicated Backend)
- **TypeScript** - Type-safe backend
- **Express.js** - Underlying HTTP framework
- **Dependency Injection** - Clean architecture
- **Decorators** - Metadata-driven development
- **Testing** - Jest & Supertest integration

#### **Authentication & Security**
- **NextAuth v4** - Authentication for Next.js
- **Passport.js** - Flexible authentication for NestJS
- **Passport-JWT** - JWT strategy
- **bcryptjs/bcrypt** - Password hashing
- **Helmet** - HTTP security headers

#### **Database & ORM**
- **Prisma 6.x** - Type-safe ORM (primary choice)
- **Prisma Adapter for PostgreSQL** - Database integration
- **TiDB** - MySQL-compatible distributed database
- **PostgreSQL** - Primary relational database
- **MariaDB** - Alternative relational database
- **TypeScript Schemas** - End-to-end type safety

#### **Email & Communications**
- **Nodemailer** - Email sending
- **form-data** - Multipart form handling

#### **File Handling**
- **Multer** - File upload middleware
- **Sharp** - Image processing & optimization
- **browser-image-compression** - Client-side image compression

#### **AI Integration**
- **@google/genai** - Google Generative AI API
- **AI features** - LLM integration for intelligent features

### Database Layer

#### **Primary** 
- **PostgreSQL** - Enterprise-grade RDBMS
- **Prisma ORM** - Type-safe database access

#### **Alternative Databases**
- **TiDB** - MySQL-compatible distributed DB
- **MariaDB** - MySQL-compatible option
- **MySQL** - Legacy support

#### **Data Handling**
- **exceljs** - Excel file manipulation
- **xlsx** - Excel parsing and generation

---

## Build Tools & DevOps

### Frontend Build
- **Next.js** - Integrated build system
- **Vite** - Lightning-fast build tool
- **Tailwind CLI** - CSS compilation
- **PostCSS** - CSS transformations

### Backend Build & Execution
- **NestJS CLI** - Project scaffolding
- **tsx** - TypeScript execution
- **ts-node** - TypeScript runtime
- **TypeScript Compiler** - Type checking

### Testing & Quality

#### **Testing Frameworks**
- **Jest** - Unit & integration testing
- **Vitest** - Fast unit testing (Vite-native)
- **Supertest** - HTTP assertion library
- **Playwright** - E2E testing & browser automation
- **ts-jest** - Jest + TypeScript integration

#### **Code Quality**
- **ESLint** - Linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking
- **class-validator** - Runtime validation
- **class-transformer** - Object transformation

### Deployment & Hosting
- **Vercel** - Next.js hosting (optimal)
- **TiDB Cloud** - Database hosting
- **Docker** - Containerization
- **GitHub Actions** - CI/CD automation
- **Firebase** - Alternative deployment

---

## Utility & Helper Libraries

### Data Validation & Transformation
- **Zod** - Schema validation (TypeScript-first)
- **class-validator** - Decorator-based validation
- **class-transformer** - Object mapping

### HTTP & Networking
- **Axios** - Promise-based HTTP client
- **form-data** - Multipart form data
- **passport** - Extensible authentication

### UUID & Utilities
- **uuid** - Unique identifier generation
- **clsx** - Conditional CSS classes
- **tailwind-merge** - Merge Tailwind classes

---

## Development Tools & IDEs

### Primary IDEs
- **IntelliJ IDEA** - Desktop & full-stack development
- **VS Code** - Web development editor
- **Webstorm** (optional) - JavaScript IDE

### Version Control
- **Git** - Version control system
- **GitHub** - Repository hosting

### Database Tools
- **Prisma Studio** - Visual database explorer
- **pgAdmin** - PostgreSQL management (optional)

### API Development
- **Postman** - API testing
- **REST Client** - VS Code extension

---

## Project Tech Stack Summary

| Project | Type | Frontend | Backend | Database | Key Features |
|---------|------|----------|---------|----------|--------------|
| **chpub-web** | SPA | Vanilla JS | None | None | 3D Configurator, High-performance |
| **chpub_next** | Full-Stack | React 19, Next.js 15, Tailwind, 3D | Next.js API Routes | TiDB/PostgreSQL/Prisma | 3D Product Configurator, PDF Generation, Google GenAI, NextAuth |
| **immo_lamis** | Full-Stack | React 19, Vite, Axios | NestJS 11 | PostgreSQL/Prisma | Real Estate Management, JWT Auth, File Uploads |
| **Desktop Apps** | Desktop | JavaFX 17+ | Spring Boot | MySQL/SQLite | Enterprise Solutions, Offline-first, MVVM |

---

## Language & Type Safety

- **TypeScript** - Primary for web (type safety across full-stack)
- **Java** - Enterprise desktop applications
- **JavaScript** - Vanilla JS when needed
- **TypeScript Strict Mode** - Enforced in modern projects

---

## Performance & Optimization

### Frontend Optimization
- **Next.js Image Optimization** - Automatic image optimization
- **Code Splitting** - Lazy loading of components
- **CSS-in-JS** - Tailwind CSS tree-shaking
- **Sharp** - Server-side image optimization

### Backend Optimization
- **NestJS Interceptors** - Request/response transformation
- **Caching Strategies** - Performance optimization
- **Database Indexing** - Query optimization via Prisma

### End-to-End Performance
- **Lighthouse targets** - 90+ scores
- **Core Web Vitals** - Optimized
- **Edge deployment** - Vercel Edge Functions



## Future Stack Evolution (12 Month Plan)

### Immediate (1-3 months)
1. **Spring Boot 3.x & Virtual Threads**
   - Upgrade desktop apps to latest Spring Boot
   - Leverage virtual threads for improved performance

2. **Next.js Latest Features**
   - Next.js 16+ when stable
   - React 20+ compatibility
   - Server Actions optimization

3. **Advanced Testing**
   - E2E test coverage expansion
   - Performance testing framework
   - Load testing for backend

### Short Term (3-6 months)
1. **API Enhancement**
   - GraphQL alongside REST APIs
   - API versioning strategy
   - Rate limiting & throttling

2. **Microservices Architecture** (Desktop)
   - Event-driven architecture
   - Message queues (RabbitMQ, Apache Kafka)
   - Distributed tracing

3. **Advanced AI Integration**
   - LangChain integration
   - Vector databases (Pinecone, Weaviate)
   - ML model serving

### Medium Term (6-12 months)
1. **Mobile Support**
   - Kotlin Multiplatform for Android
   - React Native for cross-platform
   - Mobile backend optimization

2. **Real-Time Features**
   - WebSockets integration
   - Socket.io for live updates
   - Real-time collaboration

3. **Performance at Scale**
   - Redis caching layer
   - CDN optimization
   - Database sharding strategies

4. **Security Hardening**
   - OAuth2/OpenID Connect migration
   - Advanced encryption
   - Penetration testing

---

## Cross-Stack Competencies

### Architecture Patterns
- **MVVM** - Desktop UI architecture
- **Clean Architecture** - Backend separation
- **Component-Based Design** - React/Next.js
- **Microservices** - Distributed systems
- **Event-Driven** - Real-time systems

### Type Safety
- **TypeScript** - Full-stack type safety
- **Java Generics** - Type safety in desktop
- **Prisma Type Generation** - Database-to-frontend types
- **Zod Runtime Validation** - Runtime type checking

### Testing Strategies
- **Unit Testing** - Jest, Supertest
- **Integration Testing** - Database + API
- **E2E Testing** - Playwright, Cypress
- **Performance Testing** - Load & stress tests

### DevOps & Infrastructure
- **Git** - Version control
- **GitHub Actions** - CI/CD automation
- **Docker** - Containerization
- **Vercel** - Next.js deployment
- **Environment Management** - .env, secrets

---

## Technology Decision Framework

### When to Use What

**Choose Next.js/React for:**
- Real-time web applications
- SEO-important public-facing sites
- 3D configurators & visualizations
- Mobile-responsive designs
- Rapid prototyping

**Choose NestJS Backend for:**
- Complex business logic
- Microservices architecture
- Scalable API backends
- Team-based development
- Enterprise requirements

**Choose JavaFX Desktop for:**
- Offline-first applications
- High-performance UI
- System-level integrations
- Large data processing
- Native OS integration

---

## Technology Maturity

| Technology | Maturity Level | Production Ready | Usage |
|------------|----------------|------------------|-------|
| Next.js 15 | Very Stable | ✅ Yes | ACTIVE (Portfolio v2) |
| React 19 | Stable | ✅ Yes | ACTIVE (Portfolio v2) |
| TypeScript | Very Stable | ✅ Yes | ACTIVE (Portfolio v2) |
| NestJS 11 | Very Stable | ✅ Yes | Active (immo_lamis backend) |
| Prisma 6.x | Very Stable | ✅ Yes | ACTIVE (Portfolio v2) |
| TailwindCSS 4 | Stable | ✅ Yes | ACTIVE (Portfolio v2) |
| Three.js | Very Stable | ✅ Yes | Active (3D configurators) |
| JavaFX 17+ | Very Stable | ✅ Yes | Active (desktop apps) |
| Spring Boot 3.x | Very Stable | ✅ Yes | Active (desktop backends) |
| PostgreSQL | Very Stable | ✅ Yes | ACTIVE (Portfolio v2) |

---

## Performance Targets

### Web Applications
- **First Contentful Paint**: < 1 second
- **Time to Interactive**: < 3 seconds  
- **Largest Contentful Paint**: < 2.5 seconds
- **Cumulative Layout Shift**: < 0.1
- **Lighthouse Score**: > 90

### Desktop Applications
- **Application Startup**: < 3 seconds
- **UI Responsiveness**: < 100ms
- **Memory Usage**: < 200MB
- **Database Queries**: < 500ms

### Backend APIs
- **Response Time (p95)**: < 200ms
- **Response Time (p99)**: < 500ms
- **Throughput**: > 1000 req/sec
- **Uptime**: 99.9%

---

## Accessibility & Standards
- **WCAG 2.1 Level AA** - Web accessibility
- **HTML5 Semantic** - Proper markup
- **Keyboard Navigation** - Full keyboard support
- **Screen Readers** - Accessibility compliance
- **Mobile Responsive** - All devices
- **Cross-browser** - Chrome, Firefox, Safari, Edge

---

## Security Standards

### Application Security
- **OWASP Top 10** compliance
- **SQL Injection** prevention (Prisma, parameterized queries)
- **XSS** prevention (React escaping, CSP headers)
- **CSRF** protection
- **Rate Limiting** - API protection

### Data Security
- **Encryption at Rest** - Database encryption
- **Encryption in Transit** - TLS/SSL
- **Password Hashing** - bcrypt with salt
- **JWT Tokens** - Stateless auth
- **Secrets Management** - Environment variables

### Infrastructure Security
- **HTTPS/SSL** - Encrypted connections
- **Helmet.js** - HTTP security headers
- **CORS** - Cross-origin protection
- **DDoS** - Cloudflare protection
- **Monitoring** - Security alerts

---

## Summary: Your Unique Position

You are a **rare full-stack engineer** combining:
✅ **Enterprise Desktop Excellence** - JavaFX, Spring Boot, offline-first architecture
✅ **Modern Web Development** - Next.js, React 19, TypeScript
✅ **Advanced 3D Graphics** - Three.js, React Three Fiber, 3D configurators
✅ **Type-Safe Backend** - NestJS, Prisma, PostgreSQL
✅ **AI Integration** - Google GenAI, intelligent features
✅ **Production DevOps** - GitHub Actions, Vercel, Docker

This combination is uncommon and highly valuable in the market.
