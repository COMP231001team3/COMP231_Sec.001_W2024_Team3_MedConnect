//Iuliia Chugunova
//Defines CRUD operations on appointment data

const Appointment = require('../models/appointment.model');
const Doctor = require('../models/doctor.model');
const Patient = require('../models/patient.model');

// get doctor availibility to use for creating appointment
async function getDoctorAvailability(doctorId) {
    try {
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) {
        throw new Error('Doctor not found');
      }
      const doctorAvailability = doctor.availability;
  
      return doctorAvailability;
    } catch (error) {
      console.error('Error fetching doctor availability:', error);
      throw error;
    }
  }

// Create a new appointment dynamically based on doctor availability
exports.bookAppointment = async (req, res) => {
    try {
      const { doctorId, date, time, patientId } = req.body;
  
      // Check doctor's availability
      // For simplicity, let's assume availability is an array of time slots
      const doctorAvailability = getDoctorAvailability(doctorId);
  
      // Find an available slot
      const availableSlot = doctorAvailability.find(slot => slot === time);
      if (!availableSlot) {
        return res.status(400).json({ message: 'Selected time slot is not available' });
      }
  
      // Create a new appointment
      const newAppointment = new Appointment({
        doctorId,
        date,
        time,
        bookedBy: patientId,
        status: 'scheduled', // Set the initial status
        isAvailable: false, // Mark the slot as booked
      });
  
      // Save the appointment to the database
      await newAppointment.save();
  
      res.status(201).json({ message: 'Appointment booked successfully!', appointment: newAppointment });
    } catch (error) {
      console.error('Error booking appointment:', error);
      res.status(500).json({ error: 'An error occurred while booking the appointment.' });
    }
  };
  

// Get all appointments
// exports.getAppointments = async (req, res) => {
//     try {
//         const appointments = await Appointment.find();
//         res.status(200).json({ success: true, data: appointments });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// Get appointments by date
exports.getAppointments = async (req, res) => {
    const { date } = req.query; // Extract date from query parameters

    try {
        let query;

        if (date) {
            // Assuming date is in YYYY-MM-DD format and your date field in the database is a Date type
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);

            query = Appointment.find({
                date: {
                    $gte: startOfDay,
                    $lte: endOfDay,
                },
            });
        } else {
            query = Appointment.find(); // If no date is provided, fetch all appointments
        }

        const appointments = await query;
        res.status(200).json({ success: true, data: appointments });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// GEt available slots
exports.getAvailableSlots = async (req, res) => {
  try {
    const selectedDate = new Date(req.query.date); // Extract selected date from query params
    
    // Fetch available time slots for the selected date
    const availableSlots = await Appointment.find({
        date: selectedDate,
        isAvailable: true
    });

    // Flatten the slots from the availability array and filter unique times
    let allSlots = [];
    availableSlots.forEach(appointment => {
      appointment.availability.forEach(slot => {
        allSlots.push(slot.slots[0], slot.slots[1]); // Assuming each day has two slots
      });
    });

    // Convert the slots to the desired format
    const formattedSlots = allSlots.map(slot => {
      const [hour, minutePart] = slot.split(':');
      const [minute, period] = minutePart.split(' ');

      return `${hour}:${minute} ${period.toUpperCase()}`;
    });

    // Filter unique times and send the response
    const uniqueSlots = [...new Set(formattedSlots)];
    res.status(200).json({ times: uniqueSlots });

  } catch (error) {
    console.error('Error fetching available slots:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Get appointment by ID
exports.getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ success: false, error: 'Appointment not found' });
        }
        res.status(200).json({ success: true, data: appointment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update appointment by ID
exports.updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!appointment) {
            return res.status(404).json({ success: false, error: 'Appointment not found' });
        }
        res.status(200).json({ success: true, data: appointment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete appointment by ID
exports.deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).json({ success: false, error: 'Appointment not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
