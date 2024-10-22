const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/db-connection.js');
const app = express.Router();

// creates register endpoing
app.post('/register', async (req, res) => {
    const { name, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try { 
        const result = await db.query(
            `INSERT INTO users(name, username, email, password) VALUES($1, $2, $3, $4) RETURNING *;`,
            [name, username, email, hashedPassword]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

// creates login endpoing
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // logs user input
    console.log('Login attempt:', { username, password });

    try {
        const result = await db.query(
            `SELECT * FROM users WHERE username = $1`, 
            [username]
        );

        console.log('User fetched from database:', result.rows);

        if (result.rows.length === 0) {
            console.log('User not found');
            return res.status(401).json({ message: 'Invalid credentials'});
        }

        const user = result.rows[0];
        const match = await bcrypt.compare(password.trim(), user.password);
        // debugging - passwords do not match with comparing
        console.log(`Comparing passwords: Input: ${password.trim()}, Stored: ${user.password}, Match: ${match}`);
 
        if (!match) {
            console.log('Password does not match');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // debugging - "secretOrPrivateKey must have a value"
        // console.log('JWT Secret:', process.env.JWT_SECRET);
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, username: user.username });
    } catch (error) {
        // logging errors for debugging
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error loggin in', error });
    }
});

module.exports = app;