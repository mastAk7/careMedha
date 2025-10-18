import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/requireRole.js';
import { createSlots, updateSlot, deleteSlot, bulkCloseSlots } from '../controllers/slot.controller.js';

const r = Router();
r.post('/', requireAuth, requireRole('DOCTOR'), createSlots);
r.patch('/:slotId', requireAuth, requireRole('DOCTOR'), updateSlot);
r.delete('/:slotId', requireAuth, requireRole('DOCTOR'), deleteSlot);
r.post('/bulk-close', requireAuth, requireRole('DOCTOR'), bulkCloseSlots);
export default r;
