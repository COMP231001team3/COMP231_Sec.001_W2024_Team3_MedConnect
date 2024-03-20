const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const compression = require('compression');
const path = require('path'); // Include the path module

// Create an Express application
const app = express();

// Middleware to enable CORS
app.use(cors());

// Middleware to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to override HTTP methods
app.use(methodOverride('_method'));

// Middleware to compress responses
app.use(compression());

// Define the path to serve static files 
const staticPath = path.join(__dirname, '../../client/build'); 
// Serve static files
app.use(express.static(staticPath));

// Export the Express application
module.exports = app;
