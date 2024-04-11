import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./doctorProfileForUser.css";
import profileImage from "./profile.jpg";
import AppointmentBooking from "./appointmentBooking.jsx";
import { useLocation } from 'react-router-dom';

function DoctorProfileForUser() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const location = useLocation();
  const doctorId = location.state ? location.state.doctorId : null;
  

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await fetch(`/doctors/${doctorId}`);
        if (!response.ok) {
          throw new Error('Search Failed');
        }
        const data = await response.json();
        setDoctor(data);
      } catch (error) {
        console.error('Search error:', error);
        
      }
    };
  
    fetchDoctorData();
  }, [doctorId]);

  const handleBookClick = () => {
    setShowCalendar(true);
  };

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <section className="containerDoctorProfileForUser">
      <div className="doctorprofileTitle">
        <h1>Doctor profile</h1>
      </div>
      <div className="doctorprofile">
        <img src={profileImage} alt="Profile Image" />
        <ul>
          <li>
            <h2>{doctor.name}</h2>
          </li>
          <li>Location: {doctor.location}</li>
          <li>Clinic: {doctor.clinic}</li>
          <li>Speciality: {doctor.specialization}</li>
          <li>Experience: {doctor.experience}</li>
          <li>Price: {doctor.price}</li>
        </ul>
      </div>
      <div className="bookAppointmentTitle">
        <h3>Book Appointment</h3>
      </div>
      <div className="bookAppointment">
        <p> [Provide a map here with text "see on map"]</p>
      </div>
      
      <div className="reviews">
        <h3>Reviews</h3>
        <img src={profileImage} alt="picture" />
        <ul>
          <li>Jessica Alba</li>
          <li>July 3/2024</li>
          <li>[text]</li>
        </ul>
      </div>
    </section>
  );
}

export default DoctorProfileForUser;
