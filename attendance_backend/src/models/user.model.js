const fs = require('fs');
const path = require('path');

const USER_DB_PATH = path.join(__dirname, '../../data/users.json');

// INTERNAL: Utility to read users from JSON DB
function readUsers() {
  try {
    if (!fs.existsSync(USER_DB_PATH)) return [];
    const data = fs.readFileSync(USER_DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

// INTERNAL: Utility to write users to JSON DB
function writeUsers(users) {
  fs.writeFileSync(USER_DB_PATH, JSON.stringify(users, null, 2), 'utf-8');
}

// PUBLIC_INTERFACE
function getAllUsers() {
  /** Returns all users */
  return readUsers();
}

// PUBLIC_INTERFACE
function findUserByEmail(email) {
  /** Returns user object if found by email, otherwise null */
  return readUsers().find(u => u.email === email) || null;
}

// PUBLIC_INTERFACE
function findUserById(id) {
  /** Returns user object if found by id, otherwise null */
  return readUsers().find(u => u.id === id) || null;
}

// PUBLIC_INTERFACE
function createUser(user) {
  /** Saves a new user and returns it */
  const users = readUsers();
  users.push(user);
  writeUsers(users);
  return user;
}

// PUBLIC_INTERFACE
function updateUser(id, data) {
  /** Updates user with partial data and returns updated user */
  const users = readUsers();
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...data };
  writeUsers(users);
  return users[idx];
}

module.exports = {
  getAllUsers, findUserByEmail, findUserById, createUser, updateUser
};
