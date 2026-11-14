
const express = require("express");
const db = require("./db");
const stationRoutes = require("./routes/stations");
const chefRoutes = require("./routes/chefs");
const bookingRoutes = require("./routes/bookings");
const app = express();
const PORT = 3000;

// Middleware to read JSON data
app.use(express.json());

app.use("/stations", stationRoutes);

app.use("/chefs", chefRoutes);

app.use("/bookings", bookingRoutes);
// Welcome route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to KitchenKeys Cloud Kitchen API!"
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`KitchenKeys server running at http://localhost:${PORT}`);
});
