// Iuliia Chugunova
//routes/patientRoutes.js
//Provides routes to create a user

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/sign-up', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);

module.exports = router;