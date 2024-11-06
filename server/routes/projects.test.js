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

