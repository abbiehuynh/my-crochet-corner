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

// TODO: remove test later
// test - creates an endpoint for the route  "/"
app.get('/', (req, res) => {
    res.json({ message: 'Hello from ExpressJS with React-Vite' });
});

// test get request to tables in database
const testTableRoutes = require('./routes/testTableRoutes.js');
app.use('/testTable', testTableRoutes);

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
