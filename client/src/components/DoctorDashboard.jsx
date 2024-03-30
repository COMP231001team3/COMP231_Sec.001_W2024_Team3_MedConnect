import React, { useState } from 'react';
 const handlePatientClick = (patientId) => {
    //route
    console.log(`Redirecting to patient detail view for patient with ID ${patientId}`);
  };

  return (
    <div>
      <h1>Doctor Dashboard</h1>
      <PatientList patients={patients} onPatientClick={handlePatientClick} />
    </div>
  );
};

export default DoctorDashboard;

