import { create } from 'zustand'

const API_BASE = import.meta.env.VITE_API_BASE || '/api'

async function api(path, opts={}){
	const res = await fetch(API_BASE + path, { credentials: 'include', headers: { 'Content-Type':'application/json' }, ...opts })
	let data = null
	try { data = await res.json() } catch {}
	if (!res.ok) {
		const msg = data?.error || data?.message || `${res.status} ${res.statusText}`
		throw new Error(msg)
	}
	return data
}

function toast(message){
	alert(message)
}

export const useAuth = create((set, get) => ({
	user: null,
	loading: false,
	error: null,
	async fetchMe(){
		set({ loading: true })
		try {
			const data = await api('/auth/me')
			set({ user: data.user, loading:false, error:null })
		} catch {
			set({ user: null, loading:false, error:null })
		}
	},
	async login(payload){
		set({ loading:true, error:null })
		try {
			const data = await api('/auth/login', { method:'POST', body: JSON.stringify(payload) })
			set({ user: data.user, loading:false })
			toast('Logged in successfully')
			return true
		} catch(e){ set({ error: e.message, loading:false }); toast(`Login failed: ${e.message}`); return false }
	},
	async signup(payload){
		set({ loading:true, error:null })
		try {
			const data = await api('/auth/signup', { method:'POST', body: JSON.stringify(payload) })
			set({ user: data.user, loading:false })
			toast('Account created')
			return true
		} catch(e){ set({ error: e.message, loading:false }); toast(`Signup failed: ${e.message}`); return false }
	},
	async logout(){
		try { await api('/auth/logout', { method:'POST' }) } catch {}
		set({ user:null })
		toast('Logged out')
	}
}))

export { api, toast }
