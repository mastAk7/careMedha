import { useState } from 'react'
import { api } from '../state/auth'
import { Link } from 'react-router-dom'

const LEVEL_LABEL = {
	self_care: 'Self care',
	consultation: 'Consultation',
	emergency: 'Emergency'
}

export default function Triage(){
	const [text, setText] = useState('')
	const [result, setResult] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	async function onSubmit(e){
		e.preventDefault()
		setLoading(true); setError('')
		try {
			const data = await api('/triage', { method:'POST', body: JSON.stringify({ text }) })
			setResult(data)
		} catch(e){ setError(e.message) } finally { setLoading(false) }
	}

	function Actions(){
		const level = result?.triage_level || result?.level
		if (!level) return null
		return (
			<div className="mt-3 flex gap-2 flex-wrap">
				{(level==='self_care' || level==='consultation') && <Link to="/pharmacy" className="btn">Find pharmacy</Link>}
				{(level==='consultation' || level==='emergency') && <Link to="/consult" className="btn">Consult a doctor</Link>}
				{level==='emergency' && <a href="tel:112" className="btn">Call Emergency</a>}
			</div>
		)
	}

	return (
		<div className="max-w-2xl mx-auto">
			<div className="card">
				<h1 className="text-xl font-semibold">Describe your symptoms</h1>
				<form onSubmit={onSubmit} className="mt-3 space-y-3">
					<textarea className="input min-h-[120px]" value={text} onChange={e=>setText(e.target.value)} placeholder="Fever since 2 days..." />
					<button className="btn" disabled={loading || !text.trim()}>{loading?'Analyzing...':'Check symptoms'}</button>
				</form>
				{error && <div className="text-sm text-red-600 mt-2">{error}</div>}
			</div>
			{result && (
				<div className="card mt-4">
					<h2 className="font-semibold">Result: {LEVEL_LABEL[result?.triage_level || result?.level] || '—'}</h2>
					{result.summary_of_symptoms && <p className="text-sm text-slate-700 mt-2">{result.summary_of_symptoms}</p>}
					{result.recommendation_text_punjabi && <p className="text-sm text-slate-700 mt-1">{result.recommendation_text_punjabi}</p>}
					<Actions />
				</div>
			)}
		</div>
	)
}
