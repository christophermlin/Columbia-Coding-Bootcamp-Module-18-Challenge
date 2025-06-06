import jwt from 'jsonwebtoken';
import type { Request } from 'express';

const secret = process.env.JWT_SECRET_KEY || 'mysecret';
const expiration = '2h';

export function signToken({ username, email, _id }: { username: string; email: string; _id: string }) {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

export function getUserFromToken(req: Request) {
  let token = req.headers.authorization || '';
  if (token.startsWith('Bearer ')) token = token.slice(7);
  if (!token) return null;
  try {
    const { data } = jwt.verify(token, secret) as any;
    return data;
  } catch {
    return null;
  }
}
