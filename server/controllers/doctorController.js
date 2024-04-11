//Iuliia Chugunova, Pedro Henrique
//Defines CRUD operations on doctor data

const bcrypt = require('bcryptjs');
const express = require('express');
const mongoose = require('mongoose');
const Doctor = require('../models/doctor.model');
const Patient = require('../models/patient.model.js');
const Appointment = require('../models/appointment.model.js');

mongoose.Promise = global.Promise

//retrieve all doctors (Iuliia)
exports.getAllDoctors = async (req, res) => {
  try { 
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'An error occurred while fetching doctors' });
  }
};

//get doctor by name
exports.getDoctorByName = async (req, res) => {
  try {
    // Use regex for case-insensitive matching
    const doctor = await Doctor.findOne({ name: new RegExp(req.params.name, 'i') });
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.error('Error fetching doctor by name:', error);
    res.status(500).json({ error: 'An error occurred while fetching doctor by name' });
  }
};

exports.searchDoctors = async (req, res) => {
  try {
    const query = req.query.query; 
    const doctors = await Doctor.find({
      
      name: { $regex: query, $options: 'i' }, // Case-insensitive regex search
    });
    res.json(doctors);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'An error occurred during the search' });
  }
};

//get doctor by specialization
exports.getDoctorBySpecialization = async (req, res) => {
  try {
    // Use regex for case-insensitive matching
    const doctor = await Doctor.find({ specialization: new RegExp(req.params.specialization, 'i') });
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.error('Error fetching doctor by name:', error);
    res.status(500).json({ error: 'An error occurred while fetching doctor by specialization' });
  }
};

//retrieve doctor by Id (Iuliia)
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.error('Error fetching doctor by ID:', error);
    res.status(500).json({ error: 'An error occurred while fetching doctor' });
  }
};

//retrieve doctor by id and update profile information (Iuliia)
exports.updateDoctor = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;

    // Check if the password is included in the update
    if (password) {
      // Hash the password before updating
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get doctor by email (Iuliia)
exports.getDoctorByEmail = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ email: req.params.email });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.error('Error fetching doctor by email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//retrieve doctor by id and delete profile (Iuliia)
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json({ message: 'Doctor deleted successfully', doctor });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({ error: 'An error occurred while deleting doctor' });
  }
};

//get assigned patients
exports.getAssignedPatients = async(req,res) => {
  try {
    const doctorId = req.params.doctorId; // Get the doctorId from the request parameters

    // Query the Appointment collection to find appointments assigned to the doctor
    const appointments = await Appointment.find({ doctorId });

    // Extract patientIds from the appointments
    const patientIds = appointments.map(appointment => appointment.patientId);

    // Query the Patient collection to retrieve detailed information about assigned patients
    const assignedPatientsInfo = await Patient.find({ _id: { $in: patientIds } }, { password: 0 }); // Exclude the password field

    // Return the retrieved information as a response
    return res.status(200).json(assignedPatientsInfo);
} catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
}
};
