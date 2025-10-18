import { prisma } from '../db/client.js';
import { z } from 'zod';

export async function listMedicines(req, res) {
	const { q } = req.query;
	const meds = await prisma.medicine.findMany({
		where: q ? { name: { contains: String(q), mode:'insensitive' } } : undefined,
		take: 50
	});
	res.json(meds);
}

const createMedicineSchema = z.object({
	name: z.string().min(1),
	form: z.string().optional().nullable(),
	strength: z.string().optional().nullable(),
	tags: z.array(z.string()).optional().default([])
});

export async function createMedicine(req, res) {
	const body = createMedicineSchema.parse(req.body);
	const med = await prisma.medicine.create({
		data: {
			name: body.name,
			form: body.form ?? undefined,
			strength: body.strength ?? undefined,
			tags: body.tags ?? []
		}
	});
	res.status(201).json(med);
}
