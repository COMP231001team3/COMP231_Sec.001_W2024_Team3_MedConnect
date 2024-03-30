import React from 'react';

const PatientListItem = ({ patient, onClick }) => {
  return (
    <div onClick={() => onClick(patient.id)}>
      <h3>{patient.name}</h3>
      <p>{patient.age} years old</p>
     <p>Email: {patient.email}</p>
      <p>Phone: {patient.phone}</p>
    </div>
  );
};

export default PatientListItem;
