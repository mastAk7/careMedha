import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../state/auth'

export default function Login(){
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')
	const { login, error, loading, user } = useAuth()
	const nav = useNavigate()
	const loc = useLocation()

	if (user) { nav(loc.state?.from?.pathname || '/triage', { replace:true }); return null }

	async function onSubmit(e){
		e.preventDefault()
		await login({ email: email||undefined, phone: phone||undefined, password })
	}

	const friendly = error ? (error.includes('Invalid credentials') ? 'Invalid email/phone or password' : error) : ''

	return (
		<div className="max-w-md mx-auto card">
			<h1 className="text-xl font-semibold mb-4">Login</h1>
			<form onSubmit={onSubmit} className="space-y-3">
				<label className="label">Email</label>
				<input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
				<div className="text-center text-sm text-slate-500">or</div>
				<label className="label">Phone</label>
				<input className="input" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="9876543210" />
				<label className="label">Password</label>
				<input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
				{friendly && <div className="text-sm text-red-600">{friendly}</div>}
				<button className="btn w-full" disabled={loading}>{loading?'Signing in...':'Login'}</button>
			</form>
			<p className="mt-4 text-sm">No account? <Link to="/signup" className="link">Signup</Link></p>
		</div>
	)
}
