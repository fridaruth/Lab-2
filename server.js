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

// Hämta erfarenheter
app.get("/workexperience", (req, res) => {
    try {
        const rows = db.prepare("SELECT * FROM workexperience").all();
        res.json(rows); // Skicka data som JSON
    } catch (err) {
        res.status(500).json({ error: "Kunde inte hämta data: " + err.message });
    }
});

// Lägg till nya erfarenheter
app.post("/workexperience", (req, res) => {
    const { companyname, jobtitle, location, startdate, enddate, description } = req.body;

    // Validering, kolla att inga fält är tomma
    if (!companyname || !jobtitle || !location || !startdate || !description) {
        return res.status(400).json({
            error: "Validering misslyckades: Alla fält (utom eventuellt slutdatum) måste fyllas i!"
        });
    }

    try {
        const statement = db.prepare(`
            INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate, description)
            VALUES (?, ?, ?, ?, ?, ?)
            `);

        const result = statement.run(companyname, jobtitle, location, startdate, enddate, description);

        // returnera nya objekt med ID
        res.status(201).json({
            id: result.lastInsertRowid,
            message: "Arbetserfarenhet tillagd!"
        });
    } catch (err) {
        res.status(500).json({ error: "Kunde inte spara till databasen: " + err.message });
    }
});

// ta bort
app.delete("/workexperience/:id", (req, res) => {
    try {
    const result = db.prepare("DELETE FROM workexperience WHERE id = ?").run(req.params.id);
    
    if (result.changes > 0) {
    res.json({ message: "Deleted" });
} else {
    res.status(404).json({ error: "Hittade ingen post med det ID:t" });
}
} catch (err) {
    res.status(500).json({ error: "Kunde inte radera: " + err.message })
}
});

// Starta servern
const PORT = 5000;
app.listen(PORT, () => console.log("Server på port ${PORT"));
