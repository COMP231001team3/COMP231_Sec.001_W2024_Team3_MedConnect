import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/login.jsx'
import SignUp from './components/signup.jsx'
import NavBar from './components/NavBar.jsx'
import Header from './components/header.jsx' 
import Footer from './components/footer.jsx'
import HomePage from './components/homePage.jsx'
import ListDoctors from './components/listDoctors.jsx'
import PatientProfile from './components/patientProfile.jsx'
import AppointmentBooking from './components/appointmentBooking.jsx';
import DoctorProfileForUser from './components/doctorProfileForUser.jsx';
import ReceptionistProfile from './components/receptionistProfile.jsx';
import DoctorProfile from './components/doctorProfile.jsx';


function App() {
  return (  
    <div className="App">
     <Router>
        <NavBar/>  
        <Header/>  
        <Routes>
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/"        element={<HomePage/>} />  
          <Route path="/ListDoctors" element={<ListDoctors />} />
          <Route path="/patientProfile" element={<PatientProfile />} />  
          <Route path="/bookAppointment" element={<AppointmentBooking />} />
          <Route path="/doctorProfileForUser" element={<DoctorProfileForUser />} /> 
          <Route path="/receptionistProfile" element={<ReceptionistProfile />} />
          <Route path="/doctorProfile" element={<DoctorProfile />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;

