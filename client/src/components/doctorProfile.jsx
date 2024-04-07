import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./patientProfile.css";
import profileImage from "./profile.jpg";
import axios from "axios";
import { useAuth } from "../Contexts/authContext";

function DoctorProfile() {
  /*const { currentUser } = useAuth();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        // Fetch patient data from the backend API using the currentUser's email
        const response = await axios.get(`http://localhost:5000/doctors/email/${currentUser.email}`);
        setDoctor(response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };
  
    if (currentUser) {
      fetchDoctortData();
    }
  }, [currentUser]);  

  if (!doctor) {
    return <div>Loading...</div>;
  }
*/
  return (
    <section className="patientProfile">
      <div className="bar">
        <p>MEDCONNECT</p>
        
      </div>
      <div className="containerProfile">
        <div className="profile">
          <h2>Doctor Profile</h2>
          <div className="patientInf">
            <p>Informations:</p>
            <img
              src={profileImage}
              alt="Profile image"
              width="150"
              height="100"
              className="d-inline-block align-text-top mb-3"
            />
            <p>Name:</p>
            <p>Email:</p>
          </div>
          <div className="options">
            <button className="btn">View and Edit Profile</button>
            <button className="btn">Calendar</button>
            <button className="btn">Appointments History</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DoctorProfile;
