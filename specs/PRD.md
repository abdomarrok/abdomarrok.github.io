# Product Requirements Document (PRD)
## Marrok Abderrahmane Portfolio - Version 2.0

## Executive Summary
This PRD defines the enhanced portfolio website designed to showcase **full-stack software engineering expertise** across desktop, web, backend, and 3D graphics domains. The portfolio attracts versatile engineers capable of building enterprise solutions using both traditional Java and modern TypeScript technology stacks.

---

## 1. Product Overview

### 1.1 Purpose
A professional portfolio website that serves as:
- **Credibility Hub:** Display enterprise-grade projects across desktop, web, backend, and emerging tech
- **Lead Generator:** Attract clients needing **full-stack solutions** (not confined to single technology domain)
- **Professional Brand:** Establish reputation as a **rare, versatile engineer**
- **Technical Portfolio:** Showcase expertise in:
  - **Desktop:** JavaFX 17+, Spring Boot, MVVM, offline-first architecture
  - **Web:** React 19, Next.js 15, TypeScript, Tailwind CSS, Server Components
  - **Backend:** NestJS, Prisma, PostgreSQL, authentication, APIs
  - **3D Graphics:** Three.js, React Three Fiber (product configurators)
  - **AI Integration:** Google GenAI APIs

### 1.2 Target Users

**Primary:**
- Enterprise CIOs/CTOs seeking **full-stack solutions** for complex projects
- Tech startups needing engineers who can own multiple system layers
- Companies modernizing legacy desktop apps to web/cloud platforms
- Businesses requiring sophisticated 3D visualization (product configurators)

**Secondary:**
- Tech leads evaluating engineer capabilities
- Potential employers seeking senior full-stack engineers
- Development teams in need of architecture expertise

**Tertiary:**
- Technology partners and consultancies
- Educational institutions for mentoring

**Geographic Focus:** 
- Algerian enterprises and North African region
- Global companies seeking specialized, versatile talent

### 1.3 Success Definition
- **Monthly qualified leads:** 8-15 (mix of desktop & web projects)
- **Portfolio views:** 150+ per month
- **GitHub engagement:** 100+ stars
- **Professional inquiries:** 5-8 per month
- **Project exploration rate:** 80%+ complete portfolio tour

---

## 2. Core Features

### 2.1 Hero Section
**Objective:** Communicate versatile full-stack expertise at first glance

**Requirements:**
- Dynamic hero banner with animated gradient background
- **New Headline:** "Full-Stack Engineering for Enterprise" (or "Building Enterprise Solutions: Desktop, Web, 3D")
- **Subheadline:** Highlight ability to work across domains
  - "Expert in JavaFX desktop apps, modern web (React/Next.js), backend systems, and 3D graphics"
- Call-to-action buttons: "View Portfolio" and "Start a Project"
- **Tech Stack Tags:** Show visual badges for Java, TypeScript, React, NestJS, PostgreSQL
- Availability status badge
- Responsive design for all devices

**UI Elements:**
- Full-width section with 80vh minimum height
- Animated background (gradients, particles, or subtle 3D)
- **Featured Technology Pills:** Visual display of core technologies
- Smooth scroll navigation
- Mobile-optimized typography
- Desktop/Web/Backend icon indicators

### 2.2 Projects Showcase (Enhanced Bento Grid + Category Filter)
**Objective:** Showcase expertise across desktop, web, and backend domains

**Requirements:**

#### Project Organization
- **Project Categories:** Desktop | Web | Full-Stack | 3D Graphics
- **Filter/Tab System:** Allow visitors to filter by technology domain
- **Featured Projects Display:**

**Desktop Projects:**
  - GstockDz ERP (Hero/Large - 2x2 grid)
    - JavaFX 17+, Spring Boot, MySQL, MVVM, Offline-first
  - HK-Wireguard VPN (Medium - 2x1 grid)
    - Cybersecurity, Post-quantum encryption

**Web & Full-Stack Projects:**
  - chpub_next (Hero/Large - 2x2 grid)
    - **Next.js 15 Full-Stack, React 19, Three.js 3D Configurator, TypeScript, Prisma, PostgreSQL, Google GenAI, NextAuth**
    - Advertising agency portal with interactive 3D product configurator
  - immo_lamis (Medium - 2x1 grid)
    - **React 19, NestJS Backend, Prisma, PostgreSQL, JWT Auth, File Uploads**
    - Real estate management platform with full-stack TypeScript

**Desktop (Secondary):**
  - School Manager (Standard)
  - KDP Book Generator (Standard)
  - Payment File Generator (Standard)

- **Project Card Components:**
  - High-quality project imagery/preview/3D visualization
  - Project title, description, and business impact
  - **Technology Stack Visualization:** Show used technologies with badges/colors
    - Color coding: Java (orange), TypeScript (blue), Databases (green), etc.
  - Project metrics (team size, duration, scale)
  - Demo, source code, and case study links
  - Hover effects with tech stack animation

- **Information Architecture:**
  - Responsive grid layout (desktop: bento, tablet: 2-column, mobile: 1-column)
  - Lazy loading for images and videos
  - Smooth scroll-reveal animations
  - Quick links for category filtering
  - Touch-friendly on mobile

### 2.3 Skills & Expertise Section (Organized by Platform Domain)
**Objective:** Communicate versatile full-stack expertise across platforms

**Requirements:**
- **Categorized Skills Display by Domain:**

#### Desktop Domain
  - **Core:** Java, JavaFX 17+, MVVM Architecture
  - **Backend:** Spring Boot 3.x, Hibernate/JPA
  - **Databases:** MySQL, SQLite (offline-first)
  - **Tools:** Maven, JLink/JPackage, JasperReports
  - **Security:** Post-Quantum Crypto, WireGuard

#### Web Frontend Domain
  - **Core:** React 19, TypeScript, Next.js 15
  - **Styling:** Tailwind CSS 4, CVA (Class Variance Authority)
  - **State & Forms:** React Hook Form, Zod validation
  - **Graphics:** Three.js, React Three Fiber (3D)
  - **Icons:** Lucide React
  - **Build Tools:** Vite, Next.js build system

#### Backend & API Domain
  - **Frameworks:** NestJS 11, Express.js, Next.js API Routes
  - **Database ORM:** Prisma 6.x
  - **Databases:** PostgreSQL, TiDB, MariaDB
  - **Auth:** NextAuth v4, Passport.js, JWT
  - **File Handling:** Multer, Sharp (image processing)
  - **Data Validation:** class-validator, Zod

#### Advanced Features
  - **3D Graphics:** Three.js, React Three Fiber configurators
  - **AI Integration:** Google GenAI APIs
  - **Charts & Viz:** Recharts, data visualization
  - **PDF Generation:** react-pdf/renderer
  - **Email:** Nodemailer

#### Testing & Quality
  - **Unit Testing:** Jest, Vitest
  - **E2E Testing:** Playwright, Cypress
  - **Integration:** Supertest, testing libraries
  - **Code Quality:** ESLint, Prettier, TypeScript strict mode

#### DevOps & Deployment
  - **Hosting:** Vercel (Next.js optimized), GitHub Pages
  - **CI/CD:** GitHub Actions
  - **Containerization:** Docker
  - **Version Control:** Git, GitHub

- **Visual Design:**
  - **Domain-Based Cards:** Separate cards for Desktop/Web/Backend/3D
  - **Skill Proficiency Levels:** Beginner/Intermediate/Expert badges
  - **Interactive Hover:** Show projects using each skill
  - **Color Coding:** Consistent colors per technology (Java=Orange, TypeScript=Blue, DB=Green, etc.)
  - **Connection Visualization:** Show how different skills combine in projects

- **Content Quality:**
  - Accurate representation of expertise across all domains
  - Real projects demonstrating each skill
  - Regular updates as technologies evolve
  - Links to GitHub, documentation, or project examples

### 2.4 Experience & Education Timeline
**Objective:** Establish credentials and background

**Requirements:**
- **Timeline Structure:**
  - 2024: State-certified Engineer degree
  - 2021-Present: Self-employed Desktop Software Engineer
  - 2021-2023: Master's degree (NICT)
  - 2018-2021: Bachelor's degree (Information Systems)
  - 2016-2019: Architecture background

- **Key Achievements:**
  - GstockDz ERP development
  - Legacy Swing to JavaFX migration
  - Spring Boot backend integration
  - JasperReports implementation

- **Core Competencies Display:**
  - Enterprise desktop architecture
  - Database design and optimization
  - System-level security
  - Native installer creation

### 2.5 Certifications & Credentials
**Objective:** Demonstrate continuous learning

**Requirements:**
- Display of relevant certifications:
  - Blockchain Basics (Coursera)
  - Fundamentals of Deep Learning (NVIDIA)
  - AWS Machine Learning Foundations (Udacity)
  - SEO Manager Certification (Blue Array)

- **Card Layout:**
  - Certification name and issuer
  - Credential ID (when applicable)
  - Issue and expiry dates
  - Verification links

### 2.6 Contact & Call-to-Action
**Objective:** Enable business inquiries

**Requirements:**
- Multiple CTA buttons throughout page
- "Hire Me" button with contact form
- "Download CV" in PDF format
- Email contact information
- Social media links (GitHub, LinkedIn, etc.)
- Contact form with validation

### 2.7 Navigation & Accessibility
**Objective:** Seamless user experience

**Requirements:**
- Fixed/sticky header navigation
- Smooth scroll navigation
- Aria labels for accessibility
- Keyboard navigation support
- Skip links
- Mobile-responsive menu
- Breadcrumb navigation (optional)

---

## 3. User Experience Requirements

### 3.1 Design Principles
- **Modern & Professional:** Clean, contemporary design reflecting enterprise credibility
- **Performance-First:** Fast loading, smooth animations, optimized assets
- **Accessible:** WCAG 2.1 AA compliance, keyboard navigation, screen reader support
- **Mobile-First:** Responsive design with mobile optimization priority
- **Visually Engaging:** Animations and interactive elements without overwhelming content

### 3.2 Interaction Patterns
- Smooth scroll animations (scroll-reveal.js)
- Hover state feedback on interactive elements
- Loading states for dynamic content
- Form validation with user feedback
- Mobile-friendly touch targets (min 44x44px)

### 3.3 Visual Hierarchy
- Clear headline and subheading structure
- Prominent CTA buttons
- Project cards with visual differentiation
- Color-coded categories for quick scanning
- Adequate whitespace for breathing room

### 3.4 Performance Metrics
- First Contentful Paint: < 1 second
- Time to Interactive: < 3 seconds
- Lighthouse Score: > 90
- Mobile PageSpeed: > 85

---

## 4. Content Requirements

### 4.1 Project Descriptions
**Format:** Clear, business-focused descriptions (2-3 sentences)

**Content Template:**
- What problem does it solve?
- Key technical achievements
- Business impact or unique features
- Technology stack highlights

**Example (GstockDz):**
"A flagship Inventory & Point of Sale system built for Algerian enterprises. Features scalable architecture with real-time reporting, offline-first reliability, and modern MVVM patterns."

### 4.2 Metadata & SEO
- Meta descriptions for search engines
- Open Graph tags for social sharing
- Twitter Card integration
- Keyword optimization for technical terms
- Schema.org structured data (optional)

### 4.3 Copy Tone
- Professional and authoritative
- Client-focused (emphasizing solutions, not features)
- Clear and concise
- Emphasis on enterprise value and reliability

---

## 5. Technical Requirements

### 5.1 Frontend Stack
- HTML5 semantic markup
- CSS3 with animations and transitions
- Responsive design (mobile, tablet, desktop)
- JavaScript for interactivity
- Bootstrap 5 for grid system
- Font Awesome for icons

### 5.2 Performance Optimization
- Image optimization and lazy loading
- CSS and JavaScript minification
- Asset compression (gzip)
- Critical CSS inline loading
- Defer non-critical JavaScript

### 5.3 Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (Safari iOS 14+, Chrome Mobile 90+)

### 5.4 Hosting & Deployment
- GitHub Pages for static hosting
- GitHub Actions for CI/CD
- CDN for asset delivery (optional)
- SSL/TLS encryption

---

## 6. Non-Functional Requirements

### 6.1 Scalability
- Support for adding more projects
- Modular CSS architecture
- Reusable component patterns
- Easy theme customization

### 6.2 Maintainability
- Well-organized file structure
- Clear code comments
- Consistent naming conventions
- Easy dependency updates

### 6.3 Security
- HTTPS/SSL encryption
- No sensitive data exposure
- Input validation on forms
- CSRF protection for contact forms

### 6.4 Analytics & Monitoring
- Google Analytics integration
- Traffic pattern tracking
- Bounce rate monitoring
- User behavior insights

---

## 7. Success Criteria

### 7.1 Quantitative Metrics
- Website uptime: 99.9%
- Page load time: < 2 seconds
- Mobile friendliness score: > 90%
- Monthly unique visitors: 500+
- Qualified leads: 5-10 per month

### 7.2 Qualitative Metrics
- Positive feedback from visitors
- Professional credibility perception
- Clear value proposition communication
- User engagement with projects

---

## 8. Future Enhancements (Not in MVP)

### 8.1 Phase 2
- Blog section for technical articles
- Case studies with in-depth project analysis
- Testimonials from enterprise clients
- Video demonstrations of projects
- Interactive project comparison tool

### 8.2 Phase 3
- Backend portfolio management system
- Dynamic project filtering
- Advanced analytics dashboard
- Multiple language support (AR, FR, EN)
- Dark mode toggle

### 8.3 Phase 4
- Job opportunities board
- Consulting services showcase
- Training/mentoring programs
- Community engagement features
- AI-powered recommendation engine

---

## 9. Constraints & Dependencies

### 9.1 Technical Constraints
- GitHub Pages limitations (static hosting only)
- No backend for current phase
- Browser compatibility requirements
- Performance budget limitations

### 9.2 Content Constraints
- Accurate project information required
- IP considerations for project details
- Privacy and confidentiality agreements
- Regular content updates needed

### 9.3 Timeline Constraints
- MVP delivery: 2-4 weeks
- Phase 2 features: 1-3 months
- Full implementation: 6 months+

---

## 10. Acceptance Criteria

- [ ] All hero section elements render correctly
- [ ] Projects display in responsive bento grid
- [ ] All skills categorized and visible
- [ ] Timeline displays experience chronologically
- [ ] All CTA buttons link to correct destinations
- [ ] Mobile responsive on all breakpoints
- [ ] Accessibility audit passes WCAG 2.1 AA
- [ ] Page load time < 2 seconds
- [ ] Forms validate and submit correctly
- [ ] All images load with proper alt text

---

## 11. Stakeholders

- **Product Owner:** Marrok Abderrahmane
- **Users:** Enterprise decision-makers, potential clients
- **Development:** Frontend developers, DevOps
- **Marketing:** Social media, SEO optimization

---

## Document Information

- **Version:** 1.0
- **Last Updated:** April 2026
- **Status:** Active
- **Next Review:** June 2026
