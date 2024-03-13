//Iuliia Chugunova
//Schema of appointments. Defines data structure, allows connections to database and CRUD operations 
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    description: 'ID of the patient'
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    description: 'ID of the doctor'
  },
  dateTime: {
    type: Date,
    required: true,
    description: 'Date and time of the appointment'
  },
  status: {
    type: String,
    enum: ['scheduled', 'cancelled', 'completed'],
    required: true,
    description: 'Status of the appointment (scheduled, cancelled, completed)'
  },
  notes: {
    type: String,
    description: 'Additional notes or comments about the appointment'
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
