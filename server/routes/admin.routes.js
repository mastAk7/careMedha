import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/requireRole.js';
import { promoteToDoctor, promoteToPharmacyAdmin } from '../controllers/admin.controller.js';

const r = Router();

r.post('/promote/doctor', requireAuth, requireRole('SUPERADMIN'), promoteToDoctor);
r.post('/promote/pharmacy-admin', requireAuth, requireRole('SUPERADMIN'), promoteToPharmacyAdmin);

export default r;
