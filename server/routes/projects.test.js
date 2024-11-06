const request = require('supertest');
const app = require('./projects.js');

jest.mock('../db/db-connection.js', () => ({
    query: jest.fn(),
}));

const db = require('../db/db-connection.js');

describe('GET /:user_id/projects', () => {
    // resets mock function before each test
    beforeEach(() => {
        db.query.mockReset();
    })

    it('returns a list of projects by user', async () => {
        // mocking the database query response
        const projectList = [
            {
                created_at: '2024-01-01T00:00:00.000Z',
                id: 101,
                is_favorite: false,
                project_name: 'Cat Loaf',
                project_status: 'In Progress',
                project_type: 'Amigurimi',
                sentiment_score: null,
                user_id: 20,
                user_name: 'oliver'
            },
            {
                created_at: '2024-02-01T00:00:00.000Z',
                id: 102,
                is_favorite: true,
                project_name: 'Star Blanket',
                project_status: 'Completed',
                project_type: 'Blanket',
                sentiment_score: null,
                user_id: 20,
                user_name: 'oliver'
            }
        ];

        // mocks the query to return mock data
        db.query.mockResolvedValue({ rows: projectList });

        const userId = 20;
        const response = await request(app).get(`/${userId}/projects`);
        console.log(response.body)

        // verifies the response status and content
        expect(response.status).toBe(200);
        // checks if the response body matches the mock data
        expect(response.body).toEqual(projectList);
        // checks two projects are returned
        expect(response.body.length).toBe(2);
        // verifies the project names
        expect(response.body[0].project_name).toBe('Cat Loaf');
        expect(response.body[1].project_name).toBe('Star Blanket');
        // checks the first project contains required fields
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('project_name');
        expect(response.body[0]).toHaveProperty('created_at');
        expect(response.body[0]).toHaveProperty('project_status');
    });

    it('returns an empty array if no projects are found', async () => {
        const noProjects = [];
        db.query.mockResolvedValue({ rows: noProjects });

        const userId = 20;
        const response = await request(app).get(`/${userId}/projects`);

        // checks the response is 200 but the body is empty
        expect(response.status).toBe(200);
        expect(response.body).toEqual(noProjects);  // no projects or empty array
    });

    it('returns a 400 status if there is an error with the database query', async () => {
        db.query.mockRejectedValue(new Error('Database error'));

        const userId = 20;
        const response = await request(app).get(`/${userId}/projects`);

        // checks the response status is 400 in case of an error
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});

describe('POST /:user_id/add-project', () => {
    beforeEach(() => {
        db.query.mockReset();
    });

    it('adds new project', async () => {
        const userId = 20;
        const projectName = 'New Project';
        const newProject = {
            rows: [{
                id: 1,
                user_id: userId,
                project_name: projectName,
                created_at: '2024-01-01T00:00:00.000Z',
            }]
        };

        db.query.mockResolvedValue(newProject);

        const response = await request(app)
            .post(`/${userId}/add-project`)
            .send({ project_name: projectName });

        // checks the response status and the returned project data
        expect(response.status).toBe(201);
        expect(response.body).toEqual(newProject.rows[0]);
    });

    it('returns 400 if project name is missing', async () => {
        const userId = 20;
        const response = await request(app)
            .post(`/${userId}/add-project`)
            .send({});

        // checks the response status and message
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'Project name is required' });
    });

    it('returns 500 if there is a server error', async () => {
        const userId = 20;
        const projectName = 'New Project';

        db.query.mockRejectedValue(new Error('Database error'));

        const response = await request(app)
            .post(`/${userId}/add-project`)
            .send({ project_name: projectName });

        // checks the response status and error message
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('message', 'Error adding project');
        expect(response.body).toHaveProperty('error');
    });
});

describe('DELETE /:user_id/delete-project/:project_id', () => {
    beforeEach(() => {
        db.query.mockReset();
    });

    it('delete the project by project Id and user Id', async () => {
        const userId = 20;
        const projectId = 101;

        // mock the database response for checking if the project exists and belongs to the user
        const mockProject = {
            rows: [{
                id: projectId,
                user_id: userId,
                project_name: 'Test Project',
                created_at: '2024-01-01T00:00:00.000Z'
            }]
        };
        // mocks project being found and deleted
        db.query.mockResolvedValueOnce(mockProject);
        db.query.mockResolvedValueOnce({});

        const response = await request(app)
            .delete(`/${userId}/delete-project/${projectId}`);

        // checks the status and that no content is returned
        expect(response.status).toBe(204);
        expect(response.body).toEqual({});
    });

    it('returns 404 if the project does not exist or does not belong to the user', async () => {
        const userId = 20;
        const projectId = 999;

        // mock the database response to simulate project not found
        db.query.mockResolvedValueOnce({ rowCount: 0 });

        const response = await request(app)
            .delete(`/${userId}/delete-project/${projectId}`);

        // checks the status and the error message
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            error: 'Project not found or does not belong to user'
        });
    });

    it('returns 400 if there is a server error', async () => {
        const userId = 20;
        const projectId = 101;

        // mock the database to throw an error
        db.query.mockRejectedValue(new Error('Database error'));

        const response = await request(app)
            .delete(`/${userId}/delete-project/${projectId}`);

        // checks the response status and error message
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: 'An error has occured while processing your delete request'
        });
    });
});

describe('GET /:user_id/project/:project_id', () => {
    beforeEach(() => {
        db.query.mockReset();
    });

    it('returns project details of individual project', async () => {
        const userId = 20;
        const projectId = 101;

        // mocks the main project data
        const mockProject = {
            rows: [{
                user_id: userId,
                user_name: 'oliver',
                project_id: projectId,
                project_name: 'Cat Loaf',
                created_at: '2024-01-01T00:00:00.000Z',
                updated_at: '2024-01-01T00:00:00.000Z',
                end_at: '2024-12-31T00:00:00.000Z',
                time_to_complete: '30 days',
                project_status: 'In Progress',
                project_type: 'Amigurimi',
                is_favorite: false,
                notes: null,
                sentiment_score: null
            }]
        };

        // mocks the related data queries
        const mockPatterns = { rows: [{ pattern_id: 1, pattern_name: 'Cat Loaf', pattern_by: 'Alice', pattern_url: 'http://pattern.url' }] };
        const mockOtherMaterials = { rows: [{ other_materials_id: 1, project_hook_size: '5mm', safety_eyes: '10mm', stuffing: '50 grams' }] };
        const mockYarns = { rows: [{ yarn_brand: 'Loops and Threads Soft Classic', yarn_color: 'White', yarn_weight: '4', yarn_type: 'Acrylic' }] };
        const mockImages = { rows: [{ image_id: 1, image_url: 'http://image.url', image_name: 'image1', image_description: 'A crochet project' }] };

        // mocks the database queries
        db.query.mockResolvedValueOnce(mockProject);
        db.query.mockResolvedValueOnce(mockPatterns);
        db.query.mockResolvedValueOnce(mockOtherMaterials);
        db.query.mockResolvedValueOnce(mockYarns);
        db.query.mockResolvedValueOnce(mockImages);

        const response = await request(app)
            .get(`/${userId}/project/${projectId}`);

        // checks the status and response structure
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            user_id: userId,
            user_name: 'oliver',
            project_id: projectId,
            project_name: 'Cat Loaf',
            created_at: '2024-01-01T00:00:00.000Z',
            updated_at: '2024-01-01T00:00:00.000Z',
            end_at: '2024-12-31T00:00:00.000Z',
            time_to_complete: '30 days',
            project_status: 'In Progress',
            project_type: 'Amigurimi',
            is_favorite: false,
            notes: null,
            sentiment_score: null,
            patterns: [{
                pattern_id: 1,
                pattern_name: 'Cat Loaf',
                pattern_by: 'Alice',
                pattern_url: 'http://pattern.url'
            }],
            otherMaterials: [{
                other_materials_id: 1,
                project_hook_size: '5mm',
                safety_eyes: '10mm',
                stuffing: '50 grams'
            }],
            yarns: [{
                yarn_brand: 'Loops and Threads Soft Classic',
                yarn_color: 'White',
                yarn_weight: '4',
                yarn_type: 'Acrylic'
            }],
            images: [{
                image_id: 1,
                image_url: 'http://image.url',
                image_name: 'image1',
                image_description: 'A crochet project'
            }]
        });
    });

    it('returns 404 if the project does not exist', async () => {
        const userId = 20;
        const projectId = 999;

        // mock the database response to simulate project not found
        db.query.mockResolvedValueOnce({ rows: [] });

        const response = await request(app)
            .get(`/${userId}/project/${projectId}`);

        // checks the status and error message
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Project not found' });
    });

    it('returns 500 if there is a server error', async () => {
        const userId = 20;
        const projectId = 101;

        // mock the database to throw an error
        db.query.mockRejectedValue(new Error('Database error'));

        const response = await request(app)
            .get(`/${userId}/project/${projectId}`);

        // checks the response status and error message
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal server error' });
    });
});

describe('PUT /:user_id/project/:project_id', () => {
    beforeEach(() => {
        db.query.mockReset();
    });

    it('updates individual project details', async () => {
        const userId = 20;
        const projectId = 101;

        const updatedProjectData = {
            project_name: 'Cat Loaf in Calico',
            is_favorite: true,
            project_status: 'Completed',
            project_type: 'Amigurimi',
            notes: 'new note',
            patterns: [
                { pattern_name: 'Updated Pattern', pattern_by: 'Alice', pattern_url: 'http://updated-pattern.url' }
            ],
            otherMaterials: [
                { project_hook_size: '6mm', safety_eyes: '10mm', stuffing: '100 grams' }
            ],
            yarns: [
                { yarn_brand: 'Sweet Snuggles Lite', yarn_color: 'White', yarn_weight: '6', yarn_type: 'Chenille' }
            ],
            images: [
                { image_url: 'http://updated-image.url', image_name: 'updated-image1', image_description: 'crochet project image' }
            ]
        };

        // console.log('mocks calls:', db.query.mock.calls);
        // mocks the project check query that project exists
        db.query.mockResolvedValueOnce({ rowCount: 1 });
        // mocks the update query on the project
        db.query.mockResolvedValueOnce({ rowCount: 1 });

        // mocks the related data deletion
        db.query.mockResolvedValueOnce({}); // patterns 
        db.query.mockResolvedValueOnce({}); // other materials 
        db.query.mockResolvedValueOnce({}); // yarns
        // mocks the related data insertion
        db.query.mockResolvedValueOnce({}); // patterns
        db.query.mockResolvedValueOnce({}); // materials
        db.query.mockResolvedValueOnce({}); // yarns
        db.query.mockResolvedValueOnce({}); // images
        // mocks fetching updated project
        db.query.mockResolvedValueOnce({ rows: [{ id: projectId, ...updatedProjectData }] });

        const response = await request(app)
            .put(`/${userId}/project/${projectId}`)
            .send(updatedProjectData);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Project updated successfully.');
        expect(response.body.updatedProject.project_name).toBe('Cat Loaf in Calico');
        expect(response.body.updatedProject.is_favorite).toBe(true);
        expect(response.body.updatedProject.project_status).toBe('Completed');
        expect(response.body.updatedProject.patterns[0].pattern_name).toBe('Updated Pattern');
    });

    it('returns 404 if the project does not exist', async () => {
        const userId = 20;
        const projectId = 999;

        // mocks project check query (project not found)
        db.query.mockResolvedValueOnce({ rowCount: 0 });

        const response = await request(app)
            .put(`/${userId}/project/${projectId}`)
            .send({
                project_name: 'Cat Loaf in Calico'
            });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Project not found' });
    });

    it('returns 400 if no changes were made to the project', async () => {
        const userId = 20;
        const projectId = 101;

        // mocks the project check query (project exists)
        db.query.mockResolvedValueOnce({ rowCount: 1 });
        // mocks the update query (no changes)
        db.query.mockResolvedValueOnce({ rowCount: 0 });

        const response = await request(app)
            .put(`/${userId}/project/${projectId}`)
            .send({
                project_name: 'Cat Loaf'
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'No changes made to the project' });
    });

    it('return 500 if there is a server error', async () => {
        const userId = 20;
        const projectId = 101;

        // mocks project check query (project exists)
        db.query.mockResolvedValueOnce({ rowCount: 1 });
        // mocks the update query to throw an error 
        db.query.mockRejectedValueOnce(new Error('Database error'));

        const response = await request(app)
            .put(`/${userId}/project/${projectId}`)
            .send({
                project_name: 'Updated Cat Loaf'
            });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Failed to update project. Please try again later.' });
    });
});