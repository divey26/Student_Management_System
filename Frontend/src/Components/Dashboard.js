import React, { useEffect, useState } from 'react';
import { Table, Card, Statistic, Row, Col, message } from 'antd';
import axios from 'axios';
import LayoutNew from '../Layout';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [studentsByGrade, setStudentsByGrade] = useState({});

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/std');
      const studentData = response.data;
      setStudents(studentData);
      setTotalStudents(studentData.length);

      // Group students by grade
      const groupedByGrade = studentData.reduce((acc, student) => {
        const grade = student.grade;
        if (!acc[grade]) {
          acc[grade] = 0;
        }
        acc[grade]++;
        return acc;
      }, {});

      setStudentsByGrade(groupedByGrade);
    } catch (error) {
      message.error('Error fetching students');
    }
  };

  const columns = [
    { title: 'Index No', dataIndex: 'indexNo', key: 'indexNo' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Grade', dataIndex: 'grade', key: 'grade' },
  ];

  const grades = [6, 7, 8, 9]; // Grades 6 to 9
  const allGrades = [...grades, ...Object.keys(studentsByGrade).map(Number)];

  return (
    <LayoutNew>
      <div style={{ padding: 20 }}>
        <Row gutter={16}>

          {/* Display number of students grade-wise */}
          {allGrades.map((grade) => (
            <Col span={8} key={grade}>
              <Card>
                <Statistic title={`Grade ${grade}`} value={studentsByGrade[grade] || 0} />
              </Card>
            </Col>
          ))}
        </Row>
     
        <Card style={{ textAlign: 'center', marginTop:"10px"}}>
          <Statistic title="Total Students" value={totalStudents} />
        </Card>


        <Card title="Student List" style={{ marginTop: 20 }}>
          <Table dataSource={students} columns={columns} rowKey="indexNo" />
        </Card>
      </div>
    </LayoutNew>
  );
};

export default Dashboard;
