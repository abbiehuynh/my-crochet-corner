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

// tests connection to projects table
app.get('/projects', async (req, res) => {
    try {
        const { rows: projects } = await db.query(
            `SELECT * FROM projects;`
        );
        res.send(projects);
    } catch (error) {
        console.error("Error fetching projects data", error );
        return res.status(400).json({ error });
    }
});

// tests connection to yarn table
app.get('/yarn', async (req, res) => {
    try {
        const { rows: yarn } = await db.query(
            `SELECT * FROM yarn;`
        );
        res.send(yarn);
    } catch (error) {
        console.error("Error fetching projects data", error );
        return res.status(400).json({ error });
    }
});

// tests connection to other_materials table
app.get('/other_materials', async (req, res) => {
    try {
        const { rows: other_materials } = await db.query(
            `SELECT * FROM other_materials;`
        );
        res.send(other_materials);
    } catch (error) {
        console.error("Error fetching projects data", error );
        return res.status(400).json({ error });
    }
});

// tests connection to pattern table
app.get('/pattern', async (req, res) => {
    try {
        const { rows: pattern } = await db.query(
            `SELECT * FROM pattern;`
        );
        res.send(pattern);
    } catch (error) {
        console.error("Error fetching projects data", error );
        return res.status(400).json({ error });
    }
});

module.exports = app;