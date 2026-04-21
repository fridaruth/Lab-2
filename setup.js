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

    const insert = db.prepare('INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate, description) VALUES (?, ?, ?, ?, ?, ?)');
    insert.run('Mittuniversitetet', 'Labbhandledare', 'Sundsvall', '2019-01-01', '2019-12-31', 'Handledning av studenter');
    insert.run('IKEA', 'Lagerpersonal', 'Helsingborg', '2023-01-01', '2024-01-01', 'Arbetade i lagret på IKEA');

    console.log("Testdata har lagts till i workexperience");
    db.close();