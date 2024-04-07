//Alejandra Bonito
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import './calendar.css';
import 'react-datepicker/dist/react-datepicker.css';


const CalendarWithAppointments = () => {
    const [startDate, setStartDate] = useState(new Date());

    //to get appointments from database
    /*
    const appointmentsForSelectedDate = appointments.filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        return (
          appointmentDate.getDate() === selectedDate.getDate() &&
          appointmentDate.getMonth() === selectedDate.getMonth() &&
          appointmentDate.getFullYear() === selectedDate.getFullYear()
        );
      });
    */

    return (
        <div className="calendarContainer">
            <div className="datePickerContainer">
                <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                inline
                />
                <h4>Appointments for {startDate.toLocaleDateString()}: </h4>
                <br/>
                //display appointments from database
            </div>
           
        </div>
        
    );
  };

export default CalendarWithAppointments;