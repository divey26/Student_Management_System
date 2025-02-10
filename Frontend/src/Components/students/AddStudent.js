/* StudentForm.js */
import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = () => {
  const [student, setStudent] = useState({ indexNo: '', name: '', email: '', grade: '' });
  
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/std', student);
      alert('Student added successfully!');
      setStudent({ indexNo: '', name: '', email: '', grade: '' });
    } catch (error) {
      alert('Error adding student: ' + error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="indexNo" placeholder="Index No" value={student.indexNo} onChange={handleChange} required />
        <input type="text" name="name" placeholder="Name" value={student.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={student.email} onChange={handleChange} required />
        <input type="number" name="grade" placeholder="Grade" value={student.grade} onChange={handleChange} required />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default StudentForm;