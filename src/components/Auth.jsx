import { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL

export default function Auth({ onSuccess }){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try{
      if(mode==='login'){
        const body = new URLSearchParams()
        body.append('username', email)
        body.append('password', password)
        const res = await fetch(`${API}/auth/login`, { method:'POST', body })
        const data = await res.json()
        if(!res.ok) throw new Error(data.detail || 'Błąd logowania')
        localStorage.setItem('token', data.access_token)
        onSuccess?.()
      } else {
        const res = await fetch(`${API}/auth/register`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) })
        const data = await res.json()
        if(!res.ok) throw new Error(data.detail || 'Błąd rejestracji')
        localStorage.setItem('token', data.access_token)
        onSuccess?.()
      }
    }catch(err){ setError(err.message) }
    finally{ setLoading(false) }
  }

  const reset = async () => {
    setLoading(true); setError('')
    try{
      const res = await fetch(`${API}/auth/reset-password`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, new_password: password }) })
      const data = await res.json()
      if(!res.ok) throw new Error(data.detail || 'Błąd resetu hasła')
      setMode('login')
    }catch(err){ setError(err.message) }
    finally{ setLoading(false) }
  }

  return (
    <div className="max-w-md mx-auto bg-slate-800/60 rounded-xl p-6 border border-white/10">
      <h2 className="text-white text-xl font-semibold mb-4">{mode==='login'?'Logowanie':'Rejestracja'}</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 rounded-md bg-slate-900 text-slate-100 border border-white/10" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Hasło" className="w-full px-3 py-2 rounded-md bg-slate-900 text-slate-100 border border-white/10" />
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <button disabled={loading} className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md">{loading? '...' : (mode==='login'?'Zaloguj':'Zarejestruj')}</button>
      </form>
      <div className="flex justify-between mt-3 text-sm text-slate-300">
        <button className="underline" onClick={()=>setMode(mode==='login'?'register':'login')}>{mode==='login'?'Utwórz konto':'Masz konto? Zaloguj'}</button>
        <button className="underline" onClick={reset}>Reset hasła</button>
      </div>
    </div>
  )
}
