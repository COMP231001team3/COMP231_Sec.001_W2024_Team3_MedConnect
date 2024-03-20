// Import the Express module
const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

//Import routes
const patientRoutes = require('./server/routes/patientRoute');
const doctorRoutes = require('./server/routes/doctorRoutes');

//Import mongodb module
let mongoose = require('mongoose')
require('dotenv').config();

// Import path module
const path = require('path');

// Create an Express application
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//connection string
const mongoURI = process.env.MONGODB_URI

// Mount patient routes
app.use('/patients', patientRoutes);
// Mount doctor routes
app.use('/doctors', doctorRoutes);

// Connecting to database
mongoose.connect(mongoURI).then(() => {
    console.log('db has connected!')
}).catch(err => {
    console.log(err)
})

_dirname = path.resolve();
if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get('*',(req,res) => {
        res.send('Hello, Express!');
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
