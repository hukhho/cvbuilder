import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, notification, Row, Select } from 'antd';
import DataService from '@/app/utils/dataService';
import updateContact from './updateContactService';

import './customtext.css';
import ButtonContact from './ButtonContact';

const ContactForm = ({ cvId, onCreated, data }) => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message) => {
    api.info({
      message: 'Notification',
      description: message,
      placement,
    });
  };

  const [form] = Form.useForm();

  useEffect(() => {
    console.log('ContactForm data: ', data);
    if (data) {
      const mockData = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        linkin: data.linkin,
        personalWebsite: data.personalWebsite,
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
      const result = await updateContact(cvId, values);
      form.resetFields();
      onCreated();
      openNotification('bottomRight', `Save changed: ${result.id}`);
    } catch (error) {
      openNotification('bottomRight', `Error: ${error}`);
      console.log('Submit. Error:', error);
    }
  };
  return (
    <div className="w-full">
      {contextHolder}
      <Form onFinish={handleSubmit} form={form} layout="vertical" autoComplete="off">
        <Row justify="start" gutter={[16, 0]}>
          <Col style={{ maxWidth: 602 }} span={12}>
            <Form.Item
              name="fullName"
              label={
                <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
                  <div className="flex gap-2 items-center text-xs">
                    <span>
                      <strong>Full name</strong>
                    </span>
                  </div>
                </label>
              }
            >
              <Input
                style={{
                  marginTop: '-10px',
                }}
                className="inputEl contact-section inputEl st-current"
                id="contact-section-form-0"
                placeholder="Charles Bloomberg"
              />
            </Form.Item>
          </Col>
          <Col style={{ maxWidth: 602 }} span={12}>
            <Form.Item
              name="email"
              label={
                <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
                  <div className="flex gap-2 items-center text-xs">
                    <span>
                      <strong>Email address</strong>
                    </span>
                  </div>
                </label>
              }
            >
              <Input
                style={{
                  marginTop: '-10px',
                }}
                className="inputEl contact-section inputEl st-current"
                id="contact-section-form-1"
                placeholder="charlesbloomberg@wisc.edu"
              />
            </Form.Item>
          </Col>

          <Col style={{ maxWidth: 602 }} span={12}>
            <Form.Item
              name="phone"
              label={
                <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
                  <div className="flex gap-2 items-center text-xs">
                    <span>
                      <strong>Phone number</strong>
                    </span>
                  </div>
                </label>
              }
            >
              <Input
                style={{
                  marginTop: '-10px',
                }}
                className="inputEl contact-section inputEl st-current"
                id="contact-section-form-2"
                placeholder="(621) 799-5548"
              />
            </Form.Item>
          </Col>

          <Col style={{ maxWidth: 602 }} span={12}>
            <Form.Item
              name="linkin"
              label={
                <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
                  <div className="flex gap-2 items-center text-xs">
                    <span>
                      <strong>Linkedin</strong> url
                    </span>
                  </div>
                </label>
              }
            >
              <Input
                style={{
                  marginTop: '-10px',
                }}
                className="inputEl contact-section inputEl st-current"
                id="contact-section-form-3"
                placeholder="in/cbloomberg"
              />
            </Form.Item>
          </Col>

          <Col style={{ maxWidth: 602 }} span={12}>
            <Form.Item
              name="personalWebsite"
              label={
                <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
                  <div className="flex gap-2 items-center text-xs">
                    <span className="st-current">
                      <strong className="">Personal website</strong> or relevant link
                    </span>
                  </div>
                </label>
              }
            >
              <Input
                style={{
                  marginTop: '-10px',
                }}
                className="inputEl contact-section inputEl st-current"
                id="contact-section-form-4"
                placeholder="https://www.charlesbloomberg.com"
              />
            </Form.Item>
          </Col>

          <Col style={{ maxWidth: 602 }} span={12}>
            <Form.Item
              name="city"
              label={
                <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
                  <div className="flex gap-2 items-center text-xs">
                    <span className="st-current">
                      <strong>CITY/PROVINCE</strong>
                    </span>
                  </div>
                </label>
              }
            >
              <Input
                style={{
                  marginTop: '-10px',
                }}
                className="inputEl contact-section inputEl st-current"
                id="contact-section-form-4"
                placeholder="Ho Chi Minh City"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="start">
          <Col style={{ maxWidth: 602 }} span={12}>
            <Form.Item>
              <div className="form-submit-wrapper">
                <button
                  style={{ width: '592px', height: '50px' }}
                  href=""
                  data-size="large"
                  data-theme="default"
                  data-busy="false"
                  className='contact-section form[data-theme="basic"] button'
                  id="contact-section-save-to-list"
                  type="submit"
                >
                  Save basic info
                </button>
              </div>
            </Form.Item>
          </Col>
          <Col>
            {/* <Button
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
            </Button> */}
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ContactForm;
