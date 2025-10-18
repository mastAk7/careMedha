import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/requireRole.js';
import { myAppointments, createAppointment, cancelAppointment, setStatus } from '../controllers/appointment.controller.js';

const r = Router();
r.get('/my', requireAuth, myAppointments);
r.post('/', requireAuth, requireRole('PATIENT'), createAppointment);
r.patch('/:id/cancel', requireAuth, requireRole('PATIENT'), cancelAppointment);
r.delete('/:id', requireAuth, requireRole('PATIENT'), cancelAppointment);
r.patch('/:id/status', requireAuth, requireRole('DOCTOR'), setStatus);
export default r;
