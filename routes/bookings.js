
const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all bookings with chef and station names (SQL JOIN)
router.get("/", (req, res) => {
    const sql = `
        SELECT
            bookings.id,
            chefs.name AS chef_name,
            stations.name AS station_name,
            bookings.booking_date
        FROM bookings
        INNER JOIN chefs
            ON bookings.chef_id = chefs.id
        INNER JOIN stations
            ON bookings.station_id = stations.id
    `;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.status(200).json(rows);
    });
});

// CREATE a new booking
router.post("/", (req, res) => {
    const { chef_id, station_id } = req.body;

    if (
        !Number.isInteger(chef_id) ||
        !Number.isInteger(station_id) ||
        chef_id <= 0 ||
        station_id <= 0
    ) {
        return res.status(400).json({
            error: "Valid chef_id and station_id are required"
        });
    }

    db.run(
        `INSERT INTO bookings (chef_id, station_id)
         VALUES (?, ?)`,
        [chef_id, station_id],
        function (err) {
            if (err) {
                if (err.code === "SQLITE_CONSTRAINT") {
                    return res.status(400).json({
                        error: "Chef or station does not exist"
                    });
                }

                return res.status(500).json({
                    error: err.message
                });
            }

            res.status(201).json({
                message: "Booking created successfully",
                booking_id: this.lastID
            });
        }
    );
});

module.exports = router;
