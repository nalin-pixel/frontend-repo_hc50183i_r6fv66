import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL

export default function Dashboard({ onSelectCategory }){
  const [categories, setCategories] = useState([])

  useEffect(()=>{
    fetch(`${API}/categories`).then(r=>r.json()).then(setCategories)
  },[])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map(c => (
        <button key={c._id} onClick={()=>onSelectCategory?.(c)} className="text-left bg-slate-800/60 border border-white/10 rounded-xl p-5 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition">
          <div className="text-lg font-semibold text-white">{c.name}</div>
          <div className="text-slate-300 text-sm mt-1">{c.description}</div>
        </button>
      ))}
      {categories.length===0 && <div className="text-slate-300">Brak kategorii</div>}
    </div>
  )
}
