
/* ViewAllStudents.js */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewAllStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/std');
        setStudents(res.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div>
      <h2>All Students</h2>
      <ul>
        {students.map(student => (
          <li key={student._id}>
            {student.name} - {student.indexNo} - Grade {student.grade} <Link to={`/students/${student._id}`}>View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewAllStudents;