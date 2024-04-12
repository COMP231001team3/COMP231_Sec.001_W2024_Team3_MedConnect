import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./patientProfile.css";
import profileImage from "./profile.jpg";
import axios from "axios";
import { useAuth } from "../Contexts/authContext";
import { useNavigate } from "react-router-dom";

function DoctorProfile() {
  const { currentUser } = useAuth();
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        // Fetch patient data from the backend API using the currentUser's email
        const response = await axios.get(`http://localhost:5000/doctors/email/${currentUser.email}`);
        setDoctor(response.data);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };
  
    if (currentUser) {
      fetchDoctorData();
    }
  }, [currentUser]);  

  if (!doctor) {
    return <div>Loading...</div>;
  }

  const handleCalendar = () => {
    // Navigate to the calendar page
    navigate(`/calendar/${currentUser._id}`);
  };

  const handleAppointmentsHistory = () => {
    navigate(`/${currentUser._id}/patients`); // Redirect to the list of patients
  };

  return (
    <section className="patientProfile">
      <div className="bar">
        <p>MEDCONNECT</p>
        
      </div>
      <div className="containerProfile">
        <div className="profile">
          <h2>Doctor Profile</h2>
          <div className="patientInf">
            <p>Information:</p>
            <img
              src={profileImage}
              alt="Profile image"
              width="150"
              height="100"
              className="d-inline-block align-text-top mb-3"
            />
            <p>Name: {doctor.name}</p>
            <p>Email: {doctor.email}</p>
            <p>Birthday: {doctor.birth}</p>
            <p>Cell: {doctor.phone}</p>
            <p>Address: {doctor.address}</p>
          </div>
          <div className="options">
            <button className="btn">View and Edit Profile</button>
            <button className="btn" onClick={handleCalendar}>Calendar</button>
            <button className="btn" onClick={handleAppointmentsHistory}>Appointments History</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DoctorProfile;
