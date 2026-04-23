const Database = require("better-sqlite3");

// Koppla mot SQLite-databas
const db = new Database("cv.db");

module.exports = db;