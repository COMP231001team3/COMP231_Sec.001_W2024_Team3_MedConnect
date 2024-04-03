import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './patientProfile.css';
import profileImage from './profile.jpg';
import axios from 'axios';

{/*Patient profile with the dashboard
Story#4: As a patient, I can see a patient dashboard after logging in. On this page, I can access calendar, view/edit my profile, download/upload documents and manage appointments */}
function PatientProfile() {
  const [file, setFile] = useState(null);

  // Function to handle file upload
  const handleFileUpload = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Create FormData object to send file
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await axios.post('/api/upload', formData); // Replace '/api/upload' with your actual upload endpoint
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Function to handle file download
  const handleFileDownload = async () => {
    try {
      const response = await axios.get('/api/download'); // Replace '/api/download' with your actual download endpoint
      const blob = new Blob([response.data]); 
    const url = window.URL.createObjectURL(blob); 
      localStorage.setItem('downloadedFile', url);
  // window.open(url, '_blank');
      console.log('File downloaded:', response.data);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };




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
            <img src={profileImage}  alt="Profile image" width="150" height="100" className="d-inline-block align-text-top mb-3" />
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
