//Iuliia Chugunova
//Allows to access CRUD operation on doctor collection

const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

//Retrieve all doctors
router.get('/', doctorController.getAllDoctors);

//Retrieve a doctor by Id
router.get('/:id', doctorController.getDoctorById);

//create a doctor
router.post('/', doctorController.createDoctor);

//retrieve a doctor by id and edit his/her info
router.put('/:id', doctorController.updateDoctor);

//delete doctor
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;
