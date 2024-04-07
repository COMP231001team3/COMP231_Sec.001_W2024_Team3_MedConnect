//Iuliia Chugunova
//Backend server configuration, imports express js app, connects to database and run server on port 5000
// Import the Express module
const express = require('express');

// Import the Express application factory from your custom express.js file
const app = require('./server/config/express')();

// Import Mongoose for MongoDB connection
const mongoose = require('mongoose');

// Import path module
const path = require('path');

// Load environment variables from .env file
require('dotenv').config();

// Connection string
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB database
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'MedConnect'
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
  // Handle error, exit the application
  process.exit(1);
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "/frontend/build")));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}

// Start the Express server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the Express application
module.exports = app;
