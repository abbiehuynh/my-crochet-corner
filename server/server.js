const express = require('express')
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// creates proxy server to apply access header to every response from the server
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
})

// middleware for parsing application/json
app.use(cors());
app.use(express.json());

// serve static files from react app
app.use(express.static(path.join(__dirname, '../client/dist' )));

// catch all handler for any request that does not match above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// TODO: remove test later
// test - creates an endpoint for the route  "/"
app.get('/', (req, res) => {
    res.json({ message: 'Hello from ExpressJS with React-Vite' });
});

// test get request to tables in database
// const testTableRoutes = require('./routes/testTableRoutes.js');
// app.use('/testTable', testTableRoutes);

// imports routes for auth/login and register
const authRoutes = require('./routes/auth.js');
app.use('/', authRoutes);

// imports routes for projects
const projectRoutes = require('./routes/projects.js');
app.use('/user', projectRoutes);

// imports routes for ai chat
const aiRoutes = require('./routes/ai.js');
app.use('/api', aiRoutes);

// starts server and logs the port the server is listening to
app.listen(PORT, () => {
    console.log(` My Crochet Corner Server listening on ${PORT}`);
});
