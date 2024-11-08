const express = require('express');
const app = express.Router();

const db = require('../db/db-connection.js');

// endpoint /testTable

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

// tests connection to returning yarn table as an array of differnet columns
app.get('/yarnArrays/:project_id', async (req, res) => {
    const projectId = req.params.project_id;
    try { 
        // fetches projects by project Id
        const projectQuery = await db.query(`SELECT * FROM projects WHERE id = $1`, [projectId]);
        
        // checks if project exists
        const project = projectQuery.rows[0];
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        
        // fetches yarn table
        const yarnQuery = await db.query(
            `SELECT
                yarn_brand, 
                yarn_color, 
                yarn_weight, 
                yarn_type
            FROM yarn
            WHERE project_id = $1;`,
            [projectId]
        );

        // maps yarn to return object of categories per yarn entry
        const yarns = yarnQuery.rows.map(row => ({
            yarn_brand: row.yarn_brand,
            yarn_color: row.yarn_color,
            yarn_weight: row.yarn_weight,
            yarn_type: row.yarn_type
        }));

        res.json({
            ...project,
            yarns
        });

    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = app;