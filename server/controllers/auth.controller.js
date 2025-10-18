import { prisma } from '../db/client.js';
import { hashPw, cmpPw, signJwt, setAuthCookie, clearAuthCookie } from '../utils/crypto.js';
import { z } from 'zod';

const signUpSchema = z.object({
	name: z.string().min(1),
	email: z.string().email(),
	phone: z.string().optional().nullable(),
	password: z.string().min(6)
});

export async function signup(req, res) {
	const body = signUpSchema.parse(req.body);
	const passwordHash = await hashPw(body.password);
	const user = await prisma.user.create({
		data: { name: body.name, email: body.email, phone: body.phone, passwordHash, role: 'PATIENT',
			patient: { create: {} }
		},
		select: { id:true, name:true, email:true, role:true }
	});
	const token = signJwt({ id:user.id, name:user.name, email:user.email, role:user.role });
	setAuthCookie(res, token);
	res.status(201).json({ user });
}

const loginSchema = z.object({
	email: z.string().email().optional(),
	phone: z.string().optional(),
	password: z.string().min(6)
}).refine(d=>d.email||d.phone, { message:'email or phone required' });

export async function login(req, res) {
	const { email, phone, password } = loginSchema.parse(req.body);
	const user = await prisma.user.findFirst({ where: { OR:[email?{email}:undefined, phone?{phone}:undefined].filter(Boolean) } });
	if (!user) return res.status(400).json({ error:'Invalid credentials' });
	const ok = await cmpPw(password, user.passwordHash);
	if (!ok) return res.status(400).json({ error:'Invalid credentials' });
	const token = signJwt({ id:user.id, name:user.name, email:user.email, role:user.role });
	setAuthCookie(res, token);
	res.json({ user: { id:user.id, name:user.name, email:user.email, role:user.role } });
}

export async function me(req, res) {
	res.json({ user: req.user });
}

export async function logout(_req, res) {
	clearAuthCookie(res);
	res.json({ ok:true });
}
