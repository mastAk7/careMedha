import { useEffect, useState } from 'react'
import { api, toast } from '../state/auth'

export default function SuperAdmin(){
	const [pharmacies, setPharmacies] = useState([])
	const [phName, setPhName] = useState('')
	const [phAddr, setPhAddr] = useState('')
	const [phLat, setPhLat] = useState('')
	const [phLng, setPhLng] = useState('')
	const [email, setEmail] = useState('')
	const [specialization, setSpecialization] = useState('')
	const [promPharmacyId, setPromPharmacyId] = useState('')
	const [medName, setMedName] = useState('')
	const [medForm, setMedForm] = useState('')
	const [medStrength, setMedStrength] = useState('')
	const [busy, setBusy] = useState(false)

	useEffect(()=>{ load() },[])
	async function load(){
		try { setPharmacies(await api('/pharmacies')) } catch {}
	}
	async function createPharmacy(){
		if (!phName.trim()) { toast('Pharmacy name required'); return }
		setBusy(true)
		try {
			await api('/pharmacies',{ method:'POST', body: JSON.stringify({ name: phName, address: phAddr||undefined, lat: phLat?Number(phLat):undefined, lng: phLng?Number(phLng):undefined }) })
			toast('Pharmacy created'); setPhName(''); setPhAddr(''); setPhLat(''); setPhLng(''); load()
		} catch(e){ toast(`Create failed: ${e.message}`) } finally { setBusy(false) }
	}
	async function promoteDoctor(){
		if (!email.trim()) { toast('Email required'); return }
		if (!specialization.trim()) { toast('Specialization required'); return }
		setBusy(true)
		try {
			await api('/admin/promote/doctor', { method:'POST', body: JSON.stringify({ email: email.trim(), specialization: specialization.trim() }) })
			toast('Promoted to doctor')
		} catch(e){ toast(`Promote failed: ${e.message}`) } finally { setBusy(false) }
	}
	async function promotePharmacyAdmin(){
		if (!email.trim()) { toast('Email required'); return }
		if (!promPharmacyId) { toast('Select a pharmacy'); return }
		setBusy(true)
		try {
			await api('/admin/promote/pharmacy-admin', { method:'POST', body: JSON.stringify({ email: email.trim(), pharmacyId: promPharmacyId }) })
			toast('Promoted to pharmacy admin')
		} catch(e){ toast(`Promote failed: ${e.message}`) } finally { setBusy(false) }
	}
	async function createMedicine(){
		if (!medName.trim()) { toast('Medicine name required'); return }
		setBusy(true)
		try {
			await api('/medicines', { method:'POST', body: JSON.stringify({ name: medName.trim(), form: medForm||undefined, strength: medStrength||undefined }) })
			toast('Medicine created'); setMedName(''); setMedForm(''); setMedStrength('')
		} catch(e){ toast(`Create failed: ${e.message}`) } finally { setBusy(false) }
	}

	return (
		<div className="space-y-4">
			<div className="card">
				<h1 className="text-xl font-semibold">Superadmin Panel</h1>
			</div>
			<div className="card">
				<h2 className="font-semibold">Create Pharmacy</h2>
				<div className="grid grid-cols-1 md:grid-cols-5 gap-2 mt-2">
					<input className="input" placeholder="Name" value={phName} onChange={e=>setPhName(e.target.value)} />
					<input className="input" placeholder="Address" value={phAddr} onChange={e=>setPhAddr(e.target.value)} />
					<input className="input" placeholder="Lat" value={phLat} onChange={e=>setPhLat(e.target.value)} />
					<input className="input" placeholder="Lng" value={phLng} onChange={e=>setPhLng(e.target.value)} />
					<button className="btn" disabled={busy} onClick={createPharmacy}>Create</button>
				</div>
			</div>
			<div className="card">
				<h2 className="font-semibold">Promote User</h2>
				<div className="grid grid-cols-1 md:grid-cols-5 gap-2 mt-2">
					<input className="input md:col-span-2" placeholder="User email" value={email} onChange={e=>setEmail(e.target.value)} />
					<input className="input" placeholder="Doctor specialization" value={specialization} onChange={e=>setSpecialization(e.target.value)} />
					<select className="input" value={promPharmacyId} onChange={e=>setPromPharmacyId(e.target.value)}>
						<option value="">Select pharmacy</option>
						{pharmacies.map(p=> <option key={p.id} value={p.id}>{p.name}</option>)}
					</select>
					<div className="flex gap-2">
						<button className="btn" disabled={busy || !email || !specialization} onClick={promoteDoctor}>To Doctor</button>
						<button className="btn" disabled={busy || !email || !promPharmacyId} onClick={promotePharmacyAdmin}>To Pharmacy Admin</button>
					</div>
				</div>
			</div>
			<div className="card">
				<h2 className="font-semibold">Create Medicine</h2>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-2">
					<input className="input" placeholder="Name" value={medName} onChange={e=>setMedName(e.target.value)} />
					<input className="input" placeholder="Form" value={medForm} onChange={e=>setMedForm(e.target.value)} />
					<input className="input" placeholder="Strength" value={medStrength} onChange={e=>setMedStrength(e.target.value)} />
					<button className="btn" disabled={busy || !medName} onClick={createMedicine}>Create</button>
				</div>
			</div>
		</div>
	)
}

