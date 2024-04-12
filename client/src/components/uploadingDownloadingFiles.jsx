import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./uploadingDownloadingFiles.css";
import folder from "./folder.jpg";
import profileImage from "./profile.jpg"; 
import axios from "axios";
import { useAuth } from "../Contexts/authContext";
import { useParams } from "react-router-dom";

function UploadingDownloadingFiles() {
  const { currentUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [file, setFile] = useState(null);
  const [patientId, setPatientId] = useState(""); // State to store patientId
  const [categories, setCategories] = useState([
    { name: "MEDICINES", label: "MEDICINES" },
    { name: "EXAMS", label: "EXAMS" },
    { name: "RECIPE", label: "RECIPE" },
    { name: "ALLERGIES", label: "ALLERGIES" },
  ]);

  // Function to handle file upload
const handleFileUpload = async (event) => {
  // Log event to check if files are present
  console.log("Event:", event);

  // Check if files are present in the event target
  if (!event.target.files || event.target.files.length === 0) {
    console.error("No files selected");
    return;
  }

  const selectedFile = event.target.files[0];
  setFile(selectedFile);

  // Create FormData object to send file
  const formData = new FormData();
  formData.append("file", selectedFile);
  formData.append("category", selectedCategory); // Add category to FormData
  formData.append("patientId", currentUser._id); // Add patientId to FormData

  try {
    await axios.post("http://localhost:5000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }); 
    console.log("File uploaded successfully");
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

  
  // Function to handle file download
const handleFileDownload = async (filename) => {
  try {
    const response = await axios.get(`http://localhost:5000/download/${currentUser._id}/${filename}`, {
      responseType: "blob", // Set response type to blob
    }); 
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    console.log("File downloaded:", filename);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};


  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <section className="patientProfile">
      <div className="bar">
        <p>MEDCONNECT</p>
      </div>
      <div className="containerProfile">
        <div className="profile">
          <h2>Patient Profile</h2>
          <div className="patientInf">
            <p>Information:</p>
            <img
              src={profileImage}
              alt="Profile image"
              width="150"
              height="100"
              className="d-inline-block align-text-top mb-3"
            />
            <p>Name: {currentUser?.name}</p>
            <p>Email: {currentUser?.email}</p>
            <p>Birthday: {currentUser?.birth}</p>
            <p>Cell: {currentUser?.phone}</p>
            <p>Address: {currentUser?.address}</p>
          </div>
          <div className="files">
          <div className="downloadHeader">
            <h2>DOWNLOAD FILES HERE</h2>
          </div>
          <div className="fileList">
            {currentUser.documents.map((file, index) => (
              <div key={index} className="document">
                <span>{file.filename}</span>
                <button onClick={() => handleFileDownload(file.filename)}>Download</button>
              </div>
            ))}
          </div>
            <div className="uploading">
              <h2>UPLOAD FILES HERE</h2>
              <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.label}
                  </option>
                ))}
              </select>
              <form onSubmit={handleFileUpload}>
                <input type="file" onChange={handleFileUpload} />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UploadingDownloadingFiles;
