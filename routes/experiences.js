const express = require("express");
const db = require("../db");
const router = express.Router();

// Hämta erfarenheter
router.get("/", (req, res) => {
    try {
        const rows = db.prepare("SELECT * FROM workexperience").all();
        res.json(rows); // Skicka data som JSON
    } catch (err) {
        res.status(500).json({ error: "Kunde inte hämta data: " + err.message });
    }
});

// Lägg till nya erfarenheter
router.post("/", (req, res) => {
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
router.delete("/:id", (req, res) => {
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

// uppdatera
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { companyname, jobtitle, location, startdate, enddate, description } = req.body;

    // validering
    if (!companyname || !jobtitle || !location || !startdate || !description) {
        return res.status(400).json({
            error: "Validering misslyckades: Alla fält (utom eventuellt slutdatum) måste fyllas i!"
        });
    }

    try {
        const statement = db.prepare(`
            UPDATE workexperience
            SET companyname = ?, jobtitle = ?, location = ?, startdate = ?, enddate = ?, description = ?
            WHERE id = ?
            `);

            const result = statement.run(companyname, jobtitle, location, startdate, enddate, description, id);

            if (result.changes > 0) {
                res.json({ message: "Arbetserfarenheten har uppdaterats!" });
            } else {
                res.status(404).json({ error: "Hittade ingen post med det ID:t" });
            }
    } catch (err) {
        res.status(500).json({ error: "Kunde inte uppdatera databasen: " + err.message })
    }
});

module.exports = router;