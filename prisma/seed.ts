import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.project.deleteMany()
  await prisma.category.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.experience.deleteMany()

  // Categories
  const desktop = await prisma.category.upsert({
    where: { name: 'Desktop' },
    update: {},
    create: { name: 'Desktop', slug: 'desktop', color: '#f97316' },
  })
  const web = await prisma.category.upsert({
    where: { name: 'Web' },
    update: {},
    create: { name: 'Web', slug: 'web', color: '#3b82f6' },
  })
  const fullstack = await prisma.category.upsert({
    where: { name: 'Full-Stack' },
    update: {},
    create: { name: 'Full-Stack', slug: 'full-stack', color: '#10b981' },
  })
  const graphics = await prisma.category.upsert({
    where: { name: '3D Graphics' },
    update: {},
    create: { name: '3D Graphics', slug: '3d-graphics', color: '#8b5cf6' },
  })

  // Projects
  await prisma.project.createMany({
    data: [
      {
        title: 'GstockDz ERP System',
        description: 'A flagship Inventory & Point of Sale system built for Algerian enterprises. Features scalable architecture with real-time reporting, offline-first reliability, and modern MVVM patterns.',
        categoryId: desktop.id,
        technologies: ['JavaFX 17+', 'Spring Boot', 'JasperReports', 'MySQL'],
        imageUrl: '/images/dashboard.webp',
        githubUrl: 'https://github.com/abdomarrok/GstockDz',
        liveUrl: 'https://abdomarrok.github.io/GstockDz_Landing/',
        featured: true,
        order: 1,
      },
      {
        title: 'HK-Wireguard VPN',
        description: 'Enterprise VPN client featuring post-quantum security algorithms and system-level tray integration for seamless connectivity.',
        categoryId: desktop.id,
        technologies: ['Cybersecurity', 'WireGuard', 'Post-Quantum'],
        imageUrl: '/images/hkwirguard.svg',
        liveUrl: 'https://www.behance.net/gallery/176712155/HK-Wireguard',
        featured: false,
        order: 2,
      },
      {
        title: 'School Manager',
        description: 'Academic management system for educational institutions with modern UI patterns and comprehensive academic analytics.',
        categoryId: desktop.id,
        technologies: ['Education', 'SQL', 'Analytics'],
        imageUrl: '/images/SchoolManager.svg',
        liveUrl: 'https://www.behance.net/gallery/176711797/School-manager',
        featured: false,
        order: 3,
      },
      {
        title: 'StoryForge - KDP Book Generator',
        description: 'Desktop application for creating Kindle Direct Publishing books with scene management, multiple templates, and professional PDF export.',
        categoryId: desktop.id,
        technologies: ['JavaFX', 'KDP Publishing', 'PDF Generation'],
        imageUrl: '/images/kdp generator.png',
        liveUrl: 'KDP Converter FX App/',
        featured: false,
        order: 4,
      },
      {
        title: 'Payment File Generator',
        description: 'Generates interbanking payment files in the Algerian standard format with RIB validation and real-time totals.',
        categoryId: desktop.id,
        technologies: ['JavaFX', 'Banking', 'Algeria'],
        imageUrl: '/images/scene pfg.png',
        featured: false,
        order: 5,
      },
    ],
  })

  // Skills
  await prisma.skill.createMany({
    data: [
      { name: 'Java', category: 'Frontend', proficiency: 5, icon: 'devicon-java-plain', order: 1 },
      { name: 'JavaFX 17+', category: 'Frontend', proficiency: 5, icon: 'devicon-java-plain', order: 2 },
      { name: 'Spring Boot', category: 'Backend', proficiency: 5, icon: 'devicon-spring-plain', order: 3 },
      { name: 'MVVM Architecture', category: 'Architecture', proficiency: 5, icon: 'fas fa-layer-group', order: 4 },
      { name: 'JasperReports', category: 'Tools', proficiency: 5, icon: 'fas fa-file-pdf', order: 5 },
      { name: 'Hibernate/JPA', category: 'Database', proficiency: 5, icon: 'fas fa-database', order: 6 },
      { name: 'MySQL', category: 'Database', proficiency: 5, icon: 'devicon-mysql-plain', order: 7 },
      { name: 'SQLite', category: 'Database', proficiency: 5, icon: 'devicon-sqlite-plain', order: 8 },
      { name: 'Post-Quantum Crypto', category: 'Security', proficiency: 4, icon: 'fas fa-key', order: 9 },
      { name: 'WireGuard', category: 'Security', proficiency: 5, icon: 'fas fa-lock', order: 10 },
    ],
  })

  // Experience
  await prisma.experience.createMany({
    data: [
      {
        title: "Ingénieur d'État en Informatique",
        company: "University of M'sila",
        type: 'education',
        description: 'State-certified Computer Science Engineer',
        startDate: new Date('2024-01-01'),
        current: true,
        order: 1,
      },
      {
        title: 'Self-Employed Desktop Software Engineer',
        type: 'job',
        description: 'Developed GstockDz ERP, Migrated Legacy Swing Apps to JavaFX, Integrated Spring Boot Backends.',
        startDate: new Date('2021-01-01'),
        current: true,
        order: 2,
      },
      {
        title: "Master's Degree (NICT)",
        company: "University of M'sila",
        type: 'education',
        description: 'Networks and Information Communication Technologies',
        startDate: new Date('2021-09-01'),
        endDate: new Date('2023-07-01'),
        order: 3,
      },
      {
        title: "Bachelor's Degree",
        company: "University of M'sila",
        type: 'education',
        description: 'Information Systems and Software Engineering',
        startDate: new Date('2018-09-01'),
        endDate: new Date('2021-07-01'),
        order: 4,
      },
      {
        title: 'Bachelor of Architecture',
        company: 'INSFP Kouba',
        type: 'education',
        description: 'Architecture and Building Construction',
        startDate: new Date('2016-09-01'),
        endDate: new Date('2019-03-01'),
        order: 5,
      },
    ],
  })

  // Admin User
  const hashedPassword = await bcrypt.hash("0000", 10)
  await prisma.adminUser.upsert({
    where: { email: "admin@example.com" },
    update: { password: hashedPassword },
    create: {
      email: "admin@example.com",
      password: hashedPassword,
      name: "Marrok",
      role: "admin",
    },
  })

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
