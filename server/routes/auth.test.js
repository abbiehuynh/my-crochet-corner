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

describe('POST /login', () => {
    beforeEach(() => {
        // resets mock calls before each test
        db.query.mockReset();
        bcrypt.compare.mockReset();
    });

    it('returns a token and user info for valid credentials', async () => {
        const user = {
            id: 1,
            username: 'testuser',
            password: 'hashed-password123'
        };

        // mock the query to simulate a user being found in the databases
        db.query.mockResolvedValueOnce({ rows: [user] });

        // mock bcrypt.compare to return true (password matches)
        bcrypt.compare.mockResolvedValueOnce(true);

        const loginData = {
            username: 'testuser',
            password: 'hashed-password123'
        };

        // sends the login request
        const response = await request(app)
            .post('/login')
            .send(loginData);

        // checks that the response has the expected status and structure
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            token: expect.any(String),
            userId: user.id,
            username: user.username
        }));
    });

    it('returns 401 if the username does not exist', async () => {
        const loginData = {
            username: 'nonexistentuser',
            password: 'password123'
        };

        // mock the query to simulate no user being found in the database
        db.query.mockResolvedValueOnce({ rows: [] });

        const response = await request(app)
            .post('/login')
            .send(loginData);

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: 'Invalid credentials' });
    });

    it('returns 401 if the password is incorrect', async () => {
        const user = {
            id: 1,
            username: 'testuser',
            password: 'hashedPassword123'
        };

        // mocks the query to simulate a user being found in the database
        db.query.mockResolvedValueOnce({ rows: [user] });

        // mocks bcrypt.compare to return false (password does not match)
        bcrypt.compare.mockResolvedValueOnce(false);

        const loginData = {
            username: 'testuser',
            password: 'wrongpassword'
        };

        const response = await request(app)
            .post('/login')
            .send(loginData);
        // TO DO: check message against API
        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: 'Invalid credentials' });
    });

    it('returns 500 if there is a server error', async () => {
        const loginData = {
            username: 'testuser',
            password: 'correctpassword'
        };

        // mocks the database query to throw an error
        db.query.mockRejectedValueOnce(new Error('Database error'));

        const response = await request(app)
            .post('/login')
            .send(loginData);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: 'Error loggin in', error: expect.any(Object) });
    });
});