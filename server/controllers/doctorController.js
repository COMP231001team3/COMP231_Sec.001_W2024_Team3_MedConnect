//Iuliia Chugunova
//Defines CRUD operations on doctor data

const bcrypt = require('bcryptjs');
const express = require('express');
const mongoose = require('mongoose');
const Doctor = require('../models/doctor.model');
const Patient = require('../models/patient.model.js');

mongoose.Promise = global.Promise

//retrieve all doctors
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
    const query = req.query.query; // or use req.query.name, req.query.specialization, etc., depending on your query parameter
    const doctors = await Doctor.find({
      // Assuming you're searching by name; adjust as needed
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

//retrieve doctor by Id
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

//retrieve doctor by id and update profile information
exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json({ message: 'Doctor updated successfully', doctor });
  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).json({ error: 'An error occurred while updating doctor' });
  }
};

//retrieve doctor by id and delete profile
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
