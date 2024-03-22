//Iuliia Chugunova
//Defines routes for specific CRUD operation

const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Route to create appointment
router.post('/', appointmentController.createAppointment);

// Route to get list of appointments
router.get('/', appointmentController.getAppointments);

//route to get particular appointment
router.get('/:id', appointmentController.getAppointmentById);

//route to edit particular appointment
router.put('/:id', appointmentController.updateAppointment);

// route to delete particular appointment
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;
