import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./uploadingDownloadingFiles.css";
import profileImage from "./profile.jpg";
import folder from "./folder.jpg";

function UploadingDownloadingFiles() {
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
            <p>Name:</p>
            <p>Email:</p>
            <p>Birthday</p>
            <p>Cell:</p>
            <p>Address:</p>
          </div>
          <div className="uploading">
            <div className="uploadHeader">
              <h2>UPLOAD FILES HERE</h2>
              <button>UPLOAD</button>
            </div>
            <div className="folderContainer">
              <div>
                <img src={folder} alt="MEDICINES" width="80px" height="80" />
                <p>MEDICINES</p>
              </div>
              <div>
                <img src={folder} alt="EXAMS" width="80px" height="80" />
                <p>EXAMS</p>
              </div>
              <div>
                <img src={folder} alt="RECIPE" width="80px" height="80" />
                <p>RECIPE</p>
              </div>
              <div>
                <img src={folder} alt="ALLERGIES" width="80px" height="80" />
                <p>ALLERGIES</p>
              </div>
            </div>
            <div className="downloading">
              <h2>DOWNLOAD FILES HERE</h2>
              <button>DOWNLOAN</button>
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
