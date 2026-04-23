const Database = require("better-sqlite3");

const db = new Database("cv.db", { verbose: console.log });

db.exec(`
    CREATE TABLE IF NOT EXISTS workexperience (
    id INTEGER  PRIMARY KEY  AUTOINCREMENT,
    companyname TEXT    NOT NULL,
    jobtitle    TEXT    NOT NULL,
    location    TEXT    NOT NULL,
    startdate   TEXT    NOT NULL,
    enddate     TEXT,
    description TEXT NOT NULL
    );
    `);

    console.log("Databasen är installerad och redo!");

    db.close();