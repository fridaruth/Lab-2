// Importera paket
const express = require("express");
const cors = require("cors");

// Läs in routes
const experienceRoutes = require("./routes/experiences");

// Skapa express-instans
const app = express();

// Middlewares
app.use(cors()); // tillåt cross-origin
app.use(express.json()); // Parsa JSON-body

// Routes 
app.use("/workexperience", experienceRoutes);

// Starta servern
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server på port ${PORT}`)
});
