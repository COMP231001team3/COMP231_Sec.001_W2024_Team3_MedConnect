import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./uploadingDownloadingFiles.css";
import profileImage from "./profile.jpg";
import folder from "./folder.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/authContext";

function UploadingDownloadingFiles() {
  const { currentUser } = useAuth();
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        // Fetch patient data from the backend API using the currentUser's email
        const response = await axios.get(
          `http://localhost:5000/patients/email/${currentUser.email}`
        );
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    if (currentUser) {
      fetchPatientData();
    }
  }, [currentUser]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const categories = [
    { name: "MEDICINES", label: "MEDICINES" },
    { name: "EXAMS", label: "EXAMS" },
    { name: "RECIPE", label: "RECIPE" },
    { name: "ALLERGIES", label: "ALLERGIES" },
  ];

  return (
    <section className="patientProfile">
      <div className="bar">
        <p>MEDCONNECT</p>
        <button className="btn btn-secondary">Configuration</button>
      </div>
      <div className="containerProfile">
        <div className="profile">
          <h2>Patient Profile</h2>
          <div className="patientInf">
            <p>Informations:</p>
            <img
              src={profileImage}
              alt="Profile image"
              width="150"
              height="100"
              className="d-inline-block align-text-top mb-3"
            />
            <p>Name: {patient.name}</p>
            <p>Email: {patient.email}</p>
            <p>Birthday: {patient.birth}</p>
            <p>Cell: {patient.phone}</p>
            <p>Address: {patient.address}</p>
          </div>
          <div className="files">
            <div className="DowloadHeader">
              <h2>DOWNLOAD FILES HERE</h2>
              <button>DOWNLOAD</button>
            </div>
            <div className="folderContainer">
              {categories.map((category) => (
                <div
                  key={category.name}
                  onClick={() => handleCategoryChange(category.name)}
                  className="folder"
                >
                  <img
                    src={folder}
                    alt={category.name}
                    width="80px"
                    height="80"
                  />
                  <p>{category.label}</p>
                </div>
              ))}
            </div>
            <div className="uploading">
              <h2>UPLOAD FILES HERE</h2>
              <button>UPLOAD</button>
            </div>
            <div className="dragDropArea">
              <p>Drag and drop files here</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UploadingDownloadingFiles;
