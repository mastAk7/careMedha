import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { myDoctor, myPharmacy, updateMyDoctor, updateMyPharmacy } from '../controllers/me.controller.js';

const r = Router();
r.get('/doctor', requireAuth, myDoctor);
r.get('/pharmacy', requireAuth, myPharmacy);
r.patch('/doctor', requireAuth, updateMyDoctor);
r.patch('/pharmacy', requireAuth, updateMyPharmacy);
export default r;
