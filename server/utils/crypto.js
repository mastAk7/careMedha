import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, COOKIE_NAME, IS_PROD } from '../config/index.js';

export const hashPw = (plain) => bcrypt.hash(plain, 10);
export const cmpPw  = (plain, hash) => bcrypt.compare(plain, hash);

export const signJwt = (payload, opts={}) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: '7d', ...opts });

export const setAuthCookie = (res, token) => {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: IS_PROD ? 'none' : 'lax',
    maxAge: 7 * 24 * 3600 * 1000,
    path: '/',
  });
};
export const clearAuthCookie = (res) => {
  res.clearCookie(COOKIE_NAME, { httpOnly: true, secure: IS_PROD, sameSite: IS_PROD ? 'none':'lax', path: '/' });
};
