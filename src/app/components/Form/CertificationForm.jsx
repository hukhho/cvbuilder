import React from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Typography } from 'antd';

const CertificationForm = () => {
  const [form] = Form.useForm();

  return (
    <div className="w-2/3 ">
      {' '}
      {/* Đặt chiều rộng tùy ý (vd: 2/3 màn hình) và căn giữa */}
      <Form form={form} layout="vertical" autoComplete="off">
        <Form.Item name="Role" label="WHAT WAS THE CERTIFICATE NAME?" className="form-item">
          <Input placeholder="Project Management Professional (PMP)" />
        </Form.Item>
        <Form.Item name="Company" label="WHERE DID YOU GET THE CERTIFICATE?" className="form-item">
          <Input placeholder="Project Management Institute" />
        </Form.Item>
        <Form.Item label="WHEN DID YOU GET THE CERTIFICATE?" className="form-item">
          <Input placeholder="2023" />
        </Form.Item>
        <Form.Item label="HOW IS THE CERTIFICATE RELEVANT?" className="form-item">
          <Input placeholder="Certified in a standardized and evolving set of project management principles." />
        </Form.Item>

        <Button type="primary" className="form-button w-full" style={{ backgroundColor: 'rgb(77, 112, 235)' }}>
          SAVE TO CERTIFICATIONS LIST
        </Button>
      </Form>
    </div>
  );
};

export default CertificationForm;
