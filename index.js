// Import necessary modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const tasks = require('./routes/tasks'); // This will be your tasks route file
const cors = require('cors');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/tasks', tasks);

// Start server
app.listen(3000, () => console.log('Server started on port 3000'));