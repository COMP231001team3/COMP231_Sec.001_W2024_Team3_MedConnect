//Iuliia Chugunova
//controllers/usetController.js
//Defines create operation for users (doctor, patioent, receptionist)

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Patient = require('../models/patient.model.js');
const Doctor = require('../models/doctor.model');

mongoose.Promise = global.Promise

//create new user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, birth, role, phone, address} = req.body;

        console.log('Request body:', req.body); // Log the request body for debugging

        // Check if a patient with the same email already exists
        const existingPatient = await Patient.findOne({ email });
        const existingDoctor = await Doctor.findOne( { email });

        if (existingPatient) {
            return res.status(400).json({ error: 'User with this email already exists' });
        } else if (existingDoctor) {
          return res.status(400).json( {error: 'User with this email already exists' });
        }

        // Hash the password
        console.log('Password:', password); // Log the password for debugging
        const hashedPassword = await bcrypt.hash(password, 10);

         // Create a new user document based on the role
         let newUser;
         if (role === 'patient') {
             newUser = new Patient({ name, email, password: hashedPassword, birth, phone, address });
         } else if (role === 'doctor') {
             newUser = new Doctor({ name, email, password: hashedPassword, birth, phone, address });
         }  else {
             return res.status(400).json({ error: 'Invalid role' });
         }
 
         // Save the user to the appropriate collection
         await newUser.save();

        res.status(201).json({ message: 'Patient registered successfully' });
    } catch (error) {
        console.error('Error registering patient:', error);
        res.status(500).json({ error: 'An error occurred while registering patient' });
    }
};

// User login
exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid password' });
      }
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // User logout (optional)
  exports.logoutUser = (req, res) => {
    // Implement logout logic (e.g., invalidate token)
    res.status(200).json({ message: 'Logout successful' });
  };