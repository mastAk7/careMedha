import { useEffect, useMemo, useState } from 'react'
import { api, toast } from '../state/auth'
import { useAuth } from '../state/auth'

export default function Consult(){
	const [q, setQ] = useState('')
	const [doctors, setDoctors] = useState([])
	const [slotsByDoctor, setSlotsByDoctor] = useState({})
	const [myAppointments, setMyAppointments] = useState([])
	const [loading, setLoading] = useState(false)
	const { user } = useAuth()

	useEffect(()=>{ load() },[])
	async function load(){
		setLoading(true)
		try {
			const list = await api('/doctors')
			setDoctors(list)
			try { const appts = await api('/appointments/my'); setMyAppointments(appts) } catch {}
			const from = new Date().toISOString()
			const fetched = {}
			for (const d of list){
				try { fetched[d.id] = await api(`/doctors/${d.id}/slots?from=${encodeURIComponent(from)}`) } catch { fetched[d.id] = [] }
			}
			setSlotsByDoctor(fetched)
		} finally { setLoading(false) }
	}

	const filtered = useMemo(()=>{
		const s = q.trim().toLowerCase()
		if (!s) return doctors
		return doctors.filter(d=> d.user?.name?.toLowerCase().includes(s) || d.specialization?.toLowerCase().includes(s))
	},[q, doctors])

	async function book(doctorId, slotId){
		try {
			await api('/appointments', { method:'POST', body: JSON.stringify({ doctorId, slotId, mode:'AUDIO' }) })
			toast('Appointment booked')
			await load() // reload to get populated relations and status
		} catch(e){
			if (String(e.message).toLowerCase().includes('forbidden')) toast('Please login as a patient to book a slot')
			else toast(`Booking failed: ${e.message}`)
		}
	}

	async function cancel(apptId){
		try { await api(`/appointments/${apptId}`, { method:'DELETE' }); toast('Appointment cancelled'); setMyAppointments(prev=>prev.filter(a=>a.id!==apptId)) } catch(e){ toast(e.message) }
	}

	const activeAppointments = useMemo(()=> (myAppointments||[]).filter(a=>a.status!=='CANCELLED'), [myAppointments])

	return (
		<div>
			<div className="card">
				<h1 className="text-xl font-semibold">Consult a doctor</h1>
				<input className="input mt-3" placeholder="Search by name or specialization" value={q} onChange={e=>setQ(e.target.value)} />
			</div>
			{user && activeAppointments.length>0 && (
				<div className="card mt-4">
					<h2 className="font-semibold">Your appointments</h2>
					<ul className="text-sm pl-0 mt-2 space-y-2">
						{activeAppointments.map(a=> {
							const doctorName = a.doctor?.user?.name || 'Doctor'
							return (
								<li key={a.id} className="flex items-center justify-between">
									<div>• Status: {a.status} — Doctor: {doctorName} {a.slot ? `· ${new Date(a.slot.startAt).toLocaleString()}` : ''}</div>
									{a.status==='BOOKED' && <button className="btn" onClick={()=>cancel(a.id)}>Cancel</button>}
								</li>
							)
						})}
					</ul>
				</div>
			)}
			<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
				{loading && Array.from({length:4}).map((_,i)=> (
					<div key={i} className="card animate-pulse">
						<div className="h-4 w-1/3 bg-slate-200 rounded"></div>
						<div className="mt-2 h-3 w-1/2 bg-slate-200 rounded"></div>
						<div className="mt-3 grid grid-cols-2 gap-2">
							<div className="h-9 rounded-full bg-slate-200"></div>
							<div className="h-9 rounded-full bg-slate-200"></div>
						</div>
					</div>
				))}
				{!loading && filtered.length===0 && (
					<div className="col-span-2 card text-center">
						<div className="text-slate-700 font-medium">No doctors match your search</div>
						<div className="subtle mt-1">Try a different name or specialization</div>
					</div>
				)}
				{!loading && filtered.map(d=> (
					<div key={d.id} className="card">
						<div className="font-semibold">{d.user?.name}</div>
						<div className="text-sm text-slate-600">{d.specialization} {d.fee?`· ₹${d.fee}`:''}</div>
						<div className="mt-2">
							<div className="text-sm font-medium">Available slots</div>
							<div className="mt-1 grid grid-cols-2 gap-2">
								{(slotsByDoctor[d.id]||[]).length===0 && <div className="text-sm text-slate-500 col-span-2">No open slots</div>}
								{(slotsByDoctor[d.id]||[]).map(s=> (
									<button key={s.id} className="btn" onClick={()=>book(d.id, s.id)}>
										Book {new Date(s.startAt).toLocaleString()}
									</button>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
