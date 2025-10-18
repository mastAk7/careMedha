import { useEffect, useMemo, useRef, useState } from 'react'
import { api, useAuth, toast } from '../state/auth'
import { searchAddress } from '../utils/geocode'

export default function PharmacyAdmin(){
	const { user } = useAuth()
	const [pharmacy, setPharmacy] = useState(null)
	const [q, setQ] = useState('')
	const [inventory, setInventory] = useState([])
	const [editingPriceId, setEditingPriceId] = useState('')
	const [priceDraft, setPriceDraft] = useState('')
	const [newName, setNewName] = useState('')
	const [newPrice, setNewPrice] = useState('')
	const [newStock, setNewStock] = useState('')
	const [loading, setLoading] = useState(false)
	const [name, setName] = useState('')
	const [address, setAddress] = useState('')
	const [addrOptions, setAddrOptions] = useState([])
	const [lat, setLat] = useState('')
	const [lng, setLng] = useState('')
	const [phone, setPhone] = useState('')
	const timer = useRef()
	const addrTimer = useRef()

	useEffect(()=>{ init() },[])
	async function init(){
		try { const p = await api('/me/pharmacy'); setPharmacy(p); setName(p.name||''); setAddress(p.address||''); setLat(p.lat??''); setLng(p.lng??''); setPhone(p.phone||'') } catch(e){ toast('Not a pharmacy admin') }
	}

	useEffect(()=>{ reload() },[pharmacy, q])
	function debounce(fn){ clearTimeout(timer.current); timer.current = setTimeout(fn, 300) }
	async function reload(){
		if (!pharmacy) return
		debounce(async ()=>{
			const inv = await api(`/pharmacies/${pharmacy.id}/inventory${q?`?q=${encodeURIComponent(q)}`:''}`)
			setInventory(inv)
		})
	}

	async function onAddressChange(v){
		setAddress(v)
		if (v.length<3) { setAddrOptions([]); return }
		clearTimeout(addrTimer.current)
		addrTimer.current = setTimeout(async()=>{
			try {
				const opts = await searchAddress(v)
				setAddrOptions(opts)
			} catch {}
		}, 300)
	}

	async function saveProfile(){
		try { await api('/me/pharmacy', { method:'PATCH', body: JSON.stringify({ name, address, lat: lat===''?null:Number(lat), lng: lng===''?null:Number(lng), phone }) }); toast('Pharmacy updated') } catch(e){ toast(e.message) }
	}
	function geolocate(){
		navigator.geolocation?.getCurrentPosition(pos=>{ setLat(pos.coords.latitude); setLng(pos.coords.longitude) }, ()=>toast('Location permission denied'))
	}

	async function addOrUpdateItem(){
		if (!pharmacy || !newName) return
		setLoading(true)
		try {
			await api(`/inventory/${pharmacy.id}`, { method:'POST', body: JSON.stringify({ name: newName, price: newPrice?Number(newPrice):undefined, stockQty: newStock?Number(newStock):undefined }) })
			setNewName(''); setNewPrice(''); setNewStock('')
			reload()
		} catch(e){ toast(e.message) } finally { setLoading(false) }
	}

	async function changePrice(itemId, price){
		await api(`/inventory/${pharmacy.id}/${itemId}`, { method:'PATCH', body: JSON.stringify({ price }) })
		setEditingPriceId('')
		setPriceDraft('')
		reload()
	}
	async function applyStockDelta(itemId, qty, elId){
		const item = inventory.find(i=>i.id===itemId)
		const newQty = (item?.stockQty||0) + qty
		await api(`/inventory/${pharmacy.id}/${itemId}`, { method:'PATCH', body: JSON.stringify({ stockQty: newQty }) })
		// reset quantity input after applying
		if (elId) {
			const el = document.getElementById(elId)
			if (el) el.value = ''
		}
		reload()
	}

	const list = useMemo(()=>inventory, [inventory])
	const needsProfile = !pharmacy?.address || pharmacy.lat==null || pharmacy.lng==null

	return (
		<div>
			{needsProfile && (
				<div className="card mb-4">
					<h2 className="font-semibold">Complete pharmacy profile</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
						<input className="input" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
						<div>
							<input className="input" placeholder="Address" value={address} onChange={e=>onAddressChange(e.target.value)} />
							{addrOptions.length>0 && (
								<div className="mt-1 border rounded bg-white shadow text-sm max-h-40 overflow-auto">
									{addrOptions.map(opt=> (
										<div key={opt.label} className="px-2 py-1 hover:bg-slate-100 cursor-pointer" onClick={()=>{ setAddress(opt.label); setLat(opt.lat); setLng(opt.lng); setAddrOptions([]) }}>{opt.label}</div>
									))}
								</div>
							)}
						</div>
						<input className="input" placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} />
						<input className="input" placeholder="Lat" value={lat} onChange={e=>setLat(e.target.value)} />
						<input className="input" placeholder="Lng" value={lng} onChange={e=>setLng(e.target.value)} />
					</div>
					<div className="mt-2 flex gap-2">
						<button className="btn" onClick={geolocate}>Use my location</button>
						<button className="btn" onClick={saveProfile}>Save</button>
					</div>
				</div>
			)}

			<div className="card">
				<h1 className="text-xl font-semibold">Pharmacy Inventory</h1>
				{pharmacy ? <div className="text-sm text-slate-600 mt-1">{pharmacy.name} — {pharmacy.address}</div> : <div className="text-sm text-slate-600 mt-1">No pharmacy found</div>}
				<div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-2">
					<input className="input md:col-span-3" placeholder="Search medicine" value={q} onChange={e=>{setQ(e.target.value)}} />
					<button className="btn" onClick={()=>reload()}>Refresh</button>
				</div>
			</div>
			<div className="card mt-4">
				<h2 className="font-semibold">Add new item</h2>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-2">
					<input className="input" placeholder="Medicine name" value={newName} onChange={e=>setNewName(e.target.value)} />
					<input className="input" placeholder="Price" value={newPrice} onChange={e=>setNewPrice(e.target.value)} />
					<input className="input" placeholder="Initial Stock" value={newStock} onChange={e=>setNewStock(e.target.value)} />
					<button className="btn" onClick={addOrUpdateItem} disabled={loading}>{loading?'Saving...':'Save'}</button>
				</div>
			</div>
			<div className="mt-4 space-y-2">
				{list.map(i=> (
					<div key={i.id} className="card">
						<div className="flex items-center justify-between">
							<div>
								<div className="font-semibold">{i.medicine?.name}</div>
								<div className="text-sm text-slate-600">Stock: {i.stockQty} · {i.price?`₹${i.price}`:'N/A'}</div>
							</div>
							<div className="flex items-center gap-3">
								<div className="flex items-center gap-2">
									{editingPriceId!==i.id && <button className="btn" onClick={()=>{ setEditingPriceId(i.id); setPriceDraft(i.price??'') }}>Edit price</button>}
									{editingPriceId===i.id && (
										<>
											<input className="input w-28" type="number" value={priceDraft} onChange={e=>setPriceDraft(e.target.value)} placeholder="Price" />
											<button className="btn" onClick={()=>{ const v=Number(priceDraft); if(!isNaN(v)) changePrice(i.id, v) }}>Save</button>
											<button className="btn" onClick={()=>{ setEditingPriceId(''); setPriceDraft('') }}>Cancel</button>
										</>
									)}
								</div>
								<div className="flex items-center gap-1">
									<input id={`qty-${i.id}`} className="input w-20" type="number" placeholder="Qty" />
									<button className="btn" onClick={()=>{ const el=document.getElementById(`qty-${i.id}`); const v=Number(el.value); if(!isNaN(v)) applyStockDelta(i.id, +v, `qty-${i.id}`) }}>+</button>
									<button className="btn" onClick={()=>{ const el=document.getElementById(`qty-${i.id}`); const v=Number(el.value); if(!isNaN(v)) applyStockDelta(i.id, -v, `qty-${i.id}`) }}>-</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
