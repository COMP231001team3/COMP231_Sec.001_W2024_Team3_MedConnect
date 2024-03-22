const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const compress = require('compression');
const path = require('path'); // Include the path module

const bcrypt = require('bcryptjs');
//Import routes
const doctorRoutes = require('../routes/doctorRoute');
const patientRoutes = require('../routes/patientRoute');
const appointmentRoutes = require('../routes/appointmentRoute');

const { env } = require('process');

module.exports = function () {
    var app = express();
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }
    const corsOptions ={
        origin:'*', 
        credentials:true,
        optionSuccessStatus:200
    }
    app.use(cors(corsOptions));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(methodOverride());

    app.use(express.static("node_modules"));

    //mount routes
    app.use('/patients', patientRoutes);
    app.use('/doctors', doctorRoutes);
    app.use('/appointments', appointmentRoutes);

    __dirname = path.resolve();
    if(process.env.NODE_ENV==='production'){
        app.use(express.static(path.join(__dirname, "/frontend/build")));
        app.get('*',(req,res) => {
            res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
        })
    }
    return app;
};

// Define the path to serve static files 
//const staticPath = path.join(__dirname, '../../client/build'); 

// Serve static files
//app.use(express.static(staticPath));

// Export the Express application
//module.exports = app;
