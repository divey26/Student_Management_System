/* MarksForm.js */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MarksForm = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [marks, setMarks] = useState({ math: '', science: '', english: '', history: '', geography: '', ict: '', art: '', p_e: '', health: '' });

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

  const handleMarksChange = (e) => {
    setMarks({ ...marks, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudent) {
      alert('Please select a student');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/marks', { studentId: selectedStudent, subjects: marks });
      alert('Marks added successfully!');
      setMarks({ math: '', science: '', english: '', history: '', geography: '', ict: '', art: '', p_e: '', health: '' });
    } catch (error) {
      alert('Error adding marks: ' + error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Enter Marks</h2>
      <form onSubmit={handleSubmit}>
        <select onChange={(e) => setSelectedStudent(e.target.value)} required>
          <option value="">Select Student</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>{student.name} ({student.indexNo})</option>
          ))}
        </select>
        {Object.keys(marks).map((subject) => (
          <input key={subject} type="number" name={subject} placeholder={subject.toUpperCase()} value={marks[subject]} onChange={handleMarksChange} required />
        ))}
        <button type="submit">Submit Marks</button>
      </form>
    </div>
  );
};

export default MarksForm;