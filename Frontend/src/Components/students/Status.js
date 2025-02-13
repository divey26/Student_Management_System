import React, { useState, useEffect } from 'react';
import { Typography, Table, Button } from 'antd';
import axios from 'axios';
import LayoutNew from '../../Layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const { Title } = Typography;

const ViewAllStudents = () => {
  const [students, setStudents] = useState([]);
  const [studentMarks, setStudentMarks] = useState([]);
  const [marks, setMarks] = useState({
    math: '', science: '', english: '', history: '',
    geography: '', ict: '', art: '', p_e: '', health: ''
  });
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedStudentName, setSelectedStudentName] = useState('');
  const [selectedStudentInfo, setSelectedStudentInfo] = useState({});
  const userNo = localStorage.getItem('userNo');  // Get userNo from localStorage

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
    const filteredStudent = students.find(student => student.indexNo === userNo);
    if (filteredStudent) {
      setSelectedStudent(filteredStudent._id);
      setSelectedStudentName(filteredStudent.name);
      setSelectedStudentInfo(filteredStudent);  // Set full student info
      fetchStudentMarks(filteredStudent._id);
    }
  }, [students, userNo]);

  const fetchStudentMarks = async (studentId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/std/${studentId}`);
      setStudentMarks(res.data);
    } catch (error) {
      console.error('Error fetching student marks:', error);
      setStudentMarks([]);
    }
  };

  const takenTerms = studentMarks.map(markEntry => markEntry.term);

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

  const calculateTermTotal = (term) => {
    return studentMarks.reduce((total, markEntry) => {
      if (markEntry.term === term) {
        Object.keys(markEntry.subjects).forEach(subject => {
          total += markEntry.subjects[subject] || 0;
        });
      }
      return total;
    }, 0);
  };

  const totalRow = {
    key: 'total',
    subject: 'Total',
    ...takenTerms.reduce((acc, term) => {
      acc[`term_${term}`] = calculateTermTotal(term);
      return acc;
    }, {}),
  };

  const dataSource = Object.keys(marks).map(subject => ({
    key: subject,
    subject: subject.toUpperCase(),
    ...studentMarks.reduce((acc, markEntry) => {
      acc[`term_${markEntry.term}`] = markEntry.subjects[subject] || 'N/A';
      return acc;
    }, {}),
  }));

  const chartData = Object.keys(marks).map(subject => {
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

  // Function to export the data as PDF
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.text(`Student Details: ${selectedStudentName}`, 10, 10);
    doc.text(`Index Number: ${userNo}`, 10, 20);
    doc.text(`Email: ${selectedStudentInfo.email || 'N/A'}`, 10, 30);
    doc.text(`Class: ${selectedStudentInfo.grade || 'N/A'}`, 10, 40);

    let yOffset = 50;
    doc.text('Marks Table:', 10, yOffset);

    yOffset += 10;
    // Add table headers
    const headers = ['Subject', ...takenTerms.map(term => `Term ${term}`)];
    const rows = dataSource.map(data => [
      data.subject,
      ...takenTerms.map(term => data[`term_${term}`]),
    ]);

    doc.autoTable({
      head: [headers],
      body: rows,
      startY: yOffset,
      theme: 'grid',
    });

    yOffset = doc.lastAutoTable.finalY + 10;

    // Add chart data
    doc.text('Marks Visualization:', 10, yOffset);

    doc.save('student_report.pdf');
  };

  return (
    <LayoutNew>
      <div style={{ padding: '20px' }}>
        <Title level={2}>Student Details</Title>

        {selectedStudent ? (
          <div>
            <p><strong>Index Number:</strong> {userNo}</p>
            <p><strong>Name:</strong> {selectedStudentName}</p>
            <p><strong>Email:</strong> {selectedStudentInfo.email || 'N/A'}</p>
            <p><strong>Class:</strong> {selectedStudentInfo.grade || 'N/A'}</p>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <Button type="primary" onClick={exportPDF}>Export as PDF</Button>
          </div>


            {studentMarks.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <Table
                  columns={columns}
                  dataSource={[...dataSource, totalRow]} 
                  pagination={false}
                  rowKey="subject"
                />
              </div>
            )}

            <div style={{ marginTop: '40px', height: 300 }}>
              <Title level={3}>Marks Visualization</Title>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
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
        ) : (
          <p>No student found with the given User No.</p>
        )}
      </div>
    </LayoutNew>
  );
};

export default ViewAllStudents;
