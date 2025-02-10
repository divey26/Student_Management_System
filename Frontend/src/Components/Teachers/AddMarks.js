import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, InputNumber, Select, Button, Typography, Card, List, message } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;

const MarksForm = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedStudentName, setSelectedStudentName] = useState('');
  const [term, setTerm] = useState('');
  const [marks, setMarks] = useState({ 
    math: '', science: '', english: '', history: '', 
    geography: '', ict: '', art: '', p_e: '', health: '' 
  });
  const [studentMarks, setStudentMarks] = useState([]);

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

  const handleMarksChange = (subject, value) => {
    if (value >= 0 && value <= 100) {
      setMarks({ ...marks, [subject]: value });
    } else if (value === undefined) {
      setMarks({ ...marks, [subject]: '' });
    }
  };

  const handleStudentChange = async (value) => {
    setSelectedStudent(value);
    const student = students.find(std => std._id === value);
    setSelectedStudentName(student ? student.name : '');
    if (value) {
      await fetchStudentMarks(value);
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
    } catch (error) {
      message.error('Error adding marks: ' + (error.response?.data?.error || 'Server error'));
    }
  };

  const fetchStudentMarks = async (studentId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/marks/${studentId}`);
      setStudentMarks(res.data);
    } catch (error) {
      console.error('Error fetching student marks:', error);
      setStudentMarks([]);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Enter Marks</Title>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Select Student" required>
          <Select 
            placeholder="Select Student" 
            onChange={handleStudentChange} 
            value={selectedStudent || undefined}
          >
            {students.map(student => (
              <Option key={student._id} value={student._id}>
                {student.name} ({student.indexNo})
              </Option>
            ))}
          </Select>
        </Form.Item>

        {selectedStudentName && <Text strong>Selected Student: {selectedStudentName}</Text>}

        <Form.Item label="Select Term" required>
          <Select 
            placeholder="Select Term" 
            onChange={(value) => setTerm(value)} 
            value={term || undefined}
          >
            <Option value="1">Term 1</Option>
            <Option value="2">Term 2</Option>
            <Option value="3">Term 3</Option>
          </Select>
        </Form.Item>

        {Object.keys(marks).map(subject => (
          <Form.Item 
            key={subject} 
            label={subject.toUpperCase()} 
            rules={[{ required: true, message: `Please input marks for ${subject.toUpperCase()}` }]}
          >
            <InputNumber 
              min={0} 
              max={100} 
              placeholder={`Enter marks for ${subject.toUpperCase()}`} 
              value={marks[subject]} 
              onChange={(value) => handleMarksChange(subject, value)} 
              style={{ width: '100%' }}
            />
          </Form.Item>
        ))}

        <Form.Item>
          <Button type="primary" htmlType="submit">Submit Marks</Button>
        </Form.Item>
      </Form>

      {studentMarks.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <Title level={3}>Marks for {selectedStudentName}</Title>
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
