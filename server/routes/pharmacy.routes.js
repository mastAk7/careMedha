import { Router } from 'express';
import { listPharmacies, getPharmacy, pharmacyInventory, createPharmacy } from '../controllers/pharmacy.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/requireRole.js';
const r = Router();

r.get('/', listPharmacies);                 // public
r.get('/:id', getPharmacy);                 // public
r.get('/:id/inventory', pharmacyInventory); // public

r.post('/', requireAuth, requireRole('SUPERADMIN'), createPharmacy);
export default r;
