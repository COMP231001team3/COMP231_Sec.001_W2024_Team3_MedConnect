/*
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import './calendar.css';
import 'react-datepicker/dist/react-datepicker.css';


const CalendarWithAppointments = () => {
    const [startDate, setStartDate] = useState(new Date());

    

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
                
            </div>
           
        </div>
        
    );
  };

export default CalendarWithAppointments;
*/

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import './calendar.css';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarWithAppointments = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        
        const selectedDate = startDate.toISOString().split('T')[0];

        //Replace for API URL
        const apiUrl = `/api/appointments/${selectedDate}`;

        // Search appointments in the backend
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                // Filter it by status
                const filteredAppointments = data.filter(appointment => appointment.status === 'scheduled' || appointment.status === 'cancelled');
                setAppointments(filteredAppointments);
            })
            .catch((error) => {
                console.error('Error fetching appointments:', error);
            });
    }, [startDate]); //update when date changes

    return (
        <div className="calendarContainer">
            <div className="datePickerContainer">
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    inline
                />
                <h4>Appointments for {startDate.toLocaleDateString()}:</h4>
                <ul>
                    {appointments.map((appointment, index) => (
                        <li key={index}>
                            {appointment.time} - {appointment.status}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CalendarWithAppointments;
