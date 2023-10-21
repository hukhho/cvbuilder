import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import DataService from '@/app/utils/dataService';
import updateContact from './updateContactService';

import './customtext.css';
import './select.css';
import ButtonContact from './ButtonContact';

const stylesInput = {
  width: '584px',
  height: '56.19px',
  padding: '17.30px 15.50px 15.89px',
  backgroundColor: 'white',
  borderRadius: '4px',
  border: '2px solid #e5e5e5',
  fontSize: '16px',
  fontWeight: '600',
  fontFamily: 'Source Sans Pro, sans-serif',
};

const ContactForm = ({ cvId, onCreated, data }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    console.log('ContactForm data: ', data);

    if (data) {
      const mockData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        linkedIn: data.linkin,
        website: data.permissionWebsite,
        country: data.country,
        state: data.state,
        city: data.city,
      };

      console.log('Form fields set with data:', data);

      // Use mockData if no data is provided
      const initialData = mockData;
      console.log('initialData: ', initialData);
      form.setFieldsValue(initialData);
    }
  }, [data, form]);

  const handleSubmit = async values => {
    try {
      const userId = 1;
      await updateContact(userId, values);
      form.resetFields();
      onCreated();
    } catch (error) {
      console.log('Submit. Error:', error);
    }
  };

  return (
    <div className="w-full">
      <Form onFinish={handleSubmit} form={form} layout="vertical" autoComplete="off">
        <Row justify="start" gutter={[16, 16]}>
          <Col style={{ maxWidth: 602 }} span={12}>
            <Form.Item
              name="name"
              label={
                <label style={{}}>
                  <span className="custom-text whitespace-nowrap">
                    <strong>FULL NAME</strong>
                  </span>
                </label>
              }
            >
              <Input style={stylesInput} placeholder="Charles Bloomberg" />
            </Form.Item>
          </Col>
          <Col style={{ maxWidth: 602 }} span={12}>
            <Form.Item
              name="email"
              label={
                <label style={{}}>
                  <span className="custom-text whitespace-nowrap">
                    <strong>EMAIL ADDRESS</strong>
                  </span>
                </label>
              }
            >
              <Input
                style={stylesInput}
                // charlesbloomberg@wisc.edu
                placeholder="charlesbloomberg@wisc.edu"
              />
            </Form.Item>
          </Col>

          <Col style={{ maxWidth: 602 }} span={12}>
            <Form.Item
              name="phone"
              label={
                <label style={{}}>
                  <span className="custom-text whitespace-nowrap">
                    <strong>PHONE NUMBER</strong>
                  </span>
                </label>
              }
            >
              <Input style={stylesInput} placeholder="(621) 799-5548" />
            </Form.Item>
          </Col>

          <Col style={{ maxWidth: 602 }} span={12}>
            <Form.Item
              name="linkedIn"
              label={
                <label style={{}}>
                  <span className="custom-text whitespace-nowrap">
                    <strong>LINKEDIN</strong> URL
                  </span>
                </label>
              }
            >
              <Input style={stylesInput} placeholder="in/cbloomberg" />
            </Form.Item>
          </Col>

          <Col style={{ maxWidth: 602 }} span={12}>
            <Form.Item
              name="permissionWebsite"
              label={
                <label style={{}}>
                  <span className="custom-text whitespace-nowrap">
                    <strong>PERSONAL WEBSITE</strong> OR RELEVANT LINK
                  </span>
                </label>
              }
            >
              <Input style={stylesInput} placeholder="https://www.charlesbloomberg.com" />
            </Form.Item>
          </Col>

          <Col style={{ maxWidth: 602 }} span={12}>
            <Form.Item
              name="country"
              label={
                <label style={{}}>
                  <span className="custom-text whitespace-nowrap">
                    <strong>CITY/PROVINCE</strong>
                  </span>
                </label>
              }
            >
              <Input style={stylesInput} placeholder="https://www.charlesbloomberg.com" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="start">
          <Col>
            <Button
              htmlType="submit"
              className="form-button  w-[769.22px] h-[47.86px] bg-indigo-500 rounded-md justify-center items-center inline-flex hover:text-white"
              style={{
                width: '584px',
                height: '56px',
                backgroundColor: 'rgb(77, 112, 235)',
                color: 'white',
              }}
            >
              <div className="hover:text-white text-center text-white text-opacity-80 text-xs font-bold font-['Source Sans Pro'] uppercase leading-3 whitespace-nowrap">
                SAVE BASIC INFO
              </div>
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ContactForm;
