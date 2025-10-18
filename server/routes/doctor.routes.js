import { Router } from 'express';
import { listDoctors, getDoctor, getDoctorSlots } from '../controllers/doctor.controller.js';
const r = Router();
r.get('/', listDoctors);
r.get('/:id', getDoctor);
r.get('/:id/slots', getDoctorSlots);
export default r;
