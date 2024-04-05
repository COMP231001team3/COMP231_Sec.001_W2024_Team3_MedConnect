//Iuliia Chugunova
//controllers/patientController.js
//Defines CRUD operations

const bcrypt = require('bcryptjs');
const express = require('express');
const mongoose = require('mongoose');
const Patient = require('../models/patient.model.js');
const Doctor = require('../models/doctor.model.js')

mongoose.Promise = global.Promise

// Retrieve all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve a specific patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a patient by ID
exports.updatePatientById = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;

    // Check if the password is included in the update
    if (password) {
      // Hash the password before updating
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(updatedPatient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete a patient by ID
exports.deletePatientById = async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
