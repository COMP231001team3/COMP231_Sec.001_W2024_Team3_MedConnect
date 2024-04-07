//Iuliia Chugunova
//Defines routes for specific CRUD operation

const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Create a new appointment
router.post('/book', appointmentController.bookAppointment);

// Get all appointments
//router.get('/', appointmentController.getAppointments);

// Get all appointments or by date
router.get('/', appointmentController.getAppointments);


// Get all AVAILABLE slots
router.get('/available-slots', appointmentController.getAvailableSlots);

// Get appointment by ID
router.get('/:id', appointmentController.getAppointmentById);

// Update appointment by ID
router.put('/:id', appointmentController.updateAppointment);

// Delete appointment by ID
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;