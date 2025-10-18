import { Router } from 'express';
import { triage } from '../controllers/triage.controller.js';
const r = Router();
r.post('/', triage); // public for MVP
export default r;
