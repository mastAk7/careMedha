import { prisma } from '../db/client.js';

export async function myDoctor(req, res){
	const doc = await prisma.doctor.findFirst({ where: { userId: req.user.id }, include:{ user:{ select:{ id:true, name:true } } } })
	if (!doc) return res.status(404).json({ error:'Not a doctor' })
	res.json(doc)
}

export async function myPharmacy(req, res){
	const adm = await prisma.pharmacyAdmin.findFirst({ where: { userId: req.user.id }, include:{ pharmacy:true } })
	if (!adm) return res.status(404).json({ error:'Not a pharmacy admin' })
	res.json(adm.pharmacy)
}

export async function updateMyDoctor(req, res){
	const doc = await prisma.doctor.findFirst({ where: { userId: req.user.id } })
	if (!doc) return res.status(404).json({ error:'Not a doctor' })
	const { specialization, clinicName, clinicAddress, lat, lng, bio, fee } = req.body
	const updated = await prisma.doctor.update({ where:{ id: doc.id }, data:{ specialization, clinicName, clinicAddress, lat, lng, bio, fee } })
	res.json(updated)
}

export async function updateMyPharmacy(req, res){
	const adm = await prisma.pharmacyAdmin.findFirst({ where: { userId: req.user.id } })
	if (!adm) return res.status(404).json({ error:'Not a pharmacy admin' })
	const { name, address, lat, lng, phone } = req.body
	const updated = await prisma.pharmacy.update({ where:{ id: adm.pharmacyId }, data:{ name, address, lat, lng, phone } })
	res.json(updated)
}
