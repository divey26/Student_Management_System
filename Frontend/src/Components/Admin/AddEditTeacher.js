import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const TeacherForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await axios.post('http://localhost:5000/api/teachers', values);  // Adjust the API endpoint if needed
      message.success('Teacher details submitted successfully!');
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error('Failed to submit teacher details!');
    }
  };

  return (
      <div style={{ maxWidth: 600, margin: '50px auto', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Teacher Details</h2>
        <Form form={form} layout="vertical" onFinish={onFinish}>

          {/* Name */}
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter the name!' }]}
          >
            <Input placeholder="Enter Full Name" />
          </Form.Item>

          {/* ID Number */}
          <Form.Item
            label="ID Number"
            name="idNumber"
            rules={[
              { required: true, message: 'Please enter the ID number!' },
              { pattern: /^TR\d{5}$/, message: 'ID must start with TR followed by 5 digits (e.g., TE12345)' }
            ]}
          >
            <Input placeholder="TRXXXXX" />
          </Form.Item>

          {/* Phone Number */}
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: 'Please enter the phone number!' },
              { pattern: /^\d{10}$/, message: 'Phone number must be 10 digits!' }
            ]}
          >
            <Input placeholder="0712345678" />
          </Form.Item>

          {/* Email */}
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


          {/* Grade */}
          <Form.Item
            label="Grade"
            name="grade"
            rules={[{ required: true, message: 'Please select the grade!' }]}
          >
            <Select placeholder="Select Grade">
              {[6, 7, 8, 9, 10, 11].map(num => (
                <Option key={num} value={num}>{num}</Option>
              ))}
            </Select>
          </Form.Item>


          {/* Subject */}
          <Form.Item
            label="Subject"
            name="subject"
            rules={[{ required: true, message: 'Please select the subject!' }]}
          >
            <Select placeholder="Select Subject">
              {[
                'Mathematics', 'Science', 'English', 'History', 'Religion', 
                'Geography', 'Civics', 'ICT', 'English Literature', 'Tamil Literature', 
                'Commerce', 'PTS', 'PT', 'Sinhala', 'Islam'
              ].map(subject => (
                <Option key={subject} value={subject}>{subject}</Option>
              ))}
            </Select>
          </Form.Item>


          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    
  );
};

export default TeacherForm;
