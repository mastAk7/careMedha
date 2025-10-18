import { prisma } from '../db/client.js';

export async function myAppointments(req, res) {
	const where = req.user.role === 'DOCTOR'
		? { doctor: { userId: req.user.id } }
		: { patient: { userId: req.user.id } };
	const list = await prisma.appointment.findMany({
		where,
		orderBy: { createdAt: 'desc' },
		include: { doctor: { include:{ user:true } }, patient: { include:{ user:true } }, slot: true }
	});
	res.json(list);
}

export async function createAppointment(req, res) {
	const patient = await prisma.patient.findFirst({ where: { userId: req.user.id } });
	if (!patient) return res.status(403).json({ error:'Patient profile required' });
	const { doctorId, slotId, mode='VIDEO', reason } = req.body;

	const appt = await prisma.$transaction(async (tx) => {
		let slot = null;
		if (slotId) {
			slot = await tx.slot.findUnique({ where: { id: slotId } });
			if (!slot || !slot.isOpen || slot.booked >= slot.capacity) throw new Error('Slot not available');
			await tx.slot.update({ where: { id: slot.id }, data: { booked: { increment: 1 } } });
		}
		return tx.appointment.create({
			data: { patientId: patient.id, doctorId, slotId: slot?.id || null, mode, reason }
		});
	});

	res.status(201).json(appt);
}

export async function cancelAppointment(req, res) {
	const appt = await prisma.appointment.findUnique({ where: { id: req.params.id }, include:{ patient:true } });
	const me = await prisma.patient.findFirst({ where: { userId: req.user.id } });
	if (!appt || appt.patientId !== me?.id) return res.status(404).json({ error:'Not found' });

	await prisma.$transaction(async (tx)=>{
		await tx.appointment.update({ where:{ id: appt.id }, data: { status:'CANCELLED' } });
		if (appt.slotId) await tx.slot.update({ where:{ id: appt.slotId }, data:{ booked: { decrement: 1 } } });
	});
	res.json({ ok:true });
}

export async function setStatus(req, res) {
	const doc = await prisma.doctor.findFirst({ where: { userId: req.user.id } });
	const appt = await prisma.appointment.findUnique({ where:{ id: req.params.id } });
	if (!appt || appt.doctorId !== doc?.id) return res.status(404).json({ error:'Not found' });
	const updated = await prisma.appointment.update({ where:{ id: appt.id }, data:{ status: req.body.status } });
	res.json(updated);
}
