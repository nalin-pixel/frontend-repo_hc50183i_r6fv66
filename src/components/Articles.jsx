import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL

const statusColors = {
  'Przeczytane': 'bg-emerald-600',
  'Wymaga powtórki': 'bg-amber-600',
  'Wyróżnione': 'bg-fuchsia-600'
}

export default function Articles({ category, onOpen }){
  const [articles, setArticles] = useState([])

  useEffect(()=>{
    if(!category) return
    fetch(`${API}/categories/${category._id}/articles`).then(r=>r.json()).then(setArticles)
  },[category])

  return (
    <div>
      <h3 className="text-white text-xl font-semibold mb-4">{category?.name}</h3>
      <div className="space-y-3">
        {articles.map(a => (
          <button key={a._id} onClick={()=>onOpen?.(a)} className="w-full text-left bg-slate-800/60 border border-white/10 rounded-xl p-5 hover:border-blue-500/40 transition">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-semibold">{a.title}</div>
                <div className="text-slate-400 text-sm line-clamp-2" dangerouslySetInnerHTML={{__html: a.content}} />
              </div>
              {a._status && <span className={`ml-3 text-xs text-white px-2 py-1 rounded ${statusColors[a._status]}`}>{a._status}</span>}
            </div>
          </button>
        ))}
        {articles.length===0 && <div className="text-slate-300">Brak artykułów</div>}
      </div>
    </div>
  )
}
