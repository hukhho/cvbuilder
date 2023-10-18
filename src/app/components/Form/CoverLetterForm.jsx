/* eslint-disable no-shadow */

import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import DataService from '@/app/utils/dataService';
import { createCoverLetter } from './coverLetterService';

import './customtext.css';
import './select.css';
import './coverletter.css';

const stylesInput = {
  width: '100%',
  height: '56.19px',
  padding: '17.30px 15.50px 15.89px',
  backgroundColor: 'white',
  borderRadius: '4px',
  border: '2px solid #e5e5e5',
  fontSize: '16px',
  fontWeight: '600',
  fontFamily: 'Source Sans Pro, sans-serif',
};

const CoverLetterForm = ({ cvId, onCreated, data }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    console.log('ContactForm data: ', data);

    if (data) {
      const mockData = {
        name: data.name,
      };

      console.log('Form fields set with data:', data);

      // Use mockData if no data is provided
      const initialData = mockData;
      console.log('initialData: ', initialData);
      // form.setFieldsValue(initialData);
    }
  }, [data, form]);

  const [content, setContent] = useState('');

  const handleSubmit = async values => {
    try {
      const userId = 1;
      const content = await createCoverLetter(userId, values);
      console.log('handleSubmit, values: ', values);
      // form.resetFields();
      setContent(content);

      onCreated();
    } catch (error) {
      console.log('Submit. Error:', error);
    }
  };

  return (
    <div className="w-full">
      <Form onFinish={handleSubmit} form={form} layout="vertical" autoComplete="off">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="temperature"
              label={
                <label style={{}}>
                  <span className="custom-text whitespace-nowrap">
                    <strong>Temperature</strong>
                  </span>
                </label>
              }
            >
              <Input style={stylesInput} placeholder="0.2" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="company"
              label={
                <label style={{}}>
                  <span className="custom-text whitespace-nowrap">
                    <strong>Company</strong>
                  </span>
                </label>
              }
            >
              <Input style={stylesInput} placeholder="Google" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="title"
              label={
                <label style={{}}>
                  <span className="custom-text whitespace-nowrap">
                    <strong>Title</strong>
                  </span>
                </label>
              }
            >
              <Input style={stylesInput} placeholder="(621) 799-5548" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="cvId"
              label={
                <label style={{}}>
                  <span className="custom-text whitespace-nowrap">
                    <strong>CvId</strong>
                  </span>
                </label>
              }
            >
              <Input style={stylesInput} placeholder="cvId" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="dear"
              label={
                <label style={{}}>
                  <span className="custom-text whitespace-nowrap">
                    <strong>Dear</strong>
                  </span>
                </label>
              }
            >
              <Input style={stylesInput} placeholder="Google" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="name"
              label={
                <label style={{}}>
                  <span className="custom-text whitespace-nowrap">
                    <strong>Name</strong>
                  </span>
                </label>
              }
            >
              <Input style={stylesInput} placeholder="John Doe" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="description"
              label={
                <label style={{}}>
                  <span className="custom-text whitespace-nowrap">
                    <strong>Description</strong>
                  </span>
                </label>
              }
            >
              <Input style={stylesInput} placeholder="John Doe" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col>
            <Button
              htmlType="submit"
              className="form-button"
              style={{
                width: '100%',
                backgroundColor: 'rgb(77, 112, 235)',
                color: 'white',
              }}
            >
              CREATE CONTENT COVER LETTER
            </Button>
          </Col>
        </Row>
      </Form>
      <div class="relative mt-10 border-2 border-gray-300 rounded-md">
        <textarea
          className="inputEl undefined src-components-Form-Field--Es8ORQL2ofo= "
          id="content-section-form-0"
          aria-label="Write a professional **cover letter**"
          rows={20}
          placeholder="As an accomplished Marketing graduate from Wisconsin University with years of strategic marketing and data analysis experience, ..."
          name="content"
          value={content}
          style={{ background: 'white', height: 545 }}
          defaultValue={content}
        />
      </div>
    </div>
  );
};

export default CoverLetterForm;
