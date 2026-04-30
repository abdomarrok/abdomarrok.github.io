"use client"

import { useState, useEffect } from "react"
import { Save, Loader2 } from "lucide-react"

const DEFAULTS = {
  available: "true",
  showContactForm: "true",
  github: "",
  linkedin: "",
  twitter: "",
  email: "",
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(DEFAULTS)
  const [isLoading, setIsLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings({ ...DEFAULTS, ...data })
        setIsLoading(false)
      })
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  if (isLoading) return <div className="p-10 text-slate-500">Loading…</div>

  return (
    <div className="p-10 max-w-2xl">
      <header className="mb-10">
        <h1 className="text-3xl font-display font-bold text-white">Settings</h1>
        <p className="text-slate-400 mt-2">Portfolio configuration and social links.</p>
      </header>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="glass-card p-6 border-white/5 space-y-4">
          <h2 className="text-lg font-bold text-white">Portfolio Status</h2>

          <label className="flex items-center justify-between p-4 rounded-lg bg-white/5 cursor-pointer">
            <div>
              <p className="text-sm font-bold text-white">Available for Projects</p>
              <p className="text-xs text-slate-500">Show "Open to work" badge on portfolio</p>
            </div>
            <input
              type="checkbox"
              checked={settings.available === "true"}
              onChange={(e) => setSettings({ ...settings, available: String(e.target.checked) })}
              className="w-5 h-5 accent-primary"
            />
          </label>

          <label className="flex items-center justify-between p-4 rounded-lg bg-white/5 cursor-pointer">
            <div>
              <p className="text-sm font-bold text-white">Show Contact Form</p>
              <p className="text-xs text-slate-500">Display the contact section publicly</p>
            </div>
            <input
              type="checkbox"
              checked={settings.showContactForm === "true"}
              onChange={(e) => setSettings({ ...settings, showContactForm: String(e.target.checked) })}
              className="w-5 h-5 accent-primary"
            />
          </label>
        </div>

        <div className="glass-card p-6 border-white/5 space-y-4">
          <h2 className="text-lg font-bold text-white">Social Links</h2>
          {[
            { key: "github", label: "GitHub", placeholder: "https://github.com/username" },
            { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/username" },
            { key: "twitter", label: "Twitter / X", placeholder: "https://twitter.com/username" },
            { key: "email", label: "Contact Email", placeholder: "you@example.com" },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-sm text-slate-300 mb-1">{label}</label>
              <input
                type={key === "email" ? "email" : "url"}
                value={settings[key as keyof typeof settings]}
                placeholder={placeholder}
                onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={saving}
          className="btn-primary py-3 px-8 flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          {saved ? "Saved!" : saving ? "Saving…" : "Save Changes"}
        </button>
      </form>
    </div>
  )
}
