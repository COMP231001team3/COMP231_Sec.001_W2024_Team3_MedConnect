import React, { useState } from 'react';
import { AuthProvider } from './Contexts/authContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import Login from './components/login.jsx'
import SignUp from './components/signup.jsx'
import HomePage from './components/homePage.jsx';
import ListDoctors from './components/listDoctors.jsx';
import PatientProfile from './components/patientProfile.jsx';
import DoctorProfile from './components/doctorProfile.jsx';
import ReceptionistProfile from './components/receptionistProfile.jsx';
import AppointmentBooking from './components/appointmentBooking.jsx';
import DoctorProfileForUser from './components/doctorProfileForUser.jsx';
import Logout from './components/logout.jsx';
import CalendarWithAppointments from './components/calendar.jsx';
import UploadingDownloadingFiles from './components/uploadingDownloadingFiles.jsx';
import PatientList from './components/PatientList.jsx';
import PatientListItem from './components/PatientListItem.jsx';

function App() {
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('')
  const handleLogin = (email, token) => {
    setToken(token);
    setEmail(email);
  };

  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <NavBar/>
          <Header />
          <Routes>
            <Route path="/sign-in" element={<Login handleLogin={handleLogin}/>} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/ListDoctors" element={<ListDoctors />} />
            <Route path="/patientProfile" element={<PatientProfile />} />
            <Route path="/bookAppointment/:Id" element={<AppointmentBooking />} />
            <Route path="/doctorProfileForUser/:Id" element={<DoctorProfileForUser />} />
            <Route path="/receptionistProfile" element={<ReceptionistProfile />} />
            <Route path="/doctorProfile" element={<DoctorProfile />} />
            <Route path="/MyFiles/:patientId" element={<UploadingDownloadingFiles />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/calendar/:Id" element={<CalendarWithAppointments />} />
            <Route path='/:Id/patients' element={<PatientList/>} />
            <Route path='/:Id/patients/patient' element={<PatientListItem />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;