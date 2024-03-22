//Iuliia Chugunova
//controllers/patientController.js
//Defines CRUD operations

const bcrypt = require('bcryptjs');
const express = require('express');
const mongoose = require('mongoose');
const Patient = require('../models/patient.model.js');

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
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
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

//create new patient
exports.registerPatient = async (req, res) => {
    try {
        const { name, email, password, role, phone, address, documents, medicalHistory } = req.body;

        console.log('Request body:', req.body); // Log the request body for debugging

        // Check if a patient with the same email already exists
        const existingPatient = await Patient.findOne({ email });
        if (existingPatient) {
            return res.status(400).json({ error: 'Patient with this email already exists' });
        }

        // Hash the password
        console.log('Password:', password); // Log the password for debugging
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new patient document
        const newPatient = new Patient({
          name,
          email,
          password: hashedPassword,
          role,
          phone,
          address,
          documents,
          medicalHistory
        });

        // Save the patient to the database
        await newPatient.save();

        res.status(201).json({ message: 'Patient registered successfully' });
    } catch (error) {
        console.error('Error registering patient:', error);
        res.status(500).json({ error: 'An error occurred while registering patient' });
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
