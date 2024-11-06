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
    
    it('returns a list of projects for a user', async () => {
        // mocking the database query response
        const mockProjects = [
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
        db.query.mockResolvedValue({ rows: mockProjects });

        const userId = 20;
        const response = await request(app).get(`/${userId}/projects`);
        console.log(response.body)

        // verifies the response status and content
        expect(response.status).toBe(200);
        // checks if the response body matches the mock data
        expect(response.body).toEqual(mockProjects);
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
        const mockProjects = [];
        db.query.mockResolvedValue({ rows: mockProjects });

        const userId = 20;
        const response = await request(app).get(`/${userId}/projects`);

        // checks the response is 200 but the body is empty
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockProjects);  // no projects or empty array
    });

    it('returns a 500 status if there is an error with the database query', async () => {
        db.query.mockRejectedValue(new Error('Database error'));

        const userId = 20;
        const response = await request(app).get(`/${userId}/projects`);

        // checks the response status is 400 in case of an error
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});

