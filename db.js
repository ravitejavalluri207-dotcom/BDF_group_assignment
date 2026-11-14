
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Create or connect to the database file
const dbPath = path.join(__dirname, "data", "kitchenkeys.db");

const db = new sqlite3.Database(dbPath);

// Create our three related tables
db.serialize(() => {

    // Enable foreign key relationships
    db.run("PRAGMA foreign_keys = ON");

    // Chefs table
    db.run(`
        CREATE TABLE IF NOT EXISTS chefs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )
    `);

    // Stations table
    db.run(`
        CREATE TABLE IF NOT EXISTS stations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            cuisine TEXT NOT NULL
        )
    `);

    // Bookings table
    db.run(`
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            chef_id INTEGER NOT NULL,
            station_id INTEGER NOT NULL,
            booking_date TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (chef_id) REFERENCES chefs(id),
            FOREIGN KEY (station_id) REFERENCES stations(id)
        )
    `);
});

module.exports = db;
