// Import the Express module
const express = require('express');
//Import mongodb module
let mongoose = require('mongoose')
require('dotenv').config();

// Import path module
const path = require('path');

//connection string
const mongoURI = process.env.MONGODB_URI

// Create an Express application
const app = express();

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
        //res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

// Start the Express server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
