import { useEffect, useMemo, useRef, useState } from 'react'
import { api } from '../state/auth'

export default function PharmacySearch(){
	const [q, setQ] = useState('')
	const [lat, setLat] = useState(null)
	const [lng, setLng] = useState(null)
	const [items, setItems] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const timer = useRef()

	useEffect(()=>{
		navigator.geolocation?.getCurrentPosition(
			(pos)=>{ setLat(pos.coords.latitude); setLng(pos.coords.longitude) },
			()=>{}
		)
		loadPharmacies()
	},[])

	async function loadPharmacies(){
		try {
			const phs = await api(`/pharmacies${lat&&lng?`?lat=${lat}&lng=${lng}`:''}`)
			setItems(phs)
		} catch(e){ setError(e.message) }
	}

	useEffect(()=>{
		clearTimeout(timer.current)
		timer.current = setTimeout(async()=>{
			if (!q.trim()) { await loadPharmacies(); return }
			setLoading(true); setError('')
			try {
				// query inventory across pharmacies, filter those having the medicine
				const phs = await api(`/pharmacies${lat&&lng?`?lat=${lat}&lng=${lng}`:''}`)
				const results = []
				for (const p of phs){
					const inv = await api(`/pharmacies/${p.id}/inventory?q=${encodeURIComponent(q)}`)
					if (inv?.length) results.push({ ...p, has: inv.map(i=>({ id:i.id, name:i.medicine?.name, price:i.price, stock:i.stockQty })) })
				}
				setItems(results)
			} catch(e){ setError(e.message) } finally { setLoading(false) }
		}, 300)
		return ()=> clearTimeout(timer.current)
	}, [q, lat, lng])

	const sorted = useMemo(()=> items.slice().sort((a,b)=> (a.distanceKm??1e9) - (b.distanceKm??1e9)), [items])

	function shortAddr(address){
		const a = address||''
		return a.length>80 ? `${a.slice(0,80)}…` : a
	}

	return (
		<div>
			<div className="card">
				<h1 className="text-xl font-semibold">Find medicine</h1>
				<div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-2">
					<input className="input md:col-span-3" placeholder="Paracetamol" value={q} onChange={e=>setQ(e.target.value)} />
					{loading ? <button className="btn" disabled>Searching...</button> : <button className="btn" onClick={()=>{}} disabled>Search</button>}
				</div>
				{error && <div className="text-sm text-red-600 mt-2">{error}</div>}
			</div>
			<div className="mt-4 space-y-2">
				{loading && Array.from({length:4}).map((_,i)=> (
					<div key={i} className="card animate-pulse">
						<div className="flex items-center justify-between">
							<div className="space-y-2">
								<div className="h-4 w-40 bg-slate-200 rounded"></div>
								<div className="h-3 w-60 bg-slate-200 rounded"></div>
							</div>
							<div className="h-4 w-12 bg-slate-200 rounded"></div>
						</div>
						<div className="mt-2 h-3 w-2/3 bg-slate-200 rounded"></div>
					</div>
				))}
				{!loading && sorted.length===0 && (
					<div className="card text-center">
						<div className="text-slate-700 font-medium">No pharmacies found nearby</div>
						<div className="subtle mt-1">Try broadening your search or enabling location</div>
					</div>
				)}
				{!loading && sorted.map(p=> (
					<div key={p.id} className="card">
						<div className="flex items-center justify-between">
							<div>
								<div className="font-semibold">{p.name}</div>
								<div className="text-sm text-slate-600">{shortAddr(p.address)}</div>
							</div>
							<div className="text-sm text-slate-600">{p.distanceKm ? `${p.distanceKm.toFixed(1)} km` : ''}</div>
						</div>
						{p.has && <div className="mt-2 text-sm">Available: {p.has.map(h=>h.name).join(', ')}</div>}
					</div>
				))}
			</div>
		</div>
	)
}
