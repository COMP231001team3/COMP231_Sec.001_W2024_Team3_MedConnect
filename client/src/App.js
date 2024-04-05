import React from 'react'
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { AuthProvider, useAuth} from './Contexts/authContext'
import { createContext, useEffect, useState, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import Login from './components/login.jsx'
import SignUp from './components/signup.jsx'
import NavBar from './components/NavBar.jsx'
import Header from './components/header.jsx' 
import Footer from './components/footer.jsx'
import HomePage from './components/homePage.jsx'
import ListDoctors from './components/listDoctors.jsx'
import PatientProfile from './components/patientProfile.jsx'
import DoctorProfile from './components/doctorProfile.jsx';
import ReceptionistProfile from './components/receptionistProfile.jsx';
import AppointmentBooking from './components/appointmentBooking.jsx';
import DoctorProfileForUser from './components/doctorProfileForUser.jsx';
import Logout from './components/logout.jsx';
import CalendarWithAppointments from './components/calendar.jsx'
//import ReceptionistProfile from './components/receptionistProfile.jsx';
//import DoctorProfile from './components/doctorProfile.jsx';


/* a PrivateRoute component
function PrivateRoute({ element, ...rest }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
      // Redirect to login if user is not authenticated
      return <Navigate to="/sign-in" />;
  }

  return <Route {...rest} element={element} />;
}
*/
function App() {
  return (  
    <AuthProvider>
    <div className="App">
     <Router>
        <NavBar/>  
        <Header/>  
        <Routes>
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/"        element={<HomePage />} />  
          <Route path="/ListDoctors" element={<ListDoctors />} />
          <Route path="/patientProfile" element={<PatientProfile />} /> 
          <Route path="/bookAppointment" element={<AppointmentBooking />} />
          <Route path="/doctorProfileForUser" element={<DoctorProfileForUser />} /> 
          <Route path="/receptionistProfile" element={<ReceptionistProfile />} />
          <Route path="/doctorProfile" element={<DoctorProfile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/calendar" element={<CalendarWithAppointments />} />
          
        </Routes>
        <Footer/>
      </Router>
  
    </div>
  </AuthProvider>
  );
}

export default App;

