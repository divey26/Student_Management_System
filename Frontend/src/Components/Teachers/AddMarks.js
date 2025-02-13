import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography, Card, List, message } from 'antd';
import MarksModal from './MarksFormModel';  // Import the modal component

const { Title, Text } = Typography;

const MarksForm = () => {
  const { id } = useParams();  // Get student ID from URL
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedStudentName, setSelectedStudentName] = useState('');
  const [term, setTerm] = useState('');
  const [marks, setMarks] = useState({ 
    math: '', science: '', english: '', history: '', 
    geography: '', ict: '', art: '', p_e: '', health: '' 
  });
  const [studentMarks, setStudentMarks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);  // Modal visibility state

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

  useEffect(() => {
    if (id && students.length > 0) {
      const student = students.find(std => std._id === id);
      if (student) {
        setSelectedStudent(id);
        setSelectedStudentName(student.name);
      }
      fetchStudentMarks(id);
    }
  }, [id, students]);

  const handleMarksChange = (subject, value) => {
    if (value >= 0 && value <= 100) {
      setMarks({ ...marks, [subject]: value });
    } else if (value === undefined) {
      setMarks({ ...marks, [subject]: '' });
    }
  };

  const handleSubmit = async () => {
    if (!selectedStudent || !term) {
      message.error('Please select both a student and a term.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/marks', { 
        studentId: selectedStudent, 
        studentName: selectedStudentName,
        term: Number(term), 
        subjects: marks 
      });
      message.success('Marks added successfully!');
      setMarks({ math: '', science: '', english: '', history: '', geography: '', ict: '', art: '', p_e: '', health: '' });
      setTerm('');
      await fetchStudentMarks(selectedStudent);
      setIsModalVisible(false);  // Close the modal after successful submission
    } catch (error) {
      message.error('Error adding marks: ' + (error.response?.data?.error || 'Server error'));
    }
  };

  const fetchStudentMarks = async (studentId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/std/${studentId}`);
      setStudentMarks(res.data);
    } catch (error) {
      console.error('Error fetching student marks:', error);
      setStudentMarks([]);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);  // Open the modal
  };

  const handleCancel = () => {
    setIsModalVisible(false);  // Close the modal
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>
        {selectedStudentName}
        {selectedStudent && students.find(student => student._id === selectedStudent)?.indexNo && (
          <span> ({students.find(student => student._id === selectedStudent).indexNo})</span>
        )}
      </Title>

      <Button type="primary" onClick={showModal}>
        Enter Marks
      </Button>

      <MarksModal  // Use the modal component here
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        handleMarksChange={handleMarksChange}
        marks={marks}
        setTerm={setTerm}
        term={term}
        handleSubmit={handleSubmit}
      />

      {studentMarks.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <Title level={3}>Marks for {selectedStudentName} </Title>
          {studentMarks.map((markEntry, index) => (
            <Card key={index} title={`Term ${markEntry.term}`} style={{ marginBottom: '10px' }}>
              <List
                dataSource={Object.entries(markEntry.subjects)}
                renderItem={([subject, score]) => (
                  <List.Item>
                    <Text>{subject.toUpperCase()}: {score}</Text>
                  </List.Item>
                )}
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarksForm;
