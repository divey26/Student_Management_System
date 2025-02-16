import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, InputNumber, Button, Typography, message, Spin } from 'antd';

import LayoutNew from '../../Layout'
const { Title } = Typography;

const StudentForm = () => {
  const [form] = Form.useForm();
  const [indexNo, setIndexNo] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch the auto-generated index number
  const fetchIndexNo = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/std/generateIndex');
      setIndexNo(response.data.indexNo);
    } catch (error) {
      message.error('Failed to generate index number: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndexNo();  // Auto-generate index number when component mounts
  }, []);

  const handleSubmit = async (values) => {
    try {
      const studentData = { 
        indexNo,  // Manually add indexNo
        name: values.name,
        email: values.email,
        grade: values.grade
      };
      await axios.post('http://localhost:5000/api/std', studentData);
      message.success('Student added successfully!');
      form.resetFields();
      fetchIndexNo();  // Generate new index number after successful submission
    } catch (error) {
      message.error('Error adding student: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <LayoutNew>
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <Title level={2}>Add Student</Title>
      <Spin spinning={loading}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Index No">
            <Input value={indexNo} readOnly />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter the student's name!" }]}
          >
            <Input placeholder="Enter Name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter the email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input placeholder="Enter Email" />
          </Form.Item>

          <Form.Item
            label="Grade"
            name="grade"
            rules={[
              { required: true, message: 'Please enter the grade!' },
              { type: 'number', min: 6, max: 11, message: 'Grade must be between 6 and 9!' }
            ]}
          >
            <InputNumber style={{ width: '100%' }} placeholder="Enter Grade" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add Student
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
    </LayoutNew>
  );
};

export default StudentForm;
