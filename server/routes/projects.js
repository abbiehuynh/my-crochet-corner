const express = require('express');
const app = express.Router();
const db = require('../db/db-connection.js');

// for projects

// creates an endpoint for the route "/projectsByUserId/userId"
// retrieves a list of all projects by userId from the database for the home page
// JOIN table includes the following tables: users and projects
app.get('/:user_id/projects', async (req, res) => {
    const userId = req.params.user_id;
    try {
        const { rows: projectsByUserId } = await db.query(
            `SELECT 
                u.id AS user_id,
                u.name AS user_name,
                p.id,
                p.project_name,
                p.created_at,
                p.project_status,
                p.project_type,
                p.is_favorite,
                p.sentiment_score
            FROM users u
            LEFT JOIN
                projects p ON u.id = p.user_id
            WHERE 
                u.id = $1;`, [userId]
        );
        res.send(projectsByUserId);
    } catch (error) {
        console.error("Error fetching projects data", error );
        return res.status(400).json({ error });
    }
});

// creates an endpoint for the route "/projectsByUser/userId/projects/projectId"
// retrieves individual project details by user Id and project Id - for individual project page 
// JOIN table includes the following tables: users, projects, yarn, other materials, pattern, and images
app.get('/:user_id/project/:project_id', async (req, res) => {
    const userId = req.params.user_id;
    const projectId = req.params.project_id;
    try {
        const { rows: projectsByUserId } = await db.query(
            `SELECT 
                u.id AS user_id,
                u.name AS user_name,
                p.id AS project_id,
                p.project_name,
                p.created_at,
                p.updated_at,
                p.end_at,
                p.time_to_complete,
                p.project_status,
                p.project_type,
                p.is_favorite,
                p.notes,
                p.sentiment_score,
                y.id AS yarn_id,
                y.yarn_brand, 
                y.yarn_type,
                y.yarn_weight,
                y.recommended_hook_size AS yarn_recommended_hook_size,
                y.yarn_color,
                y.hook_size AS yarn_hook_size_used,
                o.id AS other_materials_id,
                o.hook_size AS project_hook_size,
                o.safety_eyes,
                o.stuffing,
                pa.id AS pattern_id,
                pa.pattern_name,
                pa.pattern_by,
                pa.pattern_url,
                i.id AS image_id,
                i.image_url,
                i.image_name,
                i.image_description
            FROM users u
            LEFT JOIN
                projects p ON u.id = p.user_id
            LEFT JOIN
                yarn y ON p.id = y.project_id
            LEFT JOIN
                other_materials o ON p.id = o.project_id
            LEFT JOIN 
                pattern pa ON p.id = pa.project_id
            LEFT JOIN
                images i ON p.id = i.project_id
            WHERE 
                u.id = $1 AND p.id = $2;`, [userId, projectId]
        );
        res.send(projectsByUserId);
    } catch (error) {
        console.error(`Error fetching data for project with Id: ${projectId}`, error );
        return res.status(400).json({ error });
    }
});

module.exports = app;