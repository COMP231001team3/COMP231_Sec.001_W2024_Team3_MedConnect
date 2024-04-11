//Alejandra Bonito, Iuliia Chugunova
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import axios from 'axios';
import './appointmentBooking.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from "../Contexts/authContext";

//a function that generates time slots for a doctor
const generateTimeSlots = (doctorAvailability) => {
  const slots = [];

  // Iterate through each day of the week
  doctorAvailability.forEach(day => {
    // Extract the day and slots for the current day
    const { day: currentDay, slots: daySlots } = day;

    // Iterate through the slots for the current day
    daySlots.forEach(slot => {
      // Parse the slot time and extract hour and minute components
      const [hourStr, minuteStr, period] = slot.split(/:|\s/);
      let hour = parseInt(hourStr);
      const minute = parseInt(minuteStr);
      
      // Adjust hour for PM slots
      if (period.toLowerCase() === 'pm' && hour !== 12) {
        hour += 12;
      }
      
      // Create start time for the current slot
      const startTime = new Date();
      startTime.setHours(hour);
      startTime.setMinutes(minute);
      
      // Create end time by adding 1 hour to start time
      const endTime = new Date(startTime.getTime());
      endTime.setHours(endTime.getHours() + 1);

      // Format the start and end times as strings
      const startTimeString = startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      const endTimeString = endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      
      // Add the time slot to the slots array
      slots.push(`${startTimeString} - ${endTimeString}`);
    });
  });

  return slots;
};

const filterTimeSlotsByDate = (doctors, selectedDate) => {
  const dayOfWeek = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });

  let timeSlots = [];

  doctors.forEach(doctor => {
    const availableSlots = doctor.availability.find(day => day.day === dayOfWeek)?.slots || [];
    availableSlots.forEach(slot => {
      timeSlots.push(`${doctor.name} - ${slot}`);
    });
  });

  // Normalize time format (remove leading zeros)
  timeSlots = timeSlots.map(slot => slot.replace(/^0/, ''));

  // Remove duplicates
  return [...new Set(timeSlots)].sort();
};

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const { currentUser } = useAuth();
  const { Id } = useParams();

useEffect(() => {
  const fetchAvailability = async () => {
    try {
      if (!Id) return; // If no doctor is selected, return
      
      // Fetch the selected doctor's availability
      const response = await axios.get(`http://localhost:5000/doctors/${Id}`);
      const doctorAvailability = response.data.availability;

      // Find availability for the selected date
      const selectedDateAvailability = doctorAvailability.find(day => {
        const dayOfWeek = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' });
        return day.day === dayOfWeek;
      });

      if (!selectedDateAvailability) {
        // If doctor is not available on the selected date, set time slots to empty array
        setTimeSlots([]);
        return;
      }

      // Generate time slots based on the selected doctor's availability for the selected date
      const slots = generateTimeSlots([selectedDateAvailability]);
      setTimeSlots(slots);
    } catch (error) {
      console.error('Error fetching doctor availability:', error);
    }
  };

  fetchAvailability();
}, [selectedDate, Id]);


  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot('');
  };

  const handleTimeSlotChange = (event) => {
    setSelectedTimeSlot(event.target.value);
  };


  const handleSubmit = () => {
    alert(`Scheduled to: ${selectedDate.toDateString()} at ${selectedTimeSlot}`);
    console.log(`Scheduled to: ${selectedDate.toDateString()} at ${selectedTimeSlot}`);
    if (Id && selectedTimeSlot) {
      //prepare data for the appointment booking request
      const data = {
        doctorId: Id,
        date: selectedDate.toISOString(), // Convert date to ISO string format
        time: selectedTimeSlot,
        bookedBy: currentUser._id
      };
  
      // Make the appointment booking request
      axios.post('appointments/book', data)
        .then(response => {
          // Handle successful appointment booking
          console.log('Appointment booked successfully:', response.data);
        })
        .catch(error => {
          // Handle appointment booking error
          console.error('Error booking appointment:', error);
        });
    }
  };

  return (
    <div className="appointmentBookingContainer">
      <div className="datePickerContainer">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          inline
        />
        <select value={selectedTimeSlot} onChange={handleTimeSlotChange} className="timeInput" title='Select Time Slot'>
        <option value="">Select Time Slot</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>{slot}</option>
            ))}
          </select>
      </div>
      <button onClick={handleSubmit} className="bookButton" disabled={!selectedDate || !selectedTimeSlot}>
          Book Appointment Here
        </button>
    </div>
  );
};

export default AppointmentBooking;