import React, { useState, useEffect } from "react";
import "./listDoctors.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function ListDoctors() {
  const [doctors, setDoctors] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const results = queryParams.get("results");
    if (results) {
      try {
        const decodedResults = JSON.parse(decodeURIComponent(results));
        setDoctors(decodedResults);
      } catch (error) {
        console.error("Decode error: ", error);
      }
    }
  }, [location.search]);

  return (
    <section className="searchResultSection">
      <div className="searchResultDiv">
        <div className="resultContent">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <div key={doctor._id} className="resultItem">
                <Link
                  to={{
                    pathname: `/doctorProfileForUser/${doctor._id}`,
                    state: { doctorId: doctor._id },
                  }}
                >
                  <h3>{doctor.name}</h3>
                </Link>
                <div className="resultInf">
                  <p>
                    {" "}
                    Location: {doctor.address} <br />
                    Speciality: {doctor.specialization}
                  </p>
                  <p>Rating: {doctor.rating}/5</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No results found.</div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ListDoctors;

/*
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './listDoctors.css';
import profileImage from './profile.jpg';
import { Link } from 'react-router-dom';


{/* Page Result with the doctor list
Story#2: As a user, I can see list of doctors, I can sort and filter to search a doctor, select a doctor and see their profile}
 

function ListDoctors() {
  return (
    <section className='searchResultSection'> 
      <div className='searchResultDiv'>
        <div className='Filter'>
        <h3>Filter</h3>
        <button className="filtro-btn">Condition 1</button>
        <button className="filtro-btn">Condition 2</button>
        <button className="filtro-btn">Condition 3</button>
        <button className="filtro-btn">Condition 4</button>
        <button className="filtro-btn">Condition 5</button>
        </div>
        <div className='resultContent'>
          <div className="resultItem">
          <Link to="/doctorProfileForUser">
              <img src={profileImage} alt="Imagem de perfil" />
            </Link>
            
              <div>
                <h3>Pedro Henrique</h3>
                <p> Location: Calgary <br/>Clinic: Get Well, MyDoc <br/>Speciality: Dermatologist</p>
                <p>Rating: 4.5/5</p>
              </div>
            </div>
            <div className="resultItem">
            <Link to="/doctorProfileForUser">
              <img src={profileImage} alt="Imagem de perfil" />
            </Link>
            <div>
              <h3>John Doe</h3>
              <p> Location: Calgary <br/>Clinic: Get Well, MyDoc <br/>Speciality: Dermatologist</p>
              <p>Rating: 4.5/5</p>
            </div>
            </div>
            <div className="resultItem">
            <Link to="/doctorProfileForUser">
              <img src={profileImage} alt="Imagem de perfil" />
            </Link>
            <div>
              <h3>Bruna Silva</h3>
              <p> Location: Calgary <br/>Clinic: Get Well, MyDoc <br/>Speciality: Dermatologist</p>
              <p>Rating: 4.5/5</p>
            </div>
          </div>
        </div>
        </div>
    </section>
  );
  }


  export default ListDoctors ;
*/
