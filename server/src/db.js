import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { INITIAL_RECIPES, INITIAL_PREFERENCES } from './seedData.js';
import { hashPassword } from './auth.js';

const here = dirname(fileURLToPath(import.meta.url));
const dataDir = join(here, '..', 'data');
mkdirSync(dataDir, { recursive: true });

export const db = new DatabaseSync(join(dataDir, 'cookpedia.db'));
db.exec('PRAGMA foreign_keys = ON;');

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  avatar TEXT,
  favorite_category TEXT,
  member_since TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS recipes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  cooking_time TEXT,
  difficulty TEXT,
  rating REAL,
  calories TEXT,
  servings INTEGER,
  image TEXT,
  ingredients TEXT NOT NULL,
  instructions TEXT NOT NULL,
  is_featured INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS user_favorites (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipe_id TEXT NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, recipe_id)
);

CREATE TABLE IF NOT EXISTS preferences (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT
);

CREATE TABLE IF NOT EXISTS user_preferences (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  preference_id TEXT NOT NULL REFERENCES preferences(id) ON DELETE CASCADE,
  selected INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, preference_id)
);

CREATE TABLE IF NOT EXISTS user_settings (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  push_notifications INTEGER NOT NULL DEFAULT 1,
  sound_effects INTEGER NOT NULL DEFAULT 1,
  email_digest INTEGER NOT NULL DEFAULT 0
);
`);

// Seed data awal dari seedData.js, hanya jika tabel masih kosong
const recipeCount = db.prepare('SELECT COUNT(*) AS n FROM recipes').get().n;
if (recipeCount === 0) {
  const insertRecipe = db.prepare(`
    INSERT INTO recipes (id, name, category, description, cooking_time, difficulty, rating, calories, servings, image, ingredients, instructions, is_featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const r of INITIAL_RECIPES) {
    insertRecipe.run(
      r.id, r.name, r.category, r.description ?? null, r.cookingTime ?? null,
      r.difficulty ?? null, r.rating ?? null, r.calories ?? null, r.servings ?? null,
      r.image ?? null, JSON.stringify(r.ingredients), JSON.stringify(r.instructions),
      r.isFeatured ? 1 : 0
    );
  }
}

const prefCount = db.prepare('SELECT COUNT(*) AS n FROM preferences').get().n;
if (prefCount === 0) {
  const insertPref = db.prepare('INSERT INTO preferences (id, name, description, icon) VALUES (?, ?, ?, ?)');
  for (const p of INITIAL_PREFERENCES) {
    insertPref.run(p.id, p.name, p.description, p.icon);
  }
}

// User demo untuk development: email ernest@mail.com, password password123
const demoExists = db.prepare('SELECT id FROM users WHERE email = ?').get('ernest@mail.com');
if (!demoExists) {
  createUser({
    name: 'Ernest',
    email: 'ernest@mail.com',
    password: 'password123',
    avatar: '/images/ernest-profile.jpg',
    favoriteCategory: 'Dinner',
    memberSince: 'Jan 2024'
  });
} else {
  // Database lama dibuat sebelum user demo punya avatar
  db.prepare('UPDATE users SET avatar = ? WHERE id = ? AND avatar IS NULL')
    .run('/images/ernest-profile.jpg', demoExists.id);
}

/**
 * Membuat user baru beserta preferensi default dan settings default.
 * Dipakai juga untuk seed user demo di atas.
 */
export function createUser({ name, email, password, avatar = null, favoriteCategory = null, memberSince }) {
  const id = randomUUID();
  const since = memberSince ?? new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' });

  db.prepare(`
    INSERT INTO users (id, name, email, password_hash, avatar, favorite_category, member_since)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(id, name, email, hashPassword(password), avatar, favoriteCategory, since);

  const allPrefs = db.prepare('SELECT id FROM preferences').all();
  const insertUserPref = db.prepare(
    'INSERT INTO user_preferences (user_id, preference_id, selected) VALUES (?, ?, ?)'
  );
  const defaultSelected = new Map(INITIAL_PREFERENCES.map(p => [p.id, p.selected ? 1 : 0]));
  for (const p of allPrefs) {
    insertUserPref.run(id, p.id, defaultSelected.get(p.id) ?? 0);
  }

  db.prepare(`
    INSERT INTO user_settings (user_id, push_notifications, sound_effects, email_digest)
    VALUES (?, 1, 1, 0)
  `).run(id);

  return id;
}
