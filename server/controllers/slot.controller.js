import { prisma } from '../db/client.js';

export async function createSlots(req, res) {
	const doctor = await prisma.doctor.findFirst({ where: { userId: req.user.id } });
	if (!doctor) return res.status(403).json({ error:'Doctor profile required' });

	const { blocks = [], capacity = 1 } = req.body; // blocks: [{startAt,endAt,every:"30m"}]
	const toRows = [];
	for (const b of blocks) {
		const start = new Date(b.startAt), end = new Date(b.endAt);
		const everyMin = (b.every?.endsWith('m') ? parseInt(b.every) : 30) || 30;
		for (let t = start; t < end; t = new Date(t.getTime() + everyMin*60000)) {
			toRows.push({ doctorId: doctor.id, startAt: t, endAt: new Date(t.getTime()+everyMin*60000), capacity });
		}
	}
	const created = await prisma.slot.createMany({ data: toRows });
	res.status(201).json({ created: created.count });
}

export async function updateSlot(req, res) {
	// allow toggling/cancel only if not booked
	const doctor = await prisma.doctor.findFirst({ where: { userId: req.user.id } });
	const slot = await prisma.slot.findUnique({ where: { id: req.params.slotId } });
	if (!slot || slot.doctorId !== doctor?.id) return res.status(404).json({ error:'Not found' });
	if (slot.booked > 0) return res.status(400).json({ error:'Cannot edit a booked slot' });
	const updated = await prisma.slot.update({ where:{ id:slot.id }, data: req.body });
	res.json(updated);
}

export async function deleteSlot(req, res) {
	const doctor = await prisma.doctor.findFirst({ where: { userId: req.user.id } });
	const slot = await prisma.slot.findUnique({ where: { id: req.params.slotId } });
	if (!slot || slot.doctorId !== doctor?.id) return res.status(404).json({ error:'Not found' });
	if (slot.booked > 0) return res.status(400).json({ error:'Cannot delete a booked slot' });
	await prisma.slot.delete({ where:{ id:slot.id } });
	res.json({ ok:true });
}

export async function bulkCloseSlots(req, res) {
	const doctor = await prisma.doctor.findFirst({ where: { userId: req.user.id } });
	if (!doctor) return res.status(403).json({ error:'Doctor profile required' });
	const { date } = req.body; // YYYY-MM-DD
	const start = new Date(date + 'T00:00:00.000Z');
	const end = new Date(date + 'T23:59:59.999Z');
	const result = await prisma.slot.updateMany({
		where: { doctorId: doctor.id, startAt: { gte: start, lte: end }, booked: 0 },
		data: { isOpen: false }
	});
	res.json({ closed: result.count });
}
