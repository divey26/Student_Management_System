import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Typography, Button } from 'antd';

const { Title } = Typography;

const ViewAllStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/std');
        setStudents(res.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Index Number',
      dataIndex: 'indexNo',
      key: 'indexNo',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Link to={`/students/${record._id}/marks`}>
          <Button type="primary">View</Button>
        </Link>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>All Students</Title>
      <Table 
        dataSource={students} 
        columns={columns} 
        rowKey="_id"
        loading={loading}
        bordered
      />
    </div>
  );
};

export default ViewAllStudents;
