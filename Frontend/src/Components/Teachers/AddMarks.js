import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Form, InputNumber, Select, Button, Typography, Card, List, message } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;

const MarksForm = () => {
  const { id } = useParams();  
  const [student, setStudent] = useState(null);
  const [term, setTerm] = useState('');
  const [marks, setMarks] = useState({ 
    math: '', science: '', english: '', history: '', 
    geography: '', ict: '', art: '', p_e: '', health: '' 
  });
  const [studentMarks, setStudentMarks] = useState([]);
  const [completedTerms, setCompletedTerms] = useState([]);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/std/${id}`);
        setStudent(res.data);
        await fetchStudentMarks(id);  
      } catch (error) {
        console.error('Error fetching student:', error);
      }
    };
    fetchStudent();
  }, [id]);

  const handleMarksChange = (subject, value) => {
    if (value >= 0 && value <= 100) {
      setMarks({ ...marks, [subject]: value });
    } else if (value === undefined) {
      setMarks({ ...marks, [subject]: '' });
    }
  };

  const handleSubmit = async () => {
    if (!term) {
      message.error('Please select a term.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/marks', { 
        studentId: id, 
        studentName: student.name,
        term: Number(term), 
        subjects: marks 
      });
      message.success('Marks added successfully!');
      setMarks({ math: '', science: '', english: '', history: '', geography: '', ict: '', art: '', p_e: '', health: '' });
      setTerm('');
      await fetchStudentMarks(id);
    } catch (error) {
      message.error('Error adding marks: ' + (error.response?.data?.error || 'Server error'));
    }
  };

  const fetchStudentMarks = async (studentId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/std/${studentId}`);
      setStudentMarks(res.data);
      
      // Extract completed terms
      const termsCompleted = res.data.map(markEntry => markEntry.term);
      setCompletedTerms(termsCompleted);
    } catch (error) {
      console.error('Error fetching student marks:', error);
      setStudentMarks([]);
    }
  };

  if (!student) {
    return <Text>Loading student information...</Text>;
  }

  // Get available terms to display in dropdown
  const availableTerms = [1, 2, 3].filter(term => !completedTerms.includes(term));

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Enter Marks for {student.name} ({student.indexNo})</Title>

      {availableTerms.length > 0 ? (
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Select Term" required>
            <Select 
              placeholder="Select Term" 
              onChange={(value) => setTerm(value)} 
              value={term || undefined}
            >
              {availableTerms.map(term => (
                <Option key={term} value={term}>Term {term}</Option>
              ))}
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
      ) : (
        <Text type="warning">All terms are completed. No further marks can be entered.</Text>
      )}

      {studentMarks.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <Title level={3}>Marks for {student.name}</Title>
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
