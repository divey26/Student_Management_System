import React, { useEffect, useState } from 'react';
import { Table, Card, Statistic, Row, Col, message, Input, Select } from 'antd';
import axios from 'axios';

const { Search } = Input;
const { Option } = Select;

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [studentsByGrade, setStudentsByGrade] = useState({});
  const [searchText, setSearchText] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');

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

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleGradeChange = (value) => {
    setSelectedGrade(value);
  };

  const columns = [
    { title: 'Index No', dataIndex: 'indexNo', key: 'indexNo' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Grade', dataIndex: 'grade', key: 'grade' },
  ];

  const grades = [6, 7, 8, 9]; // Grades 6 to 9
  const allGrades = [...new Set([...grades, ...Object.keys(studentsByGrade).map(Number)])];

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchText.toLowerCase()) ||
      student.indexNo.toString().includes(searchText);

    const matchesGrade = selectedGrade ? student.grade === selectedGrade : true;

    return matchesSearch && matchesGrade;
  });

  return (
    <div style={{ padding: 20 }}>
      <Row gutter={[16, 16]}>
        {allGrades.map((grade) => (
          <Col span={12} key={grade}>
            <Card style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', height: '100%' }}>
              <Statistic
                title={<span style={{ color: 'black', fontWeight: 'bold' }}>{`Grade ${grade}`}</span>}
                value={studentsByGrade[grade] || 0}
                valueStyle={{ color: 'green', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Card style={{ textAlign: 'center', marginTop: '10px' }}>
        <Statistic title="Total Students" value={totalStudents} valueStyle={{ color: 'red', fontWeight: 'bold' }} />
      </Card>

      <Card title="Search and Filter" style={{ marginTop: '20px' }}>
        <Row gutter={16}>
          <Col span={12}>
            <Search
              placeholder="Search by name or index number"
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={12}>
            <Select
              placeholder="Filter by Grade"
              onChange={handleGradeChange}
              style={{ width: '100%' }}
              allowClear
            >
              {grades.map((grade) => (
                <Option key={grade} value={grade}>
                  {`Grade ${grade}`}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Card>

      <Card title="Student List" style={{ marginTop: 20 }}>
        <Table dataSource={filteredStudents} columns={columns} rowKey="indexNo" />
      </Card>
    </div>
  );
};

export default Dashboard;
