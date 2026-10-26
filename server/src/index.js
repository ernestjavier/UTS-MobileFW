import express from 'express';
import cors from 'cors';
import { db, createUser } from './db.js';
import { verifyPassword, createToken } from './auth.js';
import { requireAuth } from './middleware.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ---------- Helper ----------

const toRecipe = (row) => ({
  id: row.id,
  name: row.name,
  category: row.category,
  description: row.description,
  cookingTime: row.cooking_time,
  difficulty: row.difficulty,
  rating: row.rating,
  calories: row.calories,
  servings: row.servings,
  image: row.image,
  ingredients: JSON.parse(row.ingredients),
  instructions: JSON.parse(row.instructions),
  isFeatured: row.is_featured === 1
});

const toUser = (row) => ({
  id: row.id,
  name: row.name,
  email: row.email,
  avatar: row.avatar,
  favoriteCategory: row.favorite_category,
  memberSince: row.member_since
});

const toSettings = (row) => ({
  pushNotifications: row.push_notifications === 1,
  soundEffects: row.sound_effects === 1,
  emailDigest: row.email_digest === 1
});

const parsePaging = (query) => {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(query.limit, 10) || 20));
  return { page, limit, offset: (page - 1) * limit };
};

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

// ---------- Auth ----------

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body ?? {};

  if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(password)) {
    return res.status(400).json({ error: 'name, email, and password are required.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const exists = db.prepare('SELECT id FROM users WHERE email = ?').get(normalizedEmail);
  if (exists) {
    return res.status(409).json({ error: 'Email is already registered.' });
  }

  const userId = createUser({ name: name.trim(), email: normalizedEmail, password });
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);

  const token = createToken();
  db.prepare('INSERT INTO sessions (token, user_id, created_at) VALUES (?, ?, ?)')
    .run(token, userId, new Date().toISOString());

  res.status(201).json({ token, user: toUser(user) });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body ?? {};

  if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
    return res.status(400).json({ error: 'email and password are required.' });
  }

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.trim().toLowerCase());
  if (!user || !verifyPassword(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const token = createToken();
  db.prepare('INSERT INTO sessions (token, user_id, created_at) VALUES (?, ?, ?)')
    .run(token, user.id, new Date().toISOString());

  res.json({ token, user: toUser(user) });
});

app.post('/api/auth/logout', requireAuth, (req, res) => {
  const token = req.get('Authorization').slice(7);
  db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
  res.status(204).end();
});

app.get('/api/auth/me', requireAuth, (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.userId);
  res.json(toUser(user));
});

// ---------- Recipes (publik) ----------

app.get('/api/recipes', (req, res) => {
  const { category, difficulty, q } = req.query;
  const { page, limit, offset } = parsePaging(req.query);

  const where = [];
  const params = [];

  if (category) {
    where.push('category = ?');
    params.push(String(category));
  }
  if (difficulty) {
    where.push('difficulty = ?');
    params.push(String(difficulty));
  }
  if (q) {
    where.push('(name LIKE ? OR description LIKE ?)');
    const like = `%${String(q)}%`;
    params.push(like, like);
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

  const total = db.prepare(`SELECT COUNT(*) AS n FROM recipes ${whereSql}`).get(...params).n;
  const rows = db.prepare(`SELECT * FROM recipes ${whereSql} ORDER BY name LIMIT ? OFFSET ?`)
    .all(...params, limit, offset);

  res.json({ data: rows.map(toRecipe), page, limit, total });
});

app.get('/api/recipes/featured', (req, res) => {
  const rows = db.prepare('SELECT * FROM recipes WHERE is_featured = 1 ORDER BY name').all();
  res.json(rows.map(toRecipe));
});

app.get('/api/recipes/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM recipes WHERE id = ?').get(req.params.id);
  if (!row) {
    return res.status(404).json({ error: 'Recipe not found.' });
  }
  res.json(toRecipe(row));
});

app.get('/api/categories', (req, res) => {
  const rows = db.prepare('SELECT DISTINCT category FROM recipes ORDER BY category').all();
  res.json(rows.map(r => r.category));
});

// ---------- Me (perlu login) ----------

app.get('/api/me/favorites', requireAuth, (req, res) => {
  const rows = db.prepare(`
    SELECT r.* FROM user_favorites f
    JOIN recipes r ON r.id = f.recipe_id
    WHERE f.user_id = ?
    ORDER BY f.rowid
  `).all(req.userId);
  res.json(rows.map(toRecipe));
});

app.post('/api/me/favorites', requireAuth, (req, res) => {
  const { recipeId } = req.body ?? {};
  if (!isNonEmptyString(recipeId)) {
    return res.status(400).json({ error: 'recipeId is required.' });
  }

  const recipe = db.prepare('SELECT id FROM recipes WHERE id = ?').get(recipeId);
  if (!recipe) {
    return res.status(404).json({ error: 'Recipe not found.' });
  }

  db.prepare('INSERT OR IGNORE INTO user_favorites (user_id, recipe_id) VALUES (?, ?)')
    .run(req.userId, recipeId);
  res.status(201).json({ recipeId, favorited: true });
});

app.delete('/api/me/favorites/:recipeId', requireAuth, (req, res) => {
  db.prepare('DELETE FROM user_favorites WHERE user_id = ? AND recipe_id = ?')
    .run(req.userId, req.params.recipeId);
  res.status(204).end();
});

app.get('/api/me/preferences', requireAuth, (req, res) => {
  const rows = db.prepare(`
    SELECT p.id, p.name, p.description, p.icon, up.selected
    FROM user_preferences up
    JOIN preferences p ON p.id = up.preference_id
    WHERE up.user_id = ?
    ORDER BY p.rowid
  `).all(req.userId);

  res.json(rows.map(r => ({ ...r, selected: r.selected === 1 })));
});

app.patch('/api/me/preferences/:id', requireAuth, (req, res) => {
  const { selected } = req.body ?? {};
  if (typeof selected !== 'boolean') {
    return res.status(400).json({ error: 'selected must be a boolean.' });
  }

  const result = db.prepare(
    'UPDATE user_preferences SET selected = ? WHERE user_id = ? AND preference_id = ?'
  ).run(selected ? 1 : 0, req.userId, req.params.id);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Preference not found.' });
  }
  res.json({ id: req.params.id, selected });
});

app.get('/api/me/settings', requireAuth, (req, res) => {
  const row = db.prepare('SELECT * FROM user_settings WHERE user_id = ?').get(req.userId);
  res.json(toSettings(row));
});

app.patch('/api/me/settings', requireAuth, (req, res) => {
  const body = req.body ?? {};
  const columns = {
    pushNotifications: 'push_notifications',
    soundEffects: 'sound_effects',
    emailDigest: 'email_digest'
  };

  const sets = [];
  const params = [];
  for (const [key, column] of Object.entries(columns)) {
    if (key in body) {
      if (typeof body[key] !== 'boolean') {
        return res.status(400).json({ error: `${key} must be a boolean.` });
      }
      sets.push(`${column} = ?`);
      params.push(body[key] ? 1 : 0);
    }
  }

  if (sets.length > 0) {
    db.prepare(`UPDATE user_settings SET ${sets.join(', ')} WHERE user_id = ?`)
      .run(...params, req.userId);
  }

  const row = db.prepare('SELECT * FROM user_settings WHERE user_id = ?').get(req.userId);
  res.json(toSettings(row));
});

app.patch('/api/me', requireAuth, (req, res) => {
  const body = req.body ?? {};
  const sets = [];
  const params = [];

  if ('name' in body) {
    if (!isNonEmptyString(body.name)) {
      return res.status(400).json({ error: 'name must be a non-empty string.' });
    }
    sets.push('name = ?');
    params.push(body.name.trim());
  }
  if ('avatar' in body) {
    sets.push('avatar = ?');
    params.push(body.avatar ?? null);
  }
  if ('favoriteCategory' in body) {
    sets.push('favorite_category = ?');
    params.push(body.favoriteCategory ?? null);
  }

  if (sets.length > 0) {
    db.prepare(`UPDATE users SET ${sets.join(', ')} WHERE id = ?`).run(...params, req.userId);
  }

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.userId);
  res.json(toUser(user));
});

// ---------- Error handling ----------

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON body.' });
  }
  console.error(err);
  res.status(500).json({ error: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`Cookpedia API running at http://localhost:${PORT}`);
});
