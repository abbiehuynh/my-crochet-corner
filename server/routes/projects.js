const express = require('express');
const app = express.Router();
const db = require('../db/db-connection.js');

// for projects

// creates an endpoint for the route "/user/:userId/projects"
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

// creates an endpoint for the route "/user/:userId/add-project"
// adds a new project by saving the project name
app.post('/:user_id/add-project', async (req, res) => {
    const userId = req.params.user_id;
    const { project_name } = req.body;

    if (!project_name) {
        return res.status(400).json({ message: 'Project name is required' });
    }

    try {
        const result = await db.query(
            `INSERT INTO projects(user_id, project_name) VALUES($1, $2) RETURNING *;`,
            [userId, project_name]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).json({ message: 'Error adding project', error });
    }
});

// creates an endpoint for the route "/user/:userId/delete-project/:projectId"
// deletes a project by projectId
app.delete('/:user_id/delete-project/:project_id', async (req, res) => {
    const userId = req.params.user_id;
    const projectId = req.params.project_id;

    try {
        // checks if the project belongs to the user
        const result = await db.query(`SELECT FROM projects WHERE user_id = $1 AND id = $2;`, 
            [userId, projectId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Project not found or does not belong to user'});
        } 

        // if the project exists, delete project
        await db.query(`DELETE FROM projects WHERE user_id = $1 AND id = $2;`,
            [userId, projectId]
        );
        res.status(200).send(`Project with id ${projectId} from user with id ${userId} has been deleted`);
        console.log('From the delete request-url', projectId);
    } catch (error) {
        console.error('Error deleting project:', error);
        return res.status(400).json({ error: 'An error has occured while processing your delete request'});
    }
});


// creates an endpoint for the route "/user/:userId/project/:projectId"
// retrieves individual project details by user Id and project Id - for individual project page 
// JOIN table includes the following tables: users, projects, yarn, other materials, pattern, and images
app.get('/:user_id/project/:project_id', async (req, res) => {
    const userId = req.params.user_id;
    const projectId = req.params.project_id;
    try {
        const { rows: project } = await db.query(
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
        res.send(project);
    } catch (error) {
        console.error(`Error fetching data for project with Id: ${projectId}`, error );
        return res.status(400).json({ error });
    }
});

module.exports = app;