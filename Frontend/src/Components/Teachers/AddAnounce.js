import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, Form, message, Card } from 'antd';

const AddAnnouncement = () => {
  const [grade, setGrade] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [links, setLinks] = useState('');

  const handleSubmit = async (values) => {
    const newAnnouncement = {
      grade: values.grade,
      title: values.title,
      author: values.author,
      description: values.description,
      links: values.links ? values.links.split(',').map((link) => link.trim()) : [],
    };

    try {
      await axios.post('http://localhost:5000/api/announcements', newAnnouncement);
      message.success('Announcement added successfully');
    } catch (err) {
      message.error('Error adding announcement');
      console.error('Error adding announcement:', err);
    }
  };

  return (
    <Card title="Add New Announcement" style={{ maxWidth: 600, margin: 'auto', marginTop: 20 }}>
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item label="Grade" name="grade" rules={[{ required: true, message: 'Please input the grade!' }]}>
          <Input placeholder="Grade" />
        </Form.Item>

        <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input the title!' }]}>
          <Input placeholder="Title" />
        </Form.Item>

        <Form.Item label="Author" name="author" rules={[{ required: true, message: 'Please input the author!' }]}>
          <Input placeholder="Author" />
        </Form.Item>

        <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the description!' }]}>
          <Input.TextArea placeholder="Description" rows={4} />
        </Form.Item>

        <Form.Item label="Links (comma separated)" name="links">
          <Input placeholder="Links (comma separated)" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Announcement
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddAnnouncement;
