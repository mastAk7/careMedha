import { Router } from 'express';
import { upsertInventory, updateInventoryItem } from '../controllers/inventory.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/requireRole.js';

const r = Router();
r.post('/:pharmacyId', requireAuth, requireRole('PHARMACY_ADMIN','SUPERADMIN'), upsertInventory);
r.patch('/:pharmacyId/:inventoryId', requireAuth, requireRole('PHARMACY_ADMIN','SUPERADMIN'), updateInventoryItem);
export default r;
