// Iuliia Chugunova
//routes/patientRoutes.js
//Provides routes related to patient to perform CRUD operations

const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Retrieve all patients
router.get('/', patientController.getAllPatients);

// GET patient by email
router.get('/email/:email', patientController.getPatientByEmail);

// Retrieve a specific patient by ID
router.get('/:id', patientController.getPatientById);

// Update a patient by ID
router.put('/:id', patientController.updatePatientById);

// Delete a patient by ID
router.delete('/:id', patientController.deletePatientById);

module.exports = router;
