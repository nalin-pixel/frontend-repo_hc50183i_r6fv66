import { useState } from 'react'

export default function Navbar({ onLogout, authed, onSearch }) {
  const [q, setQ] = useState('')
  return (
    <header className="sticky top-0 z-20 bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="text-white font-bold text-lg">Praktycznik</div>
        <div className="ml-auto flex items-center gap-2 w-full max-w-md">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Szukaj artykułów..." className="w-full px-3 py-2 rounded-md bg-slate-800 text-slate-100 placeholder-slate-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button onClick={()=>onSearch?.(q)} className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500">Szukaj</button>
        </div>
        {authed ? (
          <button onClick={onLogout} className="ml-3 px-3 py-2 rounded-md bg-slate-700 text-white hover:bg-slate-600">Wyloguj</button>
        ) : null}
      </div>
    </header>
  )
}
