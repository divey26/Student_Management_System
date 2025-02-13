import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Typography, Button } from 'antd';
import LayoutNew from '../../Layout';

const { Title } = Typography;

const ViewAllStudents = () => {
  const [students, setStudents] = useState([]);

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
        <Title level={2}>All Students</Title>
        <Table columns={columns} dataSource={students} rowKey="_id" />
      </div>
    </LayoutNew>
  );
};

export default ViewAllStudents;
