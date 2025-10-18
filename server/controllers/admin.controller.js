import { prisma } from '../db/client.js';
import { z } from 'zod';

const promoteDoctorSchema = z.object({
	email: z.string().email(),
	specialization: z.string().min(1),
	clinicName: z.string().optional().nullable(),
	clinicAddress: z.string().optional().nullable(),
	lat: z.number().optional().nullable(),
	lng: z.number().optional().nullable(),
	bio: z.string().optional().nullable(),
	fee: z.number().int().optional().nullable()
});

async function safeDeletePatient(tx, userId){
	const patient = await tx.patient.findFirst({ where: { userId } });
	if (!patient) return;
	const apptCount = await tx.appointment.count({ where: { patientId: patient.id } });
	const rxCount = await tx.prescription.count({ where: { patientId: patient.id } });
	if (apptCount === 0 && rxCount === 0) {
		await tx.patient.delete({ where: { id: patient.id } });
	}
	// else keep patient record to preserve history; role will still change
}

export async function promoteToDoctor(req, res) {
	const body = promoteDoctorSchema.parse(req.body);

	const result = await prisma.$transaction(async (tx) => {
		const user = await tx.user.findUnique({ where: { email: body.email } });
		if (!user) throw new Error('User not found');
		if (user.role === 'DOCTOR') return { user: { id:user.id, name:user.name, email:user.email, role:user.role } };

		// Remove old profiles if any
		await tx.pharmacyAdmin.deleteMany({ where: { userId: user.id } });
		await safeDeletePatient(tx, user.id);

		// Ensure no duplicate doctor
		await tx.doctor.deleteMany({ where: { userId: user.id } });

		// Create doctor profile
		await tx.doctor.create({
			data: {
				userId: user.id,
				specialization: body.specialization,
				clinicName: body.clinicName ?? undefined,
				clinicAddress: body.clinicAddress ?? undefined,
				lat: body.lat ?? undefined,
				lng: body.lng ?? undefined,
				bio: body.bio ?? undefined,
				fee: body.fee ?? undefined,
				isActive: true
			}
		});

		const updated = await tx.user.update({ where: { id: user.id }, data: { role: 'DOCTOR' }, select: { id: true, name: true, email: true, role: true } });
		return { user: updated };
	});

	res.json(result);
}

const promotePharmacyAdminSchema = z.object({
	email: z.string().email(),
	pharmacyId: z.string().min(1)
});

export async function promoteToPharmacyAdmin(req, res) {
	const body = promotePharmacyAdminSchema.parse(req.body);

	const result = await prisma.$transaction(async (tx) => {
		const user = await tx.user.findUnique({ where: { email: body.email } });
		if (!user) throw new Error('User not found');
		if (user.role === 'PHARMACY_ADMIN') return { user: { id:user.id, name:user.name, email:user.email, role:user.role } };

		const pharmacy = await tx.pharmacy.findUnique({ where: { id: body.pharmacyId } });
		if (!pharmacy) throw new Error('Pharmacy not found');

		// Remove old profiles if any
		await tx.doctor.deleteMany({ where: { userId: user.id } });
		await safeDeletePatient(tx, user.id);

		// Upsert admin link
		await tx.pharmacyAdmin.upsert({
			where: { userId: user.id },
			update: { pharmacyId: body.pharmacyId },
			create: { userId: user.id, pharmacyId: body.pharmacyId }
		});

		const updated = await tx.user.update({ where: { id: user.id }, data: { role: 'PHARMACY_ADMIN' }, select: { id: true, name: true, email: true, role: true } });
		return { user: updated };
	});

	res.json(result);
}
