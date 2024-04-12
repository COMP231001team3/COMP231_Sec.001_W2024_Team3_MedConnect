/*
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
        <div className="filterButtons">
          <select>
            <option value="">Select Specialization</option>

          </select>
          <button>Sort by Rating (High to Low)</button>
          <button>Sort by Price (Low to High)</button>
        </div>
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
*/

import React, { useState, useEffect } from "react";
import "./listDoctors.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function ListDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const results = queryParams.get("results");
    if (results) {
      try {
        const decodedResults = JSON.parse(decodeURIComponent(results));
        setDoctors(decodedResults);
        setFilteredDoctors(decodedResults);
        fetchSpecializations(decodedResults);
      } catch (error) {
        console.error("Decode error: ", error);
      }
    }
  }, [location.search]);

  const fetchSpecializations = (doctors) => {
    const allSpecializations = doctors.map((doctor) => doctor.specialization);
    const uniqueSpecializations = [...new Set(allSpecializations)];
    setSpecializations(uniqueSpecializations);
  };

  const filterDoctorsBySpecialization = (specialization) => {
    if (specialization === "All") {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter(
        (doctor) => doctor.specialization === specialization
      );
      setFilteredDoctors(filtered);
    }
  };

  const sortDoctorsByRating = () => {
    const sorted = [...filteredDoctors].sort((a, b) => b.rating - a.rating);
    setFilteredDoctors(sorted);
  };

  const sortDoctorsByPrice = () => {
    const sorted = [...filteredDoctors].sort((a, b) => a.price - b.price);
    setFilteredDoctors(sorted);
  };

  return (
    <section className="searchResultSection">
      <div className="searchResultDiv">
        <div className="filterButtons">
          <select onChange={(e) => filterDoctorsBySpecialization(e.target.value)}>
            <option value="All">All Specializations</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
          <button onClick={sortDoctorsByRating}>Sort by Rating (High to Low)</button>
          <button onClick={sortDoctorsByPrice}>Sort by Price (Low to High)</button>
        </div>
        <div className="resultContent">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div key={doctor._id} className="doctorCard">
                <Link
                  to={{
                    pathname: `/doctorProfileForUser/${doctor._id}`,
                    state: { doctorId: doctor._id },
                  }}
                  className="cardLink"
                >
                  <div className="cardContent">
                    <h3>{doctor.name}</h3>
                    <p>
                      Location: {doctor.address} <br />
                      Speciality: {doctor.specialization}
                    </p>
                    <p>Rating: {doctor.rating}/5</p>
                  </div>
                </Link>
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


