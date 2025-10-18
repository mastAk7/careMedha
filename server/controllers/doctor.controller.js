import { prisma } from '../db/client.js';

export async function listDoctors(req, res) {
  const { q, specialization } = req.query;
  const docs = await prisma.doctor.findMany({
    where: {
      AND: [
        { isActive: true },
        q ? { user: { name: { contains: String(q), mode: 'insensitive' } } } : {},
        specialization ? { specialization: { contains: String(specialization), mode:'insensitive' } } : {}
      ]
    },
    select: { id:true, specialization:true, clinicName:true, lat:true, lng:true, fee:true,
              user:{ select:{ id:true, name:true } } }
  });
  res.json(docs);
}

export async function getDoctor(req, res) {
  const doctor = await prisma.doctor.findUnique({
    where: { id: req.params.id },
    include: { user: { select:{ id:true, name:true } } }
  });
  if (!doctor) return res.status(404).json({ error:'Not found' });
  res.json(doctor);
}

export async function getDoctorSlots(req, res) {
  const { from, to } = req.query;
  const where = { doctorId: req.params.id, isOpen: true };
  if (from && to) Object.assign(where, { startAt: { gte: new Date(from) }, endAt: { lte: new Date(to) } });
  const slots = await prisma.slot.findMany({ where, orderBy: { startAt: 'asc' } });
  res.json(slots);
}
