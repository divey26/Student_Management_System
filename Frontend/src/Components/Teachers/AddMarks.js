import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography, Table, message } from 'antd';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts'; 
import MarksModal from './MarksFormModel';  
import LayoutNew from '../../Layout';

const { Title } = Typography;

const MarksForm = () => {
  const { id } = useParams();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedStudentName, setSelectedStudentName] = useState('');
  const [term, setTerm] = useState('');
  const [marks, setMarks] = useState({ 
    math: '', science: '', english: '', history: '', 
    geography: '', ict: '', art: '', p_e: '', health: '' 
  });
  const [studentMarks, setStudentMarks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const UserNo = localStorage.getItem('userNo');


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

  const fetchStudentMarks = async (studentId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/std/${studentId}`);
      setStudentMarks(res.data || []);
    } catch (error) {
      console.error('Error fetching student marks:', error);
      setStudentMarks([]);
    }
  };

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
      setIsModalVisible(false);
    } catch (error) {
      message.error('Error adding marks: ' + (error.response?.data?.error || 'Server error'));
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const takenTerms = studentMarks?.map(markEntry => markEntry.term) || [];
  const isAddMarksDisabled = takenTerms.length >= 3;

  const columns = [
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    ...takenTerms.map(term => ({
      title: `Term ${term}`,
      dataIndex: `term_${term}`,
      key: `term_${term}`,
    })),
  ];

  // Compute student marks table
  const dataSourceWithTotal = Object.keys(marks).map(subject => ({
    key: subject,
    subject: subject.toUpperCase(),
    ...studentMarks.reduce((acc, markEntry) => {
      acc[`term_${markEntry.term}`] = markEntry.subjects[subject] || 'N/A';
      return acc;
    }, {}),
  }));

  // Calculate total marks for each term
  const totalMarks = studentMarks.reduce((totals, markEntry) => {
    Object.keys(markEntry.subjects).forEach(subject => {
      totals[markEntry.term] = (totals[markEntry.term] || 0) + (markEntry.subjects[subject] || 0);
    });
    return totals;
  }, {});

  // Add total row
  const totalRow = {
    key: 'total',
    subject: 'TOTAL',
    ...Object.keys(totalMarks).reduce((acc, term) => {
      acc[`term_${term}`] = totalMarks[term];
      return acc;
    }, {})
  };

  dataSourceWithTotal.push(totalRow);

  // Prepare chart data
  const chartDataWithoutTotal = Object.keys(marks).map(subject => {
    const term1Marks = studentMarks.find(markEntry => markEntry.term === 1)?.subjects[subject] || 0;
    const term2Marks = studentMarks.find(markEntry => markEntry.term === 2)?.subjects[subject] || 0;
    const term3Marks = studentMarks.find(markEntry => markEntry.term === 3)?.subjects[subject] || 0;

    return {
      subject: subject.toUpperCase(),
      term1: term1Marks,
      term2: term2Marks,
      term3: term3Marks,
    };
  });

  return (
    <LayoutNew>
      <div style={{ padding: '20px' }}>
        <Title level={2}>
          {selectedStudentName}
          {selectedStudent && students.find(student => student._id === selectedStudent)?.indexNo && (
            <span> ({students.find(student => student._id === selectedStudent).indexNo})</span>
          )}
        </Title>

        <Button 
            type="primary" 
            onClick={showModal} 
            disabled={isAddMarksDisabled || UserNo?.startsWith('AD')}
            >
                 Enter Marks
        </Button>


        <MarksModal
          isModalVisible={isModalVisible}
          handleCancel={handleCancel}
          handleMarksChange={handleMarksChange}
          marks={marks}
          setTerm={setTerm}
          term={term}
          handleSubmit={handleSubmit}
          takenTerms={takenTerms}
        />

        {studentMarks.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <Title level={3}>Marks for {selectedStudentName}</Title>
            <Table
              columns={columns}
              dataSource={dataSourceWithTotal}
              pagination={false}
              rowKey="subject"
            />
          </div>
        )}

        {/* Bar Chart Section */}
        <div style={{ marginTop: '40px', height: 300 }}>
          <Title level={3}>Marks Visualization</Title>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartDataWithoutTotal}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="term1" fill="#8884d8" name="Term 1" />
              <Bar dataKey="term2" fill="#82ca9d" name="Term 2" />
              <Bar dataKey="term3" fill="#ff7300" name="Term 3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </LayoutNew>
  );
};

export default MarksForm;