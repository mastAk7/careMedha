import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../state/auth'

export default function Signup(){
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')
	const { signup, error, loading, user } = useAuth()
	const nav = useNavigate()

	if (user) { nav('/triage', { replace:true }); return null }

	async function onSubmit(e){
		e.preventDefault()
		const ok = await signup({ name, email, phone, password })
		if (ok) nav('/triage', { replace:true })
	}

	const friendly = error ? (error.includes('Unique constraint') ? 'Email already in use' : error) : ''

	return (
		<div className="max-w-md mx-auto card">
			<h1 className="text-xl font-semibold mb-4">Create account</h1>
			<form onSubmit={onSubmit} className="space-y-3">
				<label className="label">Name</label>
				<input className="input" value={name} onChange={e=>setName(e.target.value)} />
				<label className="label">Email</label>
				<input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
				<label className="label">Phone</label>
				<input className="input" value={phone} onChange={e=>setPhone(e.target.value)} />
				<label className="label">Password</label>
				<input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
				{friendly && <div className="text-sm text-red-600">{friendly}</div>}
				<button className="btn w-full" disabled={loading}>{loading?'Creating...':'Create account'}</button>
			</form>
		</div>
	)
}
