const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const compress = require('compression');
const path = require('path');
const morgan = require('morgan'); // Import morgan for logging

const doctorRoutes = require('../routes/doctorRoute');
const patientRoutes = require('../routes/patientRoute');
const appointmentRoutes = require('../routes/appointmentRoute');
const userRoute = require('../routes/userRoute');

module.exports = function () {
    const app = express();

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev')); // Enable logging in development
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    const corsOptions = {
        origin: '*', // Adjust this to your specific domain(s)
        credentials: true,
        optionSuccessStatus: 200,
    };
    app.use(cors(corsOptions));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(methodOverride());

    // Serve static files from the "public" or "static" folder
    app.use(express.static(path.join(__dirname, 'public')));

    // Mount routes
    app.use('/patients', patientRoutes);
    app.use('/doctors', doctorRoutes);
    app.use('/appointments', appointmentRoutes);
    app.use('/', userRoute);

    // Serve React build folder in production
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, 'frontend', 'build')));
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
        });
    }

    return app;
};

/*const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const compress = require('compression');
const path = require('path'); 
//require('dotenv').config();
const bcrypt = require('bcryptjs');
//Import routes
const doctorRoutes = require('../routes/doctorRoute');
const patientRoutes = require('../routes/patientRoute');
const appointmentRoutes = require('../routes/appointmentRoute');
const userRoute = require('../routes/userRoute');


const { env } = require('process');
//const { configDotenv } = require('dotenv');

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
    //app.use(configDotenv)
    //mount routes
    app.use('/patients', patientRoutes);
    app.use('/doctors', doctorRoutes);
    app.use('/appointments', appointmentRoutes);
    app.use('/', userRoute)

    __dirname = path.resolve();
    if(process.env.NODE_ENV==='production'){
        app.use(express.static(path.join(__dirname, "/frontend/build")));
        app.get('*',(req,res) => {
            res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
        })
    }
    return app;
}; */
