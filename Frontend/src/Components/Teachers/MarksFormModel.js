import React from 'react';
import { Modal, Form, InputNumber, Select, Button } from 'antd';

const { Option } = Select;

const MarksModal = ({ isModalVisible, handleCancel, handleMarksChange, marks, setTerm, term, handleSubmit, takenTerms }) => {
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
            {[1, 2, 3].map((termOption) => 
              !takenTerms.includes(termOption) && (
                <Option key={termOption} value={termOption}>Term {termOption}</Option>
              )
            )}
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
