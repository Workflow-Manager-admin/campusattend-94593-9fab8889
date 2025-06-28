/**
 * Auth service provides: registration, login, password hashing, JWT issuing and validation.
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { findUserByEmail, createUser } = require('../models/user.model');

// Use .env for JWT_SECRET in prod
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key'; // Do NOT use in production!

// PUBLIC_INTERFACE
async function register({ name, email, password }) {
  /** Registers user and returns JWT on success */
  if (findUserByEmail(email)) {
    throw new Error('Email already registered.');
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = {
    id: uuidv4(),
    name,
    email,
    password: hashed,
    createdAt: new Date().toISOString(),
    profile: {},
    settings: {}
  };
  createUser(user);
  const token = jwt.sign({ id: user.id, email }, JWT_SECRET, { expiresIn: '4h' });
  return { user: { id: user.id, name, email }, token };
}

// PUBLIC_INTERFACE
async function login({ email, password }) {
  /** Verifies user and returns JWT */
  const user = findUserByEmail(email);
  if (!user) throw new Error('No such user.');
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid credentials.');
  const token = jwt.sign({ id: user.id, email }, JWT_SECRET, { expiresIn: '4h' });
  return { user: { id: user.id, name: user.name, email }, token };
}

// PUBLIC_INTERFACE
function verifyToken(token) {
  /** Decodes and verifies JWT (throws exception if invalid) */
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { register, login, verifyToken };
