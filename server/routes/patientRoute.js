// Iuliia Chugunova
//routes/patientRoutes.js
//Provides routes related to patient to perform CRUD operations

const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Retrieve all patients
router.get('/', patientController.getAllPatients);

// Retrieve a specific patient by ID
router.get('/:id', patientController.getPatientById);

// Update a patient by ID
router.put('/:id', patientController.updatePatientById);

// Route for patient registration
router.post('/register', patientController.registerPatient);

// Delete a patient by ID
router.delete('/:id', patientController.deletePatientById);

module.exports = router;
