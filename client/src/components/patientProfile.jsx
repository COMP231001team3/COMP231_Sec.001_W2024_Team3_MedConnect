import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './patientProfile.css';
import profileImage from './profile.jpg';

{/*Patient profile with the dashboard
Story#4: As a patient, I can see a patient dashboard after logging in. On this page, I can access calendar, view/edit my profile, download/upload documents and manage appointments */}



function PatientProfile() {
  return (
    <section className='patientProfile'>
      <div className='bar'>
        <p>SYSTEAM LOGO</p>
        <button className="btn btn-secondary">Configuration</button>
      </div>
      <div className='containerProfile'>
        <div className='profile'>
          <h2>Patient Profile</h2>
          <div className='patientInf'>
            <p>Informations:</p>
            <img src={profileImage}  alt="picture" width="150" height="100" className="d-inline-block align-text-top mb-3" />
            <p>Name:</p>
            <p>Email:</p>
            <p>Birthday</p>
            <p>Cell:</p>
            <p>Address:</p>
          </div>
          <div className='options'>
            <button className="btn">View and Edit Profile</button>
            <button className="btn">Calendar</button>
            <button className="btn">My Files</button>
            <button className="btn">Appointments History</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PatientProfile;