const request = require('supertest');
const app = require('./auth.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

jest.mock('bcrypt');
jest.mock('../db/db-connection.js', () => ({
    query: jest.fn(),
}));

const db = require('../db/db-connection.js');

describe('POST /register', () => {
    beforeEach(() => {
        db.query.mockReset();
    });

    it('register a new user', async () => {
        const newUser = {
            name: 'Test User',
            username: 'testing',
            email: 'testing@gmail.com',
            password: 'password123'
        };

        // mocks the db query for checking if the username and email exists 
        db.query.mockResolvedValueOnce({ rows: [] });
        db.query.mockResolvedValueOnce({ rows: [] });

        // mocks the db query to simulate creating a new user
        const insertedUser = {
            ...newUser,
            id: 1,
            password: 'hashed-password123'
        };
        db.query.mockResolvedValueOnce({ rows: [insertedUser] });

        const response = await request(app)
            .post('/register')
            .send(newUser);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: newUser.name,
            username: newUser.username,
            email: newUser.email,
            password: expect.any(String)
        }));
    });

    it('returns 400 if the username already exists', async () => {
        const newUser = {
            name: 'Test User',
            username: 'testing',
            email: 'testing@gmail.com',
            password: 'password123'
        };

        // mock the db query for checking if the username exists 
        db.query.mockResolvedValueOnce({ rows: [{ username: 'testing' }] });

        const response = await request(app)
            .post('/register')
            .send(newUser);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Username already exists');
    });

    it('returns 400 if the email already exists', async () => {
        const newUser = {
            name: 'Test User',
            username: 'testing',
            email: 'testing@gmail.com',
            password: 'password123'
        };

        // mocks the db query for checking if the username and email exists
        db.query.mockResolvedValueOnce({ rows: [] });
        db.query.mockResolvedValueOnce({ rows: [{ email: 'testing@gmail.com' }] });

        const response = await request(app)
            .post('/register')
            .send(newUser);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Email already exists');
    });

    it('returns 500 if there is a server error', async () => {
        const newUser = {
            name: 'Test User',
            username: 'testing',
            email: 'testing@gmail.com',
            password: 'password123'
        };

        // simulate a server error (mock a rejected query)
        db.query.mockRejectedValueOnce(new Error('Database error'));

        const response = await request(app)
            .post('/register')
            .send(newUser);

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Error creating user');
    });
});