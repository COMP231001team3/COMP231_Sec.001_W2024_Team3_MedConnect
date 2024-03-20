//Jayson Tuazon
//controllers/doctorController.js
//Defines GET operations of Doctor Profile and Schedule

const { Doctor } = require('../models/doctor.model');

// Controller function to get doctor profile
exports.getDoctorProfile = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        console.error('Error retrieving doctor profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to get doctor schedule
exports.getDoctorSchedule = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        const schedule = doctor.availability;
        res.status(200).json(schedule);
    } catch (error) {
        console.error('Error retrieving doctor schedule:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
