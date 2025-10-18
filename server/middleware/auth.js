import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { COOKIE_NAME, JWT_SECRET } from '../config/index.js';

export const withCookies = cookieParser();

export function requireAuth(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // {id, role, name}
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
