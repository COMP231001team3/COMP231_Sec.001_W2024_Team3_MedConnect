import React from 'react';
import PatientListItem from './PatientListItem';

const PatientList = ({ patients, onPatientClick }) => {
  return (
    <div>
      <h2>List of Patients</h2>
      {patients.map(patient => (
        <PatientListItem
          key={patient.id}
          patient={patient}
          onClick={onPatientClick}
        />
      ))}
    </div>
  );
};

export default PatientList;
