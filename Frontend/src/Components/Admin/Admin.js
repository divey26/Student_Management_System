import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, Table, Space, message } from 'antd';


const AdminPage = () => {
  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    adnumber: '',
    email: '',
    phoneNumber: '',
  });
  const [editing, setEditing] = useState(false);
  const [currentAdminId, setCurrentAdminId] = useState(null);

  // Fetch all admins when the component mounts
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin');
        setAdmins(response.data);
      } catch (err) {
        console.error('Error fetching admins', err);
      }
    };
    fetchAdmins();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Add or Edit admin
  const handleSubmit = async (values) => {
    const { name, adnumber, email, phoneNumber } = values;
    try {
      if (editing) {
        await axios.put(`http://localhost:5000/api/admin/edit/${currentAdminId}`, {
          name,
          adnumber,
          email,
          phoneNumber,
        });
        message.success('Admin updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/admin/add', { name, adnumber, email, phoneNumber });
        message.success('Admin added successfully');
      }
      // Reset form after submission
      setFormData({ name: '', adnumber: '', email: '', phoneNumber: '' });
      setEditing(false);
      setCurrentAdminId(null);
      // Re-fetch admins
      const response = await axios.get('http://localhost:5000/api/admin');
      setAdmins(response.data);
    } catch (err) {
      console.error('Error submitting form', err);
      message.error('Error submitting form');
    }
  };

  // Set form to edit an admin
  const handleEdit = (admin) => {
    setFormData({
      name: admin.name,
      adnumber: admin.adnumber,
      email: admin.email,
      phoneNumber: admin.phoneNumber,
    });
    setEditing(true);
    setCurrentAdminId(admin._id);
  };

  // Delete an admin
  const handleDelete = async (adminId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/delete/${adminId}`);
      message.success('Admin deleted successfully');
      const response = await axios.get('http://localhost:5000/api/admin');
      setAdmins(response.data);
    } catch (err) {
      console.error('Error deleting admin', err);
      message.error('Error deleting admin');
    }
  };

  // Ant Design Table columns definition
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Admin Number',
      dataIndex: 'adnumber',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, admin) => (
        <Space>
          <Button onClick={() => handleEdit(admin)} type="primary">Edit</Button>
          <Button onClick={() => handleDelete(admin._id)} danger>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Admin Management</h1>

      {/* Admin Form */}
      <Form
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={formData}
        style={{ width: '400px', marginBottom: '20px' }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input the admin name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Admin Number"
          name="adnumber"
          rules={[{ required: true, message: 'Please input the admin number!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[{ required: true, message: 'Please input the phone number!' }]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          {editing ? 'Update Admin' : 'Add Admin'}
        </Button>
      </Form>

      {/* Admin List */}
      <h2>Admin List</h2>
      <Table
        columns={columns}
        dataSource={admins}
        rowKey={(admin) => admin._id}
        pagination={false}
      />
    </div>
  );
};

export default AdminPage;
