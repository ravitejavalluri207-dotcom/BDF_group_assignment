
const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all chefs
router.get("/", (req, res) => {
    db.all("SELECT * FROM chefs", [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.status(200).json(rows);
    });
});

// GET one chef by ID
router.get("/:id", (req, res) => {
    db.get(
        "SELECT * FROM chefs WHERE id = ?",
        [req.params.id],
        (err, row) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (!row) {
                return res.status(404).json({
                    message: "Chef not found"
                });
            }

            res.status(200).json(row);
        }
    );
});

// ADD a new chef
router.post("/", (req, res) => {
    const { name } = req.body;

    if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
            error: "Chef name is required"
        });
    }

    db.run(
        "INSERT INTO chefs (name) VALUES (?)",
        [name.trim()],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.status(201).json({
                message: "Chef added successfully",
                id: this.lastID
            });
        }
    );
});

module.exports = router;
