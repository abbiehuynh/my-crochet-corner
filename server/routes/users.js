const express = require('express');
const app = express.Router();

const db = require('../db/db-connection.js');

// endpoint to users table
app.get('/', async (req, res) => {
    try {
        const { rows: users } = await db.query(
            `SELECT * FROM users;`
        );
        res.send(users);
    } catch (error) {
        console.error("Error fetching projects data", error );
        return res.status(400).json({ error });
    }
});


module.exports = app;