import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import './appointmentBooking.css';
import 'react-datepicker/dist/react-datepicker.css';

/*
const generateTimeSlots = (selectedDate) => {
  const slots = [];
  let startTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 9, 0, 0);
  const endTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 17, 0, 0);
  const currentDate = new Date();
  const isToday = selectedDate.toDateString() === currentDate.toDateString();

  while (startTime < endTime) {
    
    if (!isToday || (isToday && startTime >= currentDate)) {
      const start = startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      startTime.setMinutes(startTime.getMinutes() + 30); 
      const end = startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

      slots.push(`${start} - ${end}`);
    } else {
      
      startTime.setMinutes(startTime.getMinutes() + 30);
    }
  }

  return slots;
};
*/

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


const AppointmentBooking = ({ selectedDoctor, patientId }) => {
  //const [startDate, setStartDate] = useState(new Date());
  //const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);

  /*useEffect(() => {
    setTimeSlots(generateTimeSlots(startDate));
  }, [startDate]);*/

  useEffect(() => {
      // Fetch doctor's availability and generate time slots
    const fetchAvailability = async () => {
      try {
        const response = await axios.get(`/doctors/${selectedDoctor._id}`);
        const doctorAvailability = response.data.availability;
        const slots = generateTimeSlots(doctorAvailability);
        setTimeSlots(slots);
      } catch (error) {
        console.error('Error fetching doctor availability:', error);
      }
    };

    fetchAvailability();
  }, [selectedDoctor]);

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
    if (selectedDoctor && selectedTimeSlot) {
      //prepare data for the appointment booking request
      const data = {
        doctorId: selectedDoctor._id,
        date: selectedDate.toISOString(), // Convert date to ISO string format
        time: selectedTimeSlot,
        bookedBy: patientId
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
          //minDate={new Date()} 
          inline
        />
        <select value={selectedTimeSlot} onChange={handleTimeSlotChange} className="timeInput">
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