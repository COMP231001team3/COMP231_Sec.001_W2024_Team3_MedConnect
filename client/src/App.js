import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/login.jsx'
import SignUp from './components/signup.jsx'
import NavBar from './components/NavBar.jsx'
import Header from './components/header.jsx' 
import Footer from './components/footer.jsx'
import HomePage from './components/homePage.jsx'
import SearchResult from './components/searchResult.jsx'
import PatientProfile from './components/patientProfile.jsx'
import AppointmentBooking from './components/appointmentBooking.jsx';






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
          <Route path="/searchResult" element={<SearchResult />} />
          <Route path="/patientProfile" element={<PatientProfile />} /> 
          <Route path="/bookAppointment" element={<AppointmentBooking />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
