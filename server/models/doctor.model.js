//Iuliia Chugunova
//Schema of doctor. Defines data structure, allows connections to database and CRUD operations 

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Appointment = require('../models/appointment.model')

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    description: 'Name of the doctor'
  },
  specialization: {
    type: String,
    description: 'Specialization of the doctor'
  },
  email: {
    type: String,
    required: true,
    match: /^\S+@\S+\.\S+$/,
    description: 'Email address of the doctor'
  },
  phone: {
    type: String,
    required: true,
    match: /^\+?\d{1,3}-?\d{3}-?\d{3}-?\d{4}$/,
    description: 'Phone number of the doctor'
  },
  password: {
    type: String,
    required: true,
    description: 'Password of the doctor'
  },
  birth: {
    type: String,
    required: true
  },
  address: {
    type: String,
    description: 'Address of the doctor'
  },
  role: {
    type: String,
    required: true,
    description: 'User role(patient, doctor or receptionist)'
  },
  availability: [{
    day: { type: String, required: true },
    slots: [{ type: String, required: true }] // Array of available time slots for each day
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    description: 'Rating of the doctor (from 0 to 5)'
  },
  reviews: [{
    reviewer: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 }
  }],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: Appointment }]
});

/*
//hash password before saving to the database
doctorSchema.pre('save', async function (next) {
  //hash the password only if it's modified or new
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});*/

module.exports = mongoose.model('Doctor', doctorSchema);
