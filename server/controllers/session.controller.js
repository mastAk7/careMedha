import { prisma } from '../db/client.js';

const makeCode = () => Math.random().toString(36).slice(2,8).toUpperCase();

export async function initSession(req, res) {
  const appt = await prisma.appointment.findUnique({ where:{ id: req.params.appointmentId } , include:{ doctor:true, patient:true }});
  if (!appt) return res.status(404).json({ error:'Not found' });

  const isOwner =
    (req.user.role==='DOCTOR' && appt.doctor && (await prisma.doctor.findFirst({where:{userId:req.user.id,id:appt.doctorId}}))) ||
    (req.user.role==='PATIENT' && appt.patient && (await prisma.patient.findFirst({where:{userId:req.user.id,id:appt.patientId}})));

  if (!isOwner) return res.status(403).json({ error:'Forbidden' });

  const sess = await prisma.session.upsert({
    where: { appointmentId: appt.id },
    update: {},
    create: { appointmentId: appt.id, joinCode: makeCode() }
  });
  res.json({ joinCode: sess.joinCode });
}

export async function joinByCode(req, res) {
  const sess = await prisma.session.findUnique({ where: { joinCode: req.params.code }, include:{ appointment:true } });
  if (!sess) return res.status(404).json({ error:'Not found' });

  // visibility: only appointment doctor/patient
  const appt = await prisma.appointment.findUnique({ where:{ id: sess.appointmentId }, include:{ doctor:{include:{user:true}}, patient:{include:{user:true}} }});
  const mePat = await prisma.patient.findFirst({ where:{ userId: req.user.id }});
  const meDoc = await prisma.doctor.findFirst({ where:{ userId: req.user.id }});
  if (appt.patientId !== mePat?.id && appt.doctorId !== meDoc?.id) return res.status(403).json({ error:'Forbidden' });

  const counterpart = appt.patientId === mePat?.id ? appt.doctor.user : appt.patient.user;
  res.json({ appointmentId: appt.id, counterpart: { id: counterpart.id, name: counterpart.name } });
}
