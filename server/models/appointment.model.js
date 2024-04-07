//Iuliia Chugunova
//Schema of appointments. Defines data structure, allows connections to database and CRUD operations 

const mongoose = require('mongoose');
//const Doctor = require('../models/doctor.model');
//const Patient = require('../models/patient.model')


const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'cancelled', 'completed'],
    default: 'scheduled'
  },
  reason: {
    type: String
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
