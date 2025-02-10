import React from 'react';
import { Form, Input, InputNumber, Button, Select, message } from 'antd';
import axios from 'axios';
import Layoutnew from '../../Layout';
const { Option } = Select;

const StudentForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await axios.post('http://localhost:5000/api/std', values);  // Adjust the API endpoint as needed
      message.success('Student details submitted successfully!');
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error('Failed to submit student details!');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '50px auto', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Student Details</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        
        <Form.Item
          label="Index Number"
          name="indexNo"
          rules={[
            { required: true, message: 'Please enter the index number!' },
            { pattern: /^ST\d{5}$/, message: 'Index must start with ST followed by 5 digits (e.g., ST16895)' }
          ]}
        >
          <Input placeholder="ST16895" />
        </Form.Item>

        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please enter the first name!' }]}
        >
          <Input placeholder="Enter First Name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please enter the last name!' }]}
        >
          <Input placeholder="Enter Last Name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter the email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input placeholder="example@example.com" />
        </Form.Item>

        <Form.Item
          label="Contact Number"
          name="contactNo"
          rules={[
            { required: true, message: 'Please enter the contact number!' },
            { pattern: /^\d{10}$/, message: 'Contact number must be 10 digits!' }
          ]}
        >
          <Input placeholder="0712345678" />
        </Form.Item>

        <Form.Item
          label="Age"
          name="age"
          rules={[
            { required: true, message: 'Please enter the age!' },
            { type: 'number', min: 5, max: 20, message: 'Age must be between 5 and 20' }
          ]}
        >
          <InputNumber style={{ width: '100%' }} placeholder="Enter Age" />
        </Form.Item>

        <Form.Item
          label="Grade"
          name="grade"
          rules={[
            { required: true, message: 'Please select the grade!' },
            { type: 'number', min: 1, max: 10, message: 'Grade must be between 1 and 10' }
          ]}
        >
          <Select placeholder="Select Grade">
            {[...Array(10).keys()].map(num => (
              <Option key={num + 1} value={num + 1}>{num + 1}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Current Term"
          name="currentTerm"
          rules={[
            { required: true, message: 'Please select the current term!' },
            { type: 'number', min: 1, max: 3, message: 'Term must be between 1 and 3' }
          ]}
        >
          <Select placeholder="Select Current Term">
            {[1, 2, 3].map(term => (
              <Option key={term} value={term}>{term}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default StudentForm;
