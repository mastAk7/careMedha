import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { initSession, joinByCode } from '../controllers/session.controller.js';
const r = Router();
r.post('/:appointmentId/init', requireAuth, initSession);
r.get('/join/:code', requireAuth, joinByCode);
export default r;
