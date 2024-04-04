import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./doctorProfileForUser.css";
import profileImage from "./profile.jpg";
import AppointmentBooking from "./appointmentBooking.jsx";

function DoctorProfileForUser() {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleBookClick = () => {
    setShowCalendar(true);
  };

  return (
    <section className="containerDoctorProfileForUser">
      <div className="doctorprofileTitle">
        <h1>Doctor profile</h1>
      </div>
      <div className="doctorprofile">
        <img src={profileImage} alt="Profile Image" />
        <ul>
          <li>
            <h2>Doctor Name</h2>
          </li>
          <li> Location: </li>
          <li>Clinic: </li>
          <li>Speciality: </li>
          <li> Experience: </li>
          <li>Price: </li>
        </ul>
      </div>
      <div className="bookAppointmentTitle">
        <h3>Book Appointment</h3>
      </div>
      <div className="bookAppointment">
        <p> [Provide a map here with text "see on map"]</p>
      </div>
      <div className="bookApp">
        <div className="clinicAddress">
          <ul>
            <li>
              <h3>Clinic: Get Well</h3>
            </li>
            <li> Address:</li>
            <li> Price per session: $120 </li>
            <li> Contact 123-123:1234 </li>
          </ul>
          <button onClick={handleBookClick}> Book </button>
          <ul>
            <li>
              <h3>Clinic: Get Well</h3>
            </li>
            <li> Address:</li>
            <li> Price per session: $120 </li>
            <li> Contact 123-123:1234 </li>
          </ul>
          <button onClick={handleBookClick}> Book </button>
        </div>
        <div className="calendar">{showCalendar && <AppointmentBooking />}</div>
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
