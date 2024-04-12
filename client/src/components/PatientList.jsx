// Iuliia
import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useParams, Link } from "react-router-dom";

const AssignedPatientsPage = () => {
  const [assignedPatients, setAssignedPatients] = useState([]);
  const { Id } = useParams();

  useEffect(() => {
    const fetchAssignedPatients = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/doctors/${Id}/patients`);
        setAssignedPatients(response.data);
      } catch (error) {
        console.error('Error fetching assigned patients:', error);
      }
    };

    fetchAssignedPatients();
  }, [Id]);

  // Render the assigned patients (e.g., in a table)

  return (
    <div>
      <h1>Assigned Patients</h1>
      {/* Render the assigned patients here */}
    </div>
  );
};

export default AssignedPatientsPage;

