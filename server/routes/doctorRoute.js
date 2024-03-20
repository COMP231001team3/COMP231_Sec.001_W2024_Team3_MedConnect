//Jayson Tuazon
<<<<<<< Updated upstream
//routes/patientRoutes.js
//Provides routes related to patient to perform GET operations

=======
//routes/doctorRoutes.js
//Provides routes related to patient to perform GET operations
>>>>>>> Stashed changes
const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// Route to retrieve doctor profile
router.get('/:doctorId/profile', doctorController.getDoctorProfile);

// Route to retrieve doctor schedule
router.get('/:doctorId/schedule', doctorController.getDoctorSchedule);

module.exports = router;
