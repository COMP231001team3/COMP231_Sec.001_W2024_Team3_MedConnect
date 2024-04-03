import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import './appointmentBooking.css';
import 'react-datepicker/dist/react-datepicker.css';

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

const AppointmentBooking = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    setTimeSlots(generateTimeSlots(startDate));
  }, [startDate]);

  const handleDateChange = (date) => {
    setStartDate(date);
    setSelectedTimeSlot(''); 
  };

  const handleTimeSlotChange = (event) => {
    setSelectedTimeSlot(event.target.value);
    console.log("Selected Time Slot:", event.target.value); 
  };

  const handleSubmit = () => {
    alert(`Scheduled to: ${startDate.toDateString()} at ${selectedTimeSlot}`);
    console.log(`Scheduled to: ${startDate.toDateString()} at ${selectedTimeSlot}`);
  };

  return (
    <div className="appointmentBookingContainer">
      <div className="datePickerContainer">
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          minDate={new Date()} 
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