import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../state/auth'

export default function Join(){
	const { appointmentId } = useParams()
	const [joinCode, setJoinCode] = useState('')
	const [error, setError] = useState('')

	useEffect(()=>{ init() },[])
	async function init(){
		try {
			const data = await api(`/sessions/${appointmentId}/init`)
			setJoinCode(data.joinCode)
		} catch(e){ setError(e.message) }
	}

	return (
		<div className="max-w-2xl mx-auto card">
			<h1 className="text-xl font-semibold">Consultation Room</h1>
			{error && <div className="text-red-600 text-sm">{error}</div>}
			<div className="mt-2 text-sm text-slate-600">Join Code: <span className="font-mono">{joinCode}</span></div>
			<div className="mt-4 h-64 bg-slate-100 rounded-md flex items-center justify-center text-slate-500">Video/Audio placeholder</div>
		</div>
	)
}


