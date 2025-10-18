import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from './state/auth'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Triage from './pages/Triage'
import PharmacySearch from './pages/PharmacySearch'
import Consult from './pages/Consult'
import PharmacyAdmin from './pages/PharmacyAdmin'
import DoctorDashboard from './pages/DoctorDashboard'
import Join from './pages/Join'
import SuperAdmin from './pages/SuperAdmin'

function Nav() {
	const { user, logout, loading, fetchMe } = useAuth()
	useEffect(()=>{ fetchMe() },[])
	const [menuOpen, setMenuOpen] = useState(false)
	useEffect(()=>{
		function onResize(){ if (window.innerWidth >= 768) setMenuOpen(false) }
		window.addEventListener('resize', onResize)
		return ()=> window.removeEventListener('resize', onResize)
	},[])
	return (
		<nav>
			<div className="container h-16 flex items-center justify-between">
				<div className="flex items-center gap-6">
					<Link to="/" className="brand">CareMedha</Link>
					<div className="hidden md:flex items-center gap-4">
						<Link to="/triage">Triage</Link>
						<Link to="/pharmacy">Pharmacy</Link>
						<Link to="/consult">Consult</Link>
						{user?.role==='DOCTOR' && <Link to="/doctor" className="font-medium">Doctor</Link>}
						{user?.role==='PHARMACY_ADMIN' && <Link to="/pharmacy-admin" className="font-medium">Pharmacy Admin</Link>}
						{user?.role==='SUPERADMIN' && <Link to="/superadmin" className="font-medium">Superadmin</Link>}
					</div>
				</div>
				<div className="flex items-center gap-2">
					<button className="btn-outline mobile-toggle" aria-label="Toggle menu" onClick={()=>setMenuOpen(o=>!o)}>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<line x1="3" y1="6" x2="21" y2="6"></line>
							<line x1="3" y1="12" x2="21" y2="12"></line>
							<line x1="3" y1="18" x2="21" y2="18"></line>
						</svg>
					</button>
					{loading ? <span className="text-sm text-slate-500">Loading...</span> : user ? (
						<>
							<span className="text-sm text-slate-700">{user.name} ({user.role})</span>
							<button className="btn" onClick={logout}>Logout</button>
						</>
					) : (
						<>
							<Link to="/login" className="btn-outline">Log in</Link>
							<Link to="/signup" className="btn">Sign up</Link>
						</>
					)}
				</div>
			</div>
			{/* Mobile dropdown */}
			{menuOpen && (
				<div className="md:hidden border-t border-slate-200 bg-white/95">
					<div className="container py-3 flex flex-col gap-2">
						<Link to="/triage" onClick={()=>setMenuOpen(false)}>Triage</Link>
						<Link to="/pharmacy" onClick={()=>setMenuOpen(false)}>Pharmacy</Link>
						<Link to="/consult" onClick={()=>setMenuOpen(false)}>Consult</Link>
						{user?.role==='DOCTOR' && <Link to="/doctor" className="font-medium" onClick={()=>setMenuOpen(false)}>Doctor</Link>}
						{user?.role==='PHARMACY_ADMIN' && <Link to="/pharmacy-admin" className="font-medium" onClick={()=>setMenuOpen(false)}>Pharmacy Admin</Link>}
						{user?.role==='SUPERADMIN' && <Link to="/superadmin" className="font-medium" onClick={()=>setMenuOpen(false)}>Superadmin</Link>}
					</div>
				</div>
			)}
		</nav>
	)
}

function RequireRole({ roles, children }) {
	const { user, loading } = useAuth()
	const loc = useLocation()
	if (loading) return <div className="container section">Checking auth…</div>
	if (!user) return <Navigate to="/login" state={{ from: loc }} replace />
	if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />
	return children
}

export default function App(){
	return (
		<div className="min-h-screen flex flex-col">
			<Nav />
			<main className="container section flex-1">
				<Routes>
					<Route path="/" element={<Navigate to="/triage" replace />} />
					<Route path="/triage" element={<Triage />} />
					<Route path="/pharmacy" element={<PharmacySearch />} />
					<Route path="/consult" element={<Consult />} />
					<Route path="/join/:appointmentId" element={<RequireRole roles={["DOCTOR","PATIENT"]}><Join /></RequireRole>} />
					<Route path="/pharmacy-admin" element={<RequireRole roles={["PHARMACY_ADMIN","SUPERADMIN"]}><PharmacyAdmin /></RequireRole>} />
					<Route path="/doctor" element={<RequireRole roles={["DOCTOR"]}><DoctorDashboard /></RequireRole>} />
					<Route path="/superadmin" element={<RequireRole roles={["SUPERADMIN"]}><SuperAdmin /></RequireRole>} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</main>
			<footer className="border-t border-slate-200 py-4 text-center text-sm text-slate-500">© CareMedha</footer>
		</div>
	)
}
