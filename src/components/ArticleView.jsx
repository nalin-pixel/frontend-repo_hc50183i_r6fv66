import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL

const statuses = ['Przeczytane', 'Wymaga powtórki', 'Wyróżnione']

export default function ArticleView({ article, onBack }){
  const [status, setStatus] = useState(null)

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(!token || !article) return
    fetch(`${API}/articles/${article._id}/status`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r=>r.json()).then(d=>setStatus(d.status||d?.status))
  },[article])

  const update = async (s) => {
    const token = localStorage.getItem('token')
    if(!token) return
    const res = await fetch(`${API}/articles/${article._id}/status`, { method:'POST', headers:{ 'Content-Type':'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ status: s }) })
    if(res.ok) setStatus(s)
  }

  return (
    <div>
      <button onClick={onBack} className="text-slate-300 underline mb-4">← Powrót</button>
      <h2 className="text-white text-2xl font-bold mb-2">{article.title}</h2>
      <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{__html: article.content}} />
      {article.bibliography && (
        <div className="mt-6">
          <div className="text-slate-200 font-semibold">Bibliografia</div>
          <div className="text-slate-300" dangerouslySetInnerHTML={{__html: article.bibliography}} />
        </div>
      )}
      <div className="mt-6 flex gap-2">
        {statuses.map(s => (
          <button key={s} onClick={()=>update(s)} className={`px-3 py-2 rounded bg-slate-700 text-white ${status===s?'ring-2 ring-blue-500':''}`}>{s}</button>
        ))}
      </div>
    </div>
  )
}
