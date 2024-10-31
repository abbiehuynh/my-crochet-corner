const express = require('express');
const app = express.Router();
const db = require('../db/db-connection.js');

require('dotenv').config();

const OpenAI = require('openai');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());

// creates request to OpenAI API for chatbox responses
app.post('/chatbot', async (req, res) => {
    const userMessage = req.body.message;

    if(!userMessage) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [
                    { role: "system", content: "You are to provide inspiration and ideas for crochet related projects. If asked, you can provide crochet patterns." },
                    { role: "user", content: userMessage }
                ],
                max_tokens: 200
            })
        });  

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error("OpenAI API error:", errorResponse);
            return res.status(response.status).json({ error: errorResponse.message })
        }

        const data = await response.json();
        const botMessage = data.choices[0].message.content;
        res.json({ message: botMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error communicating with OpenAI API. Please try again later.' });
    }
});

module.exports = app;