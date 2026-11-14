
const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all stations (also supports cuisine search)
router.get("/", (req, res) => {
    const { cuisine } = req.query;

    let sql = "SELECT * FROM stations";
    let params = [];

    if (cuisine) {
        sql += " WHERE cuisine LIKE ?";
        params.push(`%${cuisine}%`);
    }

    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(200).json(rows);
    });
});

// GET top 3 most-booked stations
router.get("/top", (req, res) => {
    const sql = `
        SELECT stations.id, stations.name, stations.cuisine,
               COUNT(bookings.id) AS booking_count
        FROM stations
        INNER JOIN bookings ON stations.id = bookings.station_id
        GROUP BY stations.id
        ORDER BY booking_count DESC, stations.name ASC
        LIMIT 3
    `;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(200).json(rows);
    });
});

// GET one station by ID
router.get("/:id", (req, res) => {
    db.get(
        "SELECT * FROM stations WHERE id = ?",
        [req.params.id],
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (!row) {
                return res.status(404).json({ message: "Station not found" });
            }

            res.status(200).json(row);
        }
    );
});

// ADD a station
router.post("/", (req, res) => {
    const { name, cuisine } = req.body;

    if (!name || !cuisine || !name.trim() || !cuisine.trim()) {
        return res.status(400).json({
            error: "Station name and cuisine are required"
        });
    }

    db.run(
        "INSERT INTO stations (name, cuisine) VALUES (?, ?)",
        [name.trim(), cuisine.trim()],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: "Station added successfully",
                id: this.lastID
            });
        }
    );
});

// UPDATE a station
router.put("/:id", (req, res) => {
    const { name, cuisine } = req.body;

    if (!name || !cuisine || !name.trim() || !cuisine.trim()) {
        return res.status(400).json({
            error: "Station name and cuisine are required"
        });
    }

    db.run(
        "UPDATE stations SET name = ?, cuisine = ? WHERE id = ?",
        [name.trim(), cuisine.trim(), req.params.id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (this.changes === 0) {
                return res.status(404).json({ message: "Station not found" });
            }

            res.status(200).json({
                message: "Station updated successfully"
            });
        }
    );
});

// DELETE a station
router.delete("/:id", (req, res) => {
    db.run(
        "DELETE FROM stations WHERE id = ?",
        [req.params.id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (this.changes === 0) {
                return res.status(404).json({ message: "Station not found" });
            }

            res.status(200).json({
                message: "Station deleted successfully"
            });
        }
    );
});

module.exports = router;
