const express = require('express');
const app = express.Router();

const db = require('../db/db-connection.js');

// endpoint /testTable

// tests connection to users table
app.get('/users', async (req, res) => {
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

// tests connection to 



module.exports = app;