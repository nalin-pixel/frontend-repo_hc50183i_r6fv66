import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import Articles from './components/Articles'
import ArticleView from './components/ArticleView'

const API = import.meta.env.VITE_BACKEND_URL

export default function App(){
  const [authed, setAuthed] = useState(!!localStorage.getItem('token'))
  const [category, setCategory] = useState(null)
  const [openArticle, setOpenArticle] = useState(null)
  const [results, setResults] = useState(null)

  const logout = () => { localStorage.removeItem('token'); setAuthed(false) }

  const search = async (q) => {
    if(!q){ setResults(null); return }
    const res = await fetch(`${API}/search?q=${encodeURIComponent(q)}`)
    const data = await res.json()
    setResults(data)
  }

  useEffect(()=>{ if(!authed){ setCategory(null); setOpenArticle(null) } },[authed])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Navbar authed={authed} onLogout={logout} onSearch={search} />
      <main className="max-w-6xl mx-auto p-4">
        {!authed ? (
          <div className="mt-10"><Auth onSuccess={()=>setAuthed(true)} /></div>
        ) : (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              {!category ? (
                <Dashboard onSelectCategory={setCategory} />
              ) : (
                <Articles category={category} onOpen={setOpenArticle} />
              )}
            </div>
            <div className="lg:col-span-2">
              {openArticle ? (
                <ArticleView article={openArticle} onBack={()=>setOpenArticle(null)} />
              ) : results ? (
                <div>
                  <h3 className="text-white text-xl font-semibold mb-4">Wyniki wyszukiwania</h3>
                  <div className="space-y-3">
                    {results.map(r => (
                      <button key={r._id} onClick={()=>setOpenArticle(r)} className="w-full text-left bg-slate-800/60 border border-white/10 rounded-xl p-5 hover:border-blue-500/40">
                        <div className="text-white font-semibold">{r.title}</div>
                        <div className="text-slate-400 text-sm line-clamp-2" dangerouslySetInnerHTML={{__html: r.content}} />
                      </button>
                    ))}
                    {results.length===0 && <div className="text-slate-300">Brak wyników</div>}
                  </div>
                </div>
              ) : (
                <div className="text-slate-300/80">Wybierz kategorię, aby zobaczyć artykuły lub użyj wyszukiwarki.</div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
