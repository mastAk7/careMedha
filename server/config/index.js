import 'dotenv/config';
export const PORT = process.env.PORT || 4000;
export const JWT_SECRET = process.env.JWT_SECRET;
export const COOKIE_NAME = process.env.COOKIE_NAME || 'caremedha_token';
export const IS_PROD = process.env.NODE_ENV === 'production';
export const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
export const MODEL_ORIGIN = process.env.MODEL_ORIGIN || 'http://localhost:5000';