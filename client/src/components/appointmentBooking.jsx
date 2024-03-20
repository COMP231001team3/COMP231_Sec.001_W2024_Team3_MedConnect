import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import './appointmentBooking.css';
import 'react-datepicker/dist/react-datepicker.css';

const generateTimeSlots = () => {
  const slots = [];
  let startTime = new Date(0, 0, 0, 9, 0); // Starts at 09:00
  const endTime = new Date(0, 0, 0, 17, 0); // Ends at 17:00

  while (startTime < endTime) {
    let start = startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    startTime.setMinutes(startTime.getMinutes() + 30);
    let end = startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    slots.push(`${start} - ${end}`);
  }

  return slots;
};

const AppointmentBooking = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const handleTimeSlotChange = (event) => {
    setSelectedTimeSlot(event.target.value);
    console.log("Selected Time Slot:", event.target.value); 
  };

  const handleSubmit = () => {
    console.log(`Scheduled to: ${startDate.toDateString()} at ${selectedTimeSlot}`);
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="appointmentBookingContainer">
    <div className="datePickerContainer">
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        inline
      />
      <select value={selectedTimeSlot} onChange={handleTimeSlotChange} className="timeInput">
          {timeSlots.map((slot, index) => (
            <option key={index} value={slot}>{slot}</option>
          ))}
        </select>
    </div>
    <button onClick={handleSubmit} className="bookButton" disabled={!startDate || !selectedTimeSlot}>
        Book Appointment Here
      </button>
  </div>
  );
};

export default AppointmentBooking;