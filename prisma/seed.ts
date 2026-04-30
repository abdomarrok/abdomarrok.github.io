import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.project.deleteMany()
  await prisma.category.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.experience.deleteMany()

  const desktop   = await prisma.category.upsert({ where: { name: 'Desktop' },    update: {}, create: { name: 'Desktop',    slug: 'desktop',    color: '#f97316' } })
  const web       = await prisma.category.upsert({ where: { name: 'Web' },        update: {}, create: { name: 'Web',        slug: 'web',        color: '#3b82f6' } })
  const fullstack = await prisma.category.upsert({ where: { name: 'Full-Stack' }, update: {}, create: { name: 'Full-Stack', slug: 'full-stack', color: '#10b981' } })

  // suppress unused variable warnings
  void web; void fullstack

  await prisma.project.createMany({
    data: [
      {
        title: 'GstockDz ERP System',
        description: 'A flagship Inventory & Point of Sale system built for Algerian enterprises. Features scalable architecture with real-time reporting, offline-first reliability, and modern MVVM patterns.',
        categoryId: desktop.id,
        technologies: JSON.stringify(['JavaFX 17+', 'Spring Boot', 'JasperReports', 'MySQL']),
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
        technologies: JSON.stringify(['Cybersecurity', 'WireGuard', 'Post-Quantum']),
        imageUrl: '/images/hkwirguard.svg',
        liveUrl: 'https://www.behance.net/gallery/176712155/HK-Wireguard',
        order: 2,
      },
      {
        title: 'School Manager',
        description: 'Academic management system for educational institutions with modern UI patterns and comprehensive academic analytics.',
        categoryId: desktop.id,
        technologies: JSON.stringify(['Education', 'SQL', 'Analytics']),
        imageUrl: '/images/SchoolManager.svg',
        liveUrl: 'https://www.behance.net/gallery/176711797/School-manager',
        order: 3,
      },
      {
        title: 'StoryForge - KDP Book Generator',
        description: 'Desktop application for creating Kindle Direct Publishing books with scene management, multiple templates, and professional PDF export.',
        categoryId: desktop.id,
        technologies: JSON.stringify(['JavaFX', 'KDP Publishing', 'PDF Generation']),
        imageUrl: '/images/kdp generator.png',
        order: 4,
      },
      {
        title: 'Payment File Generator',
        description: 'Generates interbanking payment files in the Algerian standard format with RIB validation and real-time totals.',
        categoryId: desktop.id,
        technologies: JSON.stringify(['JavaFX', 'Banking', 'Algeria']),
        imageUrl: '/images/scene pfg.png',
        order: 5,
      },
    ],
  })

  await prisma.skill.createMany({
    data: [
      { name: 'Java',               category: 'Desktop',  proficiency: 5, order: 1 },
      { name: 'JavaFX 17+',         category: 'Desktop',  proficiency: 5, order: 2 },
      { name: 'Spring Boot',        category: 'Backend',  proficiency: 5, order: 3 },
      { name: 'MVVM Architecture',  category: 'Desktop',  proficiency: 5, order: 4 },
      { name: 'JasperReports',      category: 'Tools',    proficiency: 5, order: 5 },
      { name: 'MySQL',              category: 'Database', proficiency: 5, order: 6 },
      { name: 'SQLite',             category: 'Database', proficiency: 5, order: 7 },
      { name: 'Post-Quantum Crypto',category: 'Security', proficiency: 4, order: 8 },
      { name: 'WireGuard',          category: 'Security', proficiency: 5, order: 9 },
      { name: 'React 19',           category: 'Frontend', proficiency: 5, order: 10 },
      { name: 'Next.js 15',         category: 'Frontend', proficiency: 5, order: 11 },
      { name: 'TypeScript',         category: 'Frontend', proficiency: 5, order: 12 },
    ],
  })

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
        description: 'Developed GstockDz ERP, migrated Legacy Swing apps to JavaFX, integrated Spring Boot backends.',
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

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
