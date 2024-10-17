const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

// imports the database connection
const db = require('./db/db-connection.js');

const app = express();
const PORT = process.env.PORT || 3001;

// middleware for parsing application/json
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// test - creates an endpoint for the route  "/"
app.get('/', (req, res) => {
    res.json({ message: 'Hello from ExpressJS with React-Vite' });
});

// start server
app.listen(PORT, () => {
    console.log(` My Crochet Corner Server listening on ${PORT}`);
});