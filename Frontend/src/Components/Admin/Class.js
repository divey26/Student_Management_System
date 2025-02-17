import React, { useEffect, useState } from 'react';
import { Table, Card, Statistic, message, Button } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Dashboard = () => {
  const { grade } = useParams();  // Get grade from URL parameter
  const [students, setStudents] = useState([]);
  const [filteredTotal, setFilteredTotal] = useState(0); // New state for filtered total

  useEffect(() => {
    fetchStudents();
  }, [grade]); // Re-fetch students whenever grade changes

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/std');
      const studentData = response.data;
      setStudents(studentData);

      // Filter students by the selected grade if a grade is specified
      if (grade) {
        const filteredStudents = studentData.filter(student => student.grade === parseInt(grade));
        setStudents(filteredStudents);
        setFilteredTotal(filteredStudents.length); // Update filtered total
      } else {
        setFilteredTotal(studentData.length); // If no grade, show the total count
      }
    } catch (error) {
      message.error('Error fetching students');
    }
  };

  const columns = [
    { title: 'Index No', dataIndex: 'indexNo', key: 'indexNo' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Grade', dataIndex: 'grade', key: 'grade' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Link to={`/students/${record._id}/marks`}>
          <Button type="primary">View Marks</Button>
        </Link>
      ),
    },
  ];

  return (
      <div style={{ padding: 20 }}>
        {/* Display the grade passed in the URL */}
        {grade && (
          <Card title={`Students of Grade ${grade}`} style={{ marginTop: 20 }}>
            <Statistic title="Total Students" value={filteredTotal} /> {/* Display filtered total */}
          </Card>
        )}

        <Card title="Student List" style={{ marginTop: 20 }}>
          <Table dataSource={students} columns={columns} rowKey="indexNo" />
        </Card>
      </div>
    
  );
};

export default Dashboard;
