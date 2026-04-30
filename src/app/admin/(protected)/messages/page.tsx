"use client"

import { useState, useEffect } from "react"
import { Trash2, MailOpen, Mail, ChevronDown } from "lucide-react"

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)

  const fetchMessages = async () => {
    const res = await fetch("/api/admin/messages")
    setMessages(await res.json())
    setIsLoading(false)
  }

  useEffect(() => { fetchMessages() }, [])

  const toggleRead = async (id: string, read: boolean) => {
    await fetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !read }),
    })
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read: !read } : m))
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" })
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }

  const expand = async (msg: any) => {
    setExpanded(expanded === msg.id ? null : msg.id)
    if (!msg.read) await toggleRead(msg.id, false)
  }

  const unread = messages.filter((m) => !m.read).length

  return (
    <div className="p-10">
      <header className="mb-10">
        <h1 className="text-3xl font-display font-bold text-white">Messages</h1>
        <p className="text-slate-400 mt-2">
          {unread > 0 ? (
            <span className="text-primary font-medium">{unread} unread</span>
          ) : (
            "All messages read"
          )}{" "}
          · {messages.length} total
        </p>
      </header>

      {isLoading ? (
        <p className="text-slate-500">Loading…</p>
      ) : messages.length === 0 ? (
        <div className="glass-card border-white/5 p-12 text-center text-slate-500">
          No messages yet.
        </div>
      ) : (
        <div className="glass-card border-white/5 divide-y divide-white/5 overflow-hidden">
          {messages.map((msg) => (
            <div key={msg.id} className={`transition-all ${msg.read ? "" : "bg-primary/5"}`}>
              <div
                className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-white/[0.02]"
                onClick={() => expand(msg)}
              >
                <div className={`flex-shrink-0 ${msg.read ? "text-slate-600" : "text-primary"}`}>
                  {msg.read ? <MailOpen size={18} /> : <Mail size={18} />}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-3">
                    <span className={`font-medium ${msg.read ? "text-slate-300" : "text-white"}`}>{msg.name}</span>
                    <span className="text-slate-500 text-xs">{msg.email}</span>
                  </div>
                  <p className="text-slate-400 text-sm truncate">{msg.subject}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-slate-600 text-xs">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-500 transition-transform ${expanded === msg.id ? "rotate-180" : ""}`}
                  />
                </div>
              </div>

              {expanded === msg.id && (
                <div className="px-6 pb-5 pt-1">
                  <div className="bg-slate-900/60 rounded-xl p-4 text-slate-300 text-sm leading-relaxed mb-4">
                    {msg.message}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => toggleRead(msg.id, msg.read)}
                      className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white text-sm transition-all"
                    >
                      Mark as {msg.read ? "unread" : "read"}
                    </button>
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                      className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm hover:bg-primary/20 transition-all"
                    >
                      Reply
                    </a>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm hover:bg-red-500/20 transition-all ml-auto"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
