"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Edit2, Briefcase, GraduationCap, Award } from "lucide-react"

const TYPE_ICONS: Record<string, any> = {
  job: Briefcase,
  education: GraduationCap,
  achievement: Award,
}

function ExperienceModal({
  item,
  onClose,
  onSave,
}: {
  item?: any
  onClose: () => void
  onSave: (data: any) => Promise<void>
}) {
  const [form, setForm] = useState(
    item
      ? {
          ...item,
          startDate: item.startDate?.split("T")[0] ?? "",
          endDate: item.endDate?.split("T")[0] ?? "",
        }
      : { title: "", company: "", type: "job", description: "", startDate: "", endDate: "", current: false, order: 0 }
  )
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await onSave({ ...form, order: Number(form.order), endDate: form.current ? null : form.endDate || null })
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="glass-card w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-white mb-6">{item ? "Edit Entry" : "Add Entry"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Company / Institution</label>
              <input
                value={form.company ?? ""}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white outline-none"
              >
                <option value="job">Job</option>
                <option value="education">Education</option>
                <option value="achievement">Achievement</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Description</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Start Date</label>
              <input
                type="date"
                required
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">End Date</label>
              <input
                type="date"
                disabled={form.current}
                value={form.endDate ?? ""}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white outline-none disabled:opacity-40"
              />
            </div>
          </div>
          <label className="flex items-center gap-2 text-slate-300 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={form.current}
              onChange={(e) => setForm({ ...form, current: e.target.checked })}
              className="accent-primary"
            />
            Currently ongoing
          </label>
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

export default function AdminExperiencePage() {
  const [items, setItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [modal, setModal] = useState<{ open: boolean; item?: any }>({ open: false })

  const fetchItems = async () => {
    const res = await fetch("/api/admin/experience")
    setItems(await res.json())
    setIsLoading(false)
  }

  useEffect(() => { fetchItems() }, [])

  const handleSave = async (data: any) => {
    const isEdit = !!data.id
    await fetch(isEdit ? `/api/admin/experience/${data.id}` : "/api/admin/experience", {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    await fetchItems()
    setModal({ open: false })
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this entry?")) return
    await fetch(`/api/admin/experience/${id}`, { method: "DELETE" })
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <div className="p-10">
      {modal.open && (
        <ExperienceModal
          item={modal.item}
          onClose={() => setModal({ open: false })}
          onSave={handleSave}
        />
      )}

      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Experience</h1>
          <p className="text-slate-400 mt-2">Manage your career timeline and education.</p>
        </div>
        <button onClick={() => setModal({ open: true })} className="btn-primary py-3 px-6 flex items-center gap-2">
          <Plus size={18} /> Add Entry
        </button>
      </header>

      {isLoading ? (
        <p className="text-slate-500">Loading…</p>
      ) : (
        <div className="glass-card border-white/5 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/5 border-b border-white/5">
              <tr>
                <th className="px-6 py-3 text-slate-300 text-xs uppercase tracking-wider">Entry</th>
                <th className="px-6 py-3 text-slate-300 text-xs uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-slate-300 text-xs uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-slate-300 text-xs uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {items.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-10 text-center text-slate-500">No entries yet.</td></tr>
              ) : (
                items.map((item) => {
                  const Icon = TYPE_ICONS[item.type] ?? Briefcase
                  const start = new Date(item.startDate).getFullYear()
                  const end = item.current ? "Present" : item.endDate ? new Date(item.endDate).getFullYear() : "—"
                  return (
                    <tr key={item.id} className="hover:bg-white/[0.02]">
                      <td className="px-6 py-4">
                        <p className="text-white font-medium">{item.title}</p>
                        {item.company && <p className="text-slate-500 text-xs">{item.company}</p>}
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{start} — {end}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                          <Icon size={14} /> {item.type}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setModal({ open: true, item })}
                            className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
