//Iuliia Chugunova
//Allows to access CRUD operation on doctor collection

const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

//Retrieve all doctors
router.get('/', doctorController.getAllDoctors);

// GET doctor by email
router.get('/email/:email', doctorController.getDoctorByEmail);

//retrieve doctor by name
router.get('/name/:name', doctorController.getDoctorByName);

//retrieve doctor by spec
router.get('/specialization/:specialization', doctorController.getDoctorBySpecialization);

//search route
router.get('/search', doctorController.searchDoctors);

//Retrieve a doctor by Id
router.get('/:id', doctorController.getDoctorById);

//retrieve a doctor by id and edit his/her info
router.put('/:id', doctorController.updateDoctor);

//delete doctor
router.delete('/:id', doctorController.deleteDoctor);

//get assigned patients
router.get('/:doctorId/patients', doctorController.getAssignedPatients);

module.exports = router;