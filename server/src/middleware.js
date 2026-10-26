import { db } from './db.js';

// Mengecek header "Authorization: Bearer <token>" dan menyimpan userId ke req
export function requireAuth(req, res, next) {
  const header = req.get('Authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Authorization token is required.' });
  }

  const session = db.prepare('SELECT user_id FROM sessions WHERE token = ?').get(token);
  if (!session) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }

  req.userId = session.user_id;
  next();
}
