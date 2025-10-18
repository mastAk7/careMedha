import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { FRONTEND_ORIGIN, MODEL_ORIGIN } from './config/index.js';
import { withCookies } from './middleware/auth.js';

import authRoutes from './routes/auth.routes.js';
import doctorRoutes from './routes/doctor.routes.js';
import slotRoutes from './routes/slot.routes.js';
import appointmentRoutes from './routes/appointment.routes.js';
import sessionRoutes from './routes/session.routes.js';
import pharmacyRoutes from './routes/pharmacy.routes.js';
import inventoryRoutes from './routes/inventory.routes.js';
import medicineRoutes from './routes/medicine.routes.js';
import triageRoutes from './routes/triage.routes.js';
import adminRoutes from './routes/admin.routes.js';
import meRoutes from './routes/me.routes.js';
import { errorHandler } from './middleware/error.js';

export function createApp() {
  const app = express();
  app.use(helmet());
  app.use(cors({ origin: {FRONTEND_ORIGIN,MODEL_ORIGIN}, credentials: true }));
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(withCookies);

  app.get('/api/health', (_req, res) => res.json({ ok: true }));
  app.head('/api/health', (_req, res) => res.sendStatus(200)); // explicit for monitors
  app.use('/api/auth', authRoutes);
  app.use('/api/doctors', doctorRoutes);
  app.use('/api/slots', slotRoutes);
  app.use('/api/appointments', appointmentRoutes);
  app.use('/api/sessions', sessionRoutes);
  app.use('/api/pharmacies', pharmacyRoutes);
  app.use('/api/inventory', inventoryRoutes);
  app.use('/api/medicines', medicineRoutes);
  app.use('/api/triage', triageRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/me', meRoutes);

  app.use(errorHandler);
  return app;
}
