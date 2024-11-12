const request = require('supertest');
const app = require('./ai.js');
const fetch = require('node-fetch'); 

jest.mock('node-fetch', () => jest.fn());
  
process.env.OPENAI_API_KEY = 'FAKE_API_KEY';

describe('POST /chatbot', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns bot response', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                choices: [
                    {
                        message: {
                            content: 'Here is a crochet idea: make a scarf!'
                        }
                    }
                ]
            })
        });

        const userMessage = 'Tell me a crochet project idea';
        const response = await request(app)
            .post('/chatbot')
            .send({ message: userMessage });

        // verifies the response status and message content
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Here is a crochet idea: make a scarf!' });
    });

    it('returns 400 if message is not provided', async () => {
        const response = await request(app)
            .post('/chatbot')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Message is required' });
    });

    it('returns 500 if OpenAI API returns an error', async () => {
        // mock OpenAI SDK to simulate an error response
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
            json: async () => ({ message: 'OpenAI API error occurred' })
        });

        const userMessage = 'Tell me a crochet project idea';
        const response = await request(app)
            .post('/chatbot')
            .send({ message: userMessage });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'OpenAI API error occurred' });
    });

    it('returns 500 if there is an internal error in the route', async () => {
        // mocks the fetch function to throw an internal error
        fetch.mockRejectedValueOnce(new Error('Internal error'));

        const userMessage = 'Tell me a crochet project idea';
        const response = await request(app)
            .post('/chatbot')
            .send({ message: userMessage });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: 'Error communicating with OpenAI API. Please try again later.'
        });
    });

    it('sets Authorization header correctly', async () => {
        const userMessage = 'Tell me a crochet project idea';

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                choices: [{ message: { content: 'Here is a crochet idea: make a scarf!' } }]
            })
        });

        const response = await request(app)
            .post('/chatbot')
            .send({ message: userMessage });

        // check if fetch was called with the correct Authorization header
        expect(fetch).toHaveBeenCalledWith(
            'https://api.openai.com/v1/chat/completions', 
            expect.objectContaining({
                headers: expect.objectContaining({
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                }),
            })
        );
         // verifies the response status and body
         expect(response.status).toBe(200);
         expect(response.body).toEqual({
             message: 'Here is a crochet idea: make a scarf!'
         });
    });
});

