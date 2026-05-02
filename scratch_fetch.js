async function test() {
  const resGet = await fetch('http://localhost:3000/api/admin/projects')
  const dataGet = await resGet.json()
  const project = dataGet[0]
  
  if (!project) return console.log("no projects")

  console.log("Editing project:", project.id)

  const payload = {
    title: project.title + " (Edited)",
    description: project.description,
    categoryId: project.categoryId,
    technologies: ["React", "Next.js"],
    githubUrl: project.githubUrl || "",
    liveUrl: project.liveUrl || "",
    slug: project.slug,
    imageUrl: project.imageUrl || "",
    published: true,
    featured: false,
    challenge: project.challenge || "",
    approach: project.approach || "",
    solution: project.solution || "",
    results: project.results || "",
    testimonial: project.testimonial || "",
    highlights: []
  }

  const resPut = await fetch(`http://localhost:3000/api/admin/projects/${project.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  console.log("Status:", resPut.status)
  const text = await resPut.text()
  console.log("Response:", text)
}

test()
