const NOMINATIM = 'https://nominatim.openstreetmap.org'

export async function searchAddress(query){
	if (!query?.trim()) return []
	const url = `${NOMINATIM}/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`
	const res = await fetch(url, { headers:{ 'Accept-Language':'en' } })
	const data = await res.json()
	return data.map(it=>({
		label: it.display_name,
		lat: Number(it.lat),
		lng: Number(it.lon)
	}))
}

export async function reverseGeocode(lat, lng){
	const url = `${NOMINATIM}/reverse?format=json&lat=${lat}&lon=${lng}`
	const res = await fetch(url)
	const data = await res.json()
	return data?.display_name || ''
}


