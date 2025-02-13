import React from 'react';
import { Modal, Form, InputNumber, Select, Button } from 'antd';

const { Option } = Select;

const MarksModal = ({ isModalVisible, handleCancel, handleMarksChange, marks, setTerm, term, handleSubmit }) => {
  return (
    <Modal
      title={`Enter Marks`}
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      width={800}
    >
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Select Term" required>
          <Select 
            placeholder="Select Term" 
            onChange={(value) => setTerm(value)} 
            value={term || undefined}
          >
            <Option value="1">Term 1</Option>
            <Option value="2">Term 2</Option>
            <Option value="3">Term 3</Option>
          </Select>
        </Form.Item>

        {Object.keys(marks).map(subject => (
          <Form.Item 
            key={subject} 
            label={subject.toUpperCase()} 
            rules={[{ required: true, message: `Please input marks for ${subject.toUpperCase()}` }]}>
            <InputNumber 
              min={0} 
              max={100} 
              placeholder={`Enter marks for ${subject.toUpperCase()}`} 
              value={marks[subject]} 
              onChange={(value) => handleMarksChange(subject, value)} 
              style={{ width: '100%' }}
            />
          </Form.Item>
        ))}

        <Form.Item>
          <Button type="primary" htmlType="submit">Submit Marks</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MarksModal;
