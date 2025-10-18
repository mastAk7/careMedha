import { Router } from 'express';
import { login, signup, me, logout } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.js';
const r = Router();
r.post('/signup', signup);
r.post('/login', login);
r.get('/me', requireAuth, me);
r.post('/logout', requireAuth, logout);
export default r;
