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
                u.id AS user_id, u.name AS user_name,
                p.id, p.project_name, p.created_at, p.project_status, p.project_type, p.is_favorite, p.sentiment_score
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
        const result = await db.query(`SELECT * FROM projects WHERE user_id = $1 AND id = $2;`, 
            [userId, projectId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Project not found or does not belong to user'});
        } 

        // if the project exists, delete project
        await db.query(`DELETE FROM projects WHERE user_id = $1 AND id = $2;`,
            [userId, projectId]
        );
        res.status(204).send();
        console.log('Project Id:', projectId, 'with User Id:', userId, 'has been deleted');
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
                u.id AS user_id, u.name AS user_name,
                p.id AS project_id, p.project_name, p.created_at, p.updated_at, p.end_at, p.time_to_complete,
                p.project_status, p.project_type, p.is_favorite, p.notes, p.sentiment_score
            FROM users u
            LEFT JOIN
                projects p ON u.id = p.user_id
            WHERE 
                u.id = $1 AND p.id = $2;`, [userId, projectId]
        );

        if (project.length > 0) {

            // fetch pattern data
            const patternQuery = await db.query(
                `SELECT 
                    pa.id AS pattern_id, pa.pattern_name, pa.pattern_by, pa.pattern_url
                FROM pattern pa
                WHERE pa.project_id = $1`,
                [projectId]
            );

            const patterns = patternQuery.rows.map(row => ({
                pattern_id: row.pattern_id,
                pattern_name: row.pattern_name,
                pattern_by: row.pattern_by,
                pattern_url: row.pattern_url
            }));

            // fetches other material data
            const otherMaterialsQuery = await db.query(
                `SELECT 
                    o.id AS other_materials_id, o.hook_size AS project_hook_size, o.safety_eyes, o.stuffing
                FROM other_materials o
                WHERE o.project_id = $1;`,
                [projectId]
            );

            const otherMaterials = otherMaterialsQuery.rows.map(row => ({
                other_materials_id: row.other_materials_id,
                project_hook_size: row.project_hook_size,
                safety_eyes: row.safety_eyes,
                stuffing: row.stuffing
            }));
            
            // fetches yarn data 
            const yarnQuery = await db.query(
                `SELECT 
                    yarn_brand, yarn_color, yarn_weight, yarn_type
                FROM yarn
                WHERE project_id = $1;`, 
                [projectId]
            );

            const yarns = yarnQuery.rows.map(row => ({
                yarn_brand: row.yarn_brand,
                yarn_color: row.yarn_color,
                yarn_weight: row.yarn_weight,
                yarn_type: row.yarn_type
            }));

            // fetches image data
            const imageQuery = await db.query(
                `SELECT 
                    i.id AS image_id, i.image_url, i.image_name, i.image_description
                FROM images i
                WHERE i.project_id = $1;`,
                [projectId]
            );

            const images = imageQuery.rows.map(row => ({
                image_id: row.image_id,
                image_url: row.image_url,
                image_name: row.image_name,
                image_description: row.image_description
            }));

            return res.json({
                ...project[0],
                patterns,
                otherMaterials,
                yarns,
                images
            });

        } else {
            return res.status(404).json({ error: 'Project not found' });
        }
    } catch (error) {
        console.error(`Error fetching data for project with Id: ${projectId}`, error );
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// creates an endpoint for the route "/user/:userId/project/:projectId"
// updates project details of an individual project by user Id and project Id - project details page
app.put('/:user_id/project/:project_id', async (req, res) => {
    const userId = req.params.user_id;
    const projectId = req.params.project_id;

    // DELETE LATER - debugging - checking for params
    console.log(`Received PUT request for user: ${userId}, project: ${projectId}`);

    const { project_name, is_favorite, project_status, project_type, notes, 
        patterns, otherMaterials, yarns, images
    } = req.body;

    try {
        // checks if project exists and limiting to 1 project
        const projectCheck = await db.query(
            `SELECT id FROM projects WHERE id = $1 AND user_id = $2 LIMIT 1;`,
            [projectId, userId]
        );

        if (projectCheck.rowCount === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // updates project table
        const { rowCount } = await db.query(
            `UPDATE projects
            SET project_name = $1, is_favorite = $2, project_status = $3, project_type = $4, notes = $5, updated_at = NOW() 
            WHERE id = $6 AND user_id = $7;`,
            [project_name, is_favorite, project_status, project_type, notes, projectId, userId]
        );
        
        // clears tables if they exist; pattern, other materials, yarn to prevent duplicates entries
        if (patterns) {
            await db.query(`DELETE FROM pattern WHERE project_id = $1;`, [projectId]);
        }

        if (otherMaterials) {
            await db.query(`DELETE FROM other_materials WHERE project_id = $1;`, [projectId]);
        }

        if (yarns) {
            await db.query(`DELETE FROM yarn WHERE project_id = $1;`, [projectId]);
        }

        // updates pattern table with new information
        if (Array.isArray(patterns) && patterns.length > 0) {
            await Promise.all(patterns.map(pattern => {
                return db.query(
                    `INSERT INTO pattern(project_id, pattern_name, pattern_by, pattern_url)
                    VALUES ($1, $2, $3, $4);`,
                    [projectId, pattern.pattern_name, pattern.pattern_by, pattern.pattern_url]
                );
            }));
        }
        
        // updates other_materials table
        if (Array.isArray(otherMaterials) && otherMaterials.length > 0) {
            await Promise.all(otherMaterials.map(material => {
                return db.query(
                    `INSERT INTO other_materials(project_id, hook_size, safety_eyes, stuffing)
                    VALUES ($1, $2, $3, $4);`,
                    [projectId, material.project_hook_size, material.safety_eyes, material.stuffing]
                );
            }));
        }

        // updates yarn table
        if (Array.isArray(yarns) && yarns.length > 0) {
            await Promise.all(yarns.map(yarn => {
                return db.query(
                    `INSERT INTO yarn(project_id, yarn_brand, yarn_color, yarn_weight, yarn_type)
                    VALUES ($1, $2, $3, $4, $5);`,
                    [projectId, yarn.yarn_brand, yarn.yarn_color, yarn.yarn_weight, yarn.yarn_type]
                );
            }));
        }

        // updates images table
        if (Array.isArray(images) && images.length > 0) {
            await Promise.all(images.map(image => {
                return db.query(
                    `INSERT INTO images (project_id, image_url, image_name, image_description)
                    VALUES ($1, $2, $3, $4)
                    ON CONFLICT (project_id, image_name) DO UPDATE
                    SET image_url = EXCLUDED.image_url,
                        image_description = EXCLUDED.image_description;`,
                    [projectId, image.image_url, image.image_name, image.image_description]
                );
            }));
        }

        // fetches the updated project data
        const updatedProject = await db.query(
            `SELECT * FROM projects WHERE id = $1 AND user_id = $2;`,
            [projectId, userId]
        );

        if (rowCount > 0) {
            res.status(200).json({ 
                message: 'Project updated successfully.',
                updatedProject: updatedProject.rows[0]
            });
        } else {
            res.status(400).json({ error: 'No changes made to the project'});
        }
    } catch (error) {
        console.error(`Error updating project with Id: ${projectId}`, error);
        return res.status(500).json({ error: 'Failed to update project. Please try again later.'});
    }
});

// creates an endpoint for the route "/user/:userId/project/:projectId/favorite"
// updates project with new favorite status by user Id and proejct Id
app.put('/:user_id/project/:project_id/favorite', async (req, res) => {
    const { user_id: userId, project_id: projectId } = req.params;
    const { is_favorite } = req.body;

    // validates that is_favorite is a boolean
    if (typeof is_favorite !== 'boolean') {
        return res.status(400).json({ message: 'Invalid value for favorite status. It must be a boolean.'});
    }

    try {
        const result = await db.query(
            `UPDATE projects 
            SET is_favorite = $1 
            WHERE id = $2 AND user_id = $3
            RETURNING *;`,
            [is_favorite, projectId, userId]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Project not found' });
        }

        return res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating favorite status:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = app;