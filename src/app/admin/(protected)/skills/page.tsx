"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Edit2, Star } from "lucide-react"

const CATEGORIES = ["Frontend", "Backend", "Database", "Desktop", "Security", "Tools", "3D", "DevOps"]

function SkillModal({
  skill,
  onClose,
  onSave,
}: {
  skill?: any
  onClose: () => void
  onSave: (data: any) => Promise<void>
}) {
  const [form, setForm] = useState(
    skill ?? { name: "", category: "Frontend", proficiency: 3, icon: "", description: "", color: "", order: 0 }
  )
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await onSave({ ...form, proficiency: Number(form.proficiency), order: Number(form.order) })
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="glass-card w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-white mb-6">{skill ? "Edit Skill" : "Add Skill"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white outline-none"
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Proficiency (1–5)</label>
              <input
                type="number"
                min={1}
                max={5}
                value={form.proficiency}
                onChange={(e) => setForm({ ...form, proficiency: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Color (hex)</label>
              <input
                value={form.color ?? ""}
                placeholder="#3b82f6"
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Order</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Description (optional)</label>
            <input
              value={form.description ?? ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white outline-none"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 p-2.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white transition-all">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex-1 btn-primary py-2.5 disabled:opacity-50">
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [modal, setModal] = useState<{ open: boolean; skill?: any }>({ open: false })

  const fetchSkills = async () => {
    const res = await fetch("/api/admin/skills")
    setSkills(await res.json())
    setIsLoading(false)
  }

  useEffect(() => { fetchSkills() }, [])

  const handleSave = async (data: any) => {
    const isEdit = !!data.id
    await fetch(isEdit ? `/api/admin/skills/${data.id}` : "/api/admin/skills", {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    await fetchSkills()
    setModal({ open: false })
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this skill?")) return
    await fetch(`/api/admin/skills/${id}`, { method: "DELETE" })
    setSkills((prev) => prev.filter((s) => s.id !== id))
  }

  const grouped = CATEGORIES.reduce<Record<string, any[]>>((acc, cat) => {
    acc[cat] = skills.filter((s) => s.category === cat)
    return acc
  }, {})

  return (
    <div className="p-10">
      {modal.open && (
        <SkillModal
          skill={modal.skill}
          onClose={() => setModal({ open: false })}
          onSave={handleSave}
        />
      )}

      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Skills</h1>
          <p className="text-slate-400 mt-2">Manage your technical skills and proficiency levels.</p>
        </div>
        <button onClick={() => setModal({ open: true })} className="btn-primary py-3 px-6 flex items-center gap-2">
          <Plus size={18} /> Add Skill
        </button>
      </header>

      {isLoading ? (
        <p className="text-slate-500">Loading…</p>
      ) : (
        <div className="space-y-8">
          {CATEGORIES.filter((c) => grouped[c].length > 0).map((cat) => (
            <div key={cat}>
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">{cat}</h2>
              <div className="glass-card border-white/5 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-white/5 border-b border-white/5">
                    <tr>
                      <th className="px-6 py-3 text-slate-300 text-xs uppercase tracking-wider">Skill</th>
                      <th className="px-6 py-3 text-slate-300 text-xs uppercase tracking-wider">Proficiency</th>
                      <th className="px-6 py-3 text-slate-300 text-xs uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {grouped[cat].map((skill) => (
                      <tr key={skill.id} className="hover:bg-white/[0.02]">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {skill.color && (
                              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: skill.color }} />
                            )}
                            <span className="text-white font-medium">{skill.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <Star
                                key={n}
                                size={14}
                                className={n <= skill.proficiency ? "text-primary fill-primary" : "text-slate-700"}
                              />
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setModal({ open: true, skill })}
                              className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(skill.id)}
                              className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
