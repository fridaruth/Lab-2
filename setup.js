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

    // kolla om det är tomt
    const row = db.prepare("SELECT COUNT(*) AS count FROM workexperience").get();

    if (row.count === 0) {
        console.log("Databasen är tom, lägger till data");
        // kör insert med data
        const insert = db.prepare(`
            INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate, description)
            VALUES (?, ?, ?, ?, ?, ?)
            `);

            insert.run(
                "Tellings Film",
                "Videograf",
                "Helsingborg",
                "2017-01-01",
                "",
                "Filmar bröllop och annat kul!"
            );

            console.log("Data har lagts till");
    } else {
        console.log("Databasen innehåller redan data")
    }

    console.log("Databasen är installerad och redo!");

    db.close();