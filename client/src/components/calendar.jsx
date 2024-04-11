import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import './calendar.css';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarWithAppointments = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);

    const fetchAppointmentsForDate = async (date) => {
        const formattedDate = date.toISOString().split('T')[0];
    
        try {
            const response = await fetch(`http://localhost:5000/appointments?date=${formattedDate}`);
            if (!response.ok) throw new Error('Failed to fetch');
    
            const data = await response.json();
            setAppointments(data.data); 
            
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    useEffect(() => {
        fetchAppointmentsForDate(startDate);
    }, [startDate]);

    return (
        <div className="calendarContainer">
            <div className="datePickerContainer">
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    inline
                    style={{ zIndex: 9999 }} // Ensure date picker renders above other elements
                />
                <br/>
                <div>
                    <h4>Appointments for {startDate.toLocaleDateString()}:</h4>
                    {appointments.map((appointment, index) => (
                        <div key={index} style={{ 
                            padding: '10px', 
                            margin: '5px', 
                            borderLeft: `5px solid ${appointment.reason === 'Regular checkup' ? 'green' : appointment.reason === 'Follow-up' ? 'blue' : 'red'}` 
                        }}>
                            <p>Time: {appointment.time}, Reason: {appointment.reason}, Status: {appointment.status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CalendarWithAppointments;
