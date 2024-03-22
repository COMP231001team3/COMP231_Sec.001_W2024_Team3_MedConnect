import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './doctorProfileForUser.css'
import profileImage from './profile.jpg';


{/* Here the patien can see the doctor profile infortion.
Stry#3: As a user, I can see doctor profile, so that I can see his/her information, availability and book an appointment*/}


function DoctorProfileForUser() {
  return (
      <section className='containerDoctorProfileForUser'>
      <div className='doctorprofileTitle'><h3>Doctor profile</h3> </div>
      <div className='doctorprofile'> 
       <img src={profileImage} alt="Profile Image"/>
      <ul>
      <li> <h2>Doctor Name</h2></li>
       <li> Location: </li>
       <li>Clinic:  </li>
       <li>Speciality: </li>
       <li> Experience:  </li>
       <li>Price: </li>
       </ul>
      </div>
      <div className='bookAppointmentTitle'><h3>Book Appointment</h3> </div>
      <div className='bookAppointment'>
       <p> [Provide a map her with text "see on map"]</p>
      </div>
      <div className='clinicAddress'>
      <ul>
      <li> <h3>Clinic Name</h3></li>
       <li> Address:</li>
       <li> Price per sesson: $120  </li>
       <li> Contact 123-123:1234 </li>
       </ul>
       <button> Book </button>
       <ul>
      <li> <h3>Clinic Name</h3></li>
       <li> Address:</li>
       <li> Price per sesson: $120  </li>
       <li> Contact 123-123:1234 </li>
       </ul>
       <button> Book </button>
      </div>
      <div className='reviews'>
      <h3>Reviews</h3>
      <img src={profileImage } alt="picture"/>
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