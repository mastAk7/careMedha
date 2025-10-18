import { useEffect, useRef, useState, useMemo } from 'react'
import { api, toast } from '../state/auth'
import { searchAddress } from '../utils/geocode'

function fmtDateTime(d){ return new Date(d).toLocaleString() }
function minutesBetween(a,b){ return Math.max(1, Math.round((new Date(b)-new Date(a))/60000)) }
function dayKey(d){ const x=new Date(d); return x.toDateString() }

export default function DoctorDashboard(){
	const [doctor, setDoctor] = useState(null)
	const [appointments, setAppointments] = useState([])
	const [slots, setSlots] = useState([])
	const [startAt, setStartAt] = useState('')
	const [endAt, setEndAt] = useState('')
	const [every, setEvery] = useState('30m')
	const [capacity, setCapacity] = useState(1)
	const [loading, setLoading] = useState(false)

	// profile fields
	const [specialization, setSpecialization] = useState('')
	const [clinicName, setClinicName] = useState('')
	const [clinicAddress, setClinicAddress] = useState('')
	const [addrOptions, setAddrOptions] = useState([])
	const [lat, setLat] = useState('')
	const [lng, setLng] = useState('')
	const [fee, setFee] = useState('')
	const addrTimer = useRef()

	useEffect(()=>{ init() },[])
	async function init(){
		try {
			const d = await api('/me/doctor');
			setDoctor(d);
			setSpecialization(d.specialization||''); setClinicName(d.clinicName||''); setClinicAddress(d.clinicAddress||''); setLat(d.lat??''); setLng(d.lng??''); setFee(d.fee??'')
			await load(d.id)
		} catch(e){ toast('Not a doctor') }
	}
	async function load(doctorId){
		try { const appts = await api('/appointments/my'); setAppointments(appts.filter(a=>a.status!=='CANCELLED')) } catch {}
		try {
			const id = doctorId || doctor?.id || (await api('/me/doctor')).id
			const s = await api(`/doctors/${id}/slots?from=${encodeURIComponent(new Date().toISOString())}`)
			setSlots(s)
		} catch {}
	}

	function applyPreset(range){
		const now = new Date()
		let s = new Date(now), e = new Date(now)
		if (range==='NEXT_2H') { e = new Date(s.getTime()+2*60*60000) }
		if (range==='MORNING') { s.setHours(9,0,0,0); e.setHours(12,0,0,0) }
		if (range==='AFTERNOON') { s.setHours(12,0,0,0); e.setHours(16,0,0,0) }
		if (range==='EVENING') { s.setHours(16,0,0,0); e.setHours(20,0,0,0) }
		setStartAt(s.toISOString().slice(0,16))
		setEndAt(e.toISOString().slice(0,16))
	}

	async function addSlot(){
		if (!startAt || !endAt || !every || !capacity) { toast('Please fill all fields'); return }
		setLoading(true)
		try {
			const payload = { blocks:[{ startAt, endAt, every }], capacity: Number(capacity)||1 }
			await api('/slots', { method:'POST', body: JSON.stringify(payload) })
			toast('Slots created')
			setStartAt(''); setEndAt(''); setEvery('30m'); setCapacity(1)
			await load()
		} catch(e){ toast(`Failed to create: ${e.message}`) } finally { setLoading(false) }
	}

	async function deleteSlot(slotId){
		try { await api(`/slots/${slotId}`, { method:'DELETE' }); toast('Slot deleted'); await load() } catch(e){ toast(e.message) }
	}

	async function updateSlot(slotId, patch){
		try { await api(`/slots/${slotId}`, { method:'PATCH', body: JSON.stringify(patch) }); await load() } catch(e){ toast(e.message) }
	}

	async function onAddressChange(v){
		setClinicAddress(v)
		setAddrOptions([])
		clearTimeout(addrTimer.current)
		if (v.length < 3) return
		addrTimer.current = setTimeout(async ()=>{
			const opts = await searchAddress(v)
			setAddrOptions(opts)
		}, 300)
	}

	function geolocate(){
		navigator.geolocation?.getCurrentPosition(pos=>{ setLat(pos.coords.latitude); setLng(pos.coords.longitude) }, ()=>toast('Location permission denied'))
	}
	async function saveProfile(){
		try {
			await api('/me/doctor', { method:'PATCH', body: JSON.stringify({ specialization, clinicName, clinicAddress, lat: lat===''?null:Number(lat), lng: lng===''?null:Number(lng), fee: fee===''?null:Number(fee) }) })
			toast('Profile updated')
		} catch(e){ toast(e.message) }
	}

	const needsProfile = !doctor?.specialization || !doctor?.clinicAddress

	const groupedSlots = useMemo(()=>{
		const map = new Map()
		slots.forEach(s=>{
			const k = dayKey(s.startAt)
			if (!map.has(k)) map.set(k, [])
			map.get(k).push(s)
		})
		return Array.from(map.entries())
	},[slots])

	return (
		<div>
			{needsProfile && (
				<div className="card mb-4">
					<h2 className="font-semibold">Complete your profile</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
						<input className="input" placeholder="Specialization" value={specialization} onChange={e=>setSpecialization(e.target.value)} />
						<input className="input" placeholder="Clinic name" value={clinicName} onChange={e=>setClinicName(e.target.value)} />
						<div>
							<input className="input" placeholder="Clinic address" value={clinicAddress} onChange={e=>onAddressChange(e.target.value)} />
							{addrOptions.length>0 && (
								<div className="mt-1 border rounded bg-white shadow text-sm max-h-40 overflow-auto">
									{addrOptions.map(opt=> (
										<div key={opt.label} className="px-2 py-1 hover:bg-slate-100 cursor-pointer" onClick={()=>{ setClinicAddress(opt.label); setLat(opt.lat); setLng(opt.lng); setAddrOptions([]) }}>{opt.label}</div>
									))}
								</div>
							)}
						</div>
						<input className="input" placeholder="Lat" value={lat} onChange={e=>setLat(e.target.value)} />
						<input className="input" placeholder="Lng" value={lng} onChange={e=>setLng(e.target.value)} />
						<input className="input" placeholder="Fee" value={fee} onChange={e=>setFee(e.target.value)} />
					</div>
					<div className="mt-2 flex gap-2">
						<button className="btn" onClick={geolocate}>Use my location</button>
						<button className="btn" onClick={saveProfile}>Save</button>
					</div>
				</div>
			)}

			<div className="card">
				<h1 className="text-xl font-semibold">Doctor Dashboard</h1>
				<div className="text-sm text-slate-600">Create slots quickly using presets, interval, and capacity.</div>
				<div className="grid grid-cols-1 md:grid-cols-6 gap-2 mt-2 items-center">
					<input className="input" type="datetime-local" value={startAt} onChange={e=>setStartAt(e.target.value)} placeholder="Start" />
					<input className="input" type="datetime-local" value={endAt} onChange={e=>setEndAt(e.target.value)} placeholder="End" />
					<select className="input" value={every} onChange={e=>setEvery(e.target.value)}>
						<option>15m</option>
						<option>30m</option>
						<option>45m</option>
						<option>60m</option>
					</select>
					<div className="flex items-center gap-2">
						<button className="btn" onClick={()=>setCapacity(Math.max(1, capacity-1))}>-</button>
						<input className="input w-16 text-center" type="number" value={capacity} onChange={e=>setCapacity(Math.max(1, Number(e.target.value)||1))} />
						<button className="btn" onClick={()=>setCapacity(capacity+1)}>+</button>
					</div>
					<button className="btn" onClick={addSlot} disabled={loading}>{loading?'Adding...':'Add Slots'}</button>
				</div>
				<div className="mt-2 flex flex-wrap gap-2 text-sm">
					<span className="text-slate-600">Presets:</span>
					<button className="btn" onClick={()=>applyPreset('NEXT_2H')}>Next 2 hours</button>
					<button className="btn" onClick={()=>applyPreset('MORNING')}>Morning (9–12)</button>
					<button className="btn" onClick={()=>applyPreset('AFTERNOON')}>Afternoon (12–16)</button>
					<button className="btn" onClick={()=>applyPreset('EVENING')}>Evening (16–20)</button>
				</div>
			</div>
			<div className="card mt-4">
				<h2 className="font-semibold">Upcoming slots</h2>
				<div className="mt-2 space-y-3">
					{groupedSlots.map(([day, items])=> (
						<div key={day}>
							<div className="text-sm font-medium text-slate-600 mb-1">{day}</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
								{items.map(s=> (
									<div key={s.id} className={`border rounded p-3 text-sm flex items-center justify-between ${s.isOpen?'' : 'bg-slate-50'}`}>
										<div>
											<div className="font-medium">{new Date(s.startAt).toLocaleTimeString()} - {new Date(s.endAt).toLocaleTimeString()} <span className="text-slate-500">({minutesBetween(s.startAt,s.endAt)}m)</span></div>
											<div className="text-slate-600">cap {s.capacity} · booked {s.booked} · {s.isOpen?'open':'closed'}</div>
										</div>
										<div className="flex gap-2">
											<button className="btn" disabled={s.booked>0} onClick={()=>updateSlot(s.id, { capacity: s.capacity+1 })}>Cap +1</button>
											<button className="btn" disabled={s.booked>0 || s.capacity<=1} onClick={()=>updateSlot(s.id, { capacity: s.capacity-1 })}>Cap -1</button>
											<button className="btn" disabled={s.booked>0} onClick={()=>updateSlot(s.id, { isOpen: !s.isOpen })}>{s.isOpen?'Close':'Open'}</button>
											<button className="btn" disabled={s.booked>0} onClick={()=>deleteSlot(s.id)}>Delete</button>
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="card mt-4">
				<h2 className="font-semibold">Appointments</h2>
				<div className="mt-2 space-y-2">
					{appointments.map(a=> (
						<div key={a.id} className="border rounded p-3 text-sm">
							<div className="font-medium">{a.patient?.user?.name || 'Patient'} · {a.status}</div>
							{a.slot ? (
								<div className="text-slate-600">{new Date(a.slot.startAt).toLocaleDateString()} · {new Date(a.slot.startAt).toLocaleTimeString()} - {new Date(a.slot.endAt).toLocaleTimeString()} · {minutesBetween(a.slot.startAt, a.slot.endAt)}m · mode {a.mode || '—'}</div>
							) : (
								<div className="text-slate-600">No slot assigned</div>
							)}
							{a.reason && <div className="text-slate-600">Reason: {a.reason}</div>}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
