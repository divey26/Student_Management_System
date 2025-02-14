import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Typography, Button, Card } from 'antd';
import LayoutNew from '../../Layout';

const { Title } = Typography;

const ViewAllStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);  // State to hold filtered students
  const [teacher, setTeacher] = useState(null);  // State to hold teacher data
  const UserNo = localStorage.getItem('userNo');

  useEffect(() => {
    // Fetch students data
    const fetchStudents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/std');
        const sortedStudents = res.data.sort((a, b) => {
          const numA = parseInt(a.indexNo.substring(1)); // Extract numeric part
          const numB = parseInt(b.indexNo.substring(1));
          return numA - numB; // Sort in ascending order
        });
        setStudents(sortedStudents);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    // Fetch teacher data based on UserNo
    const fetchTeacher = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/teachers/${UserNo}`); // Adjust the endpoint as needed
        setTeacher(res.data);  // Set teacher data
      } catch (error) {
        console.error('Error fetching teacher:', error);
      }
    };

    fetchStudents();
    fetchTeacher();  // Call the function to fetch teacher data
  }, [UserNo]);

  // Filter students based on teacher's grade
  useEffect(() => {
    if (teacher && teacher.grade === 8) {
      const grade8Students = students.filter(student => student.grade === 8);
      setFilteredStudents(grade8Students);
    } else {
      setFilteredStudents(students); // If teacher's grade is not 8, show all students
    }
  }, [teacher, students]);

  const columns = [
    {
      title: 'Index Number',
      dataIndex: 'indexNo',
      key: 'indexNo',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Link to={`/students/${record._id}/marks`}>
          <Button type="primary">Enter/View Marks</Button>
        </Link>
      ),
    },
  ];

  return (
    <LayoutNew>
      <div style={{ padding: '20px' }}>
        <p>UserSIOP: {UserNo}</p>
        <br/>
        
        {teacher && (  // Only display teacher details if the data is available
          <Card title="Teacher Details" style={{ marginBottom: '20px' }}>
            <p><strong>Name:</strong> {teacher.name}</p>
            <p><strong>Email:</strong> {teacher.email}</p>
            <p><strong>Phone Number:</strong> {teacher.phoneNumber}</p>
            <p><strong>Grade:</strong> {teacher.grade}</p>
            <p><strong>Subject:</strong> {teacher.subject}</p>
          </Card>
        )}
        
        <Title level={2}>All Students</Title>
        <Table columns={columns} dataSource={filteredStudents} rowKey="_id" />
      </div>
    </LayoutNew>
  );
};

export default ViewAllStudents;
