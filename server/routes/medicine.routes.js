import { Router } from 'express';
import { listMedicines, createMedicine } from '../controllers/medicine.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/requireRole.js';
const r = Router();
r.get('/', listMedicines); // public
r.post('/', requireAuth, requireRole('SUPERADMIN'), createMedicine);
export default r;
