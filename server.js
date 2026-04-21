// Importera paket
const express = require("express");
const Database = require("better-sqlite3");
const cors = require("cors");

// Koppla mot SQLite-databas
const db = new Database("cv.db");

// Skapa express-instans
const app = express();

// Middlewares
app.use(cors()); // tillåt cross-origin
app.use(express.json()); // Parsa JSON-body

// Starta servern
app.listen(5000, () => console.log("Server på port 5000"));
