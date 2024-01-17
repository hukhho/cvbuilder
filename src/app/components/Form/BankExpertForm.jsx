/* eslint-disable */

import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  notification,
  Row,
  Select,
  Space,
  Upload,
} from 'antd';
import DataService from '@/app/utils/dataService';
import updateContact from './updateContactService';

import './customtext.css';
import ButtonContact from './ButtonContact';
import { CloseOutlined, LoadingOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import { updateExpertConfig } from '@/app/expert/expertServices';
import { getCookieToken } from '@/app/utils/indexService';

const BankExpertForm = ({ onCreated, data }) => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message) => {
    api.info({
      message: 'Notification',
      description: message,
      placement,
    });
  };

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      const url = info.file.response;
      console.log('info.file.response: ', url);
      setLoading(false);
      setImageUrl(url);
      // getBase64(info.file.originFileObj, url => {
      //   setLoading(false);
      //   setImageUrl(url);
      //   console.log('url: ', url);
      // });
    }
  };

  useEffect(() => {
    console.log('ExpertForm data: ', data);

    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  const handleSubmit = async values => {
    try {
      console.log('handleSubmit: ', values);
      const result = await updateExpertConfig(values);
      openNotification('bottomRight', `Save changes: ${result}`);
    } catch (error) {
      if (error?.response?.data?.error) {
        openNotification('bottomRight', `Error`);
      } else if (error?.response?.data) {
        openNotification('bottomRight', `Error ${error?.response?.data}`);
      } else {
        openNotification('bottomRight', `Error ${error}`);
      }
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const token = getCookieToken(); // Replace with your actual function to get the token

  return (
    <div className="" style={{ width: '700px' }}>
      {contextHolder}
      <Card className='mt-16'>
        <Title>Your bank account</Title>
        <p>
          Your bank account must be the same with your name. If not we won’t proceed withdraw to
          withdraw your money
        </p>
        <Form onFinish={handleSubmit} form={form} layout="vertical" autoComplete="off">
          <Form.Item
            name="bankName"
            style={{
              marginTop: '10px',
            }}
            label={
              <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
                <div className="flex gap-2 items-center text-xs">
                  <span>
                    <strong>Bank Name</strong>
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
              placeholder="MBBANK"
            />
          </Form.Item>

          <Form.Item
            name="bankAccountNumber"
            label={
              <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
                <div className="flex gap-2 items-center text-xs">
                  <span>
                    <strong>Your Bank Account</strong>
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
              placeholder="123456789"
            />
          </Form.Item>

          <Form.Item
            name="bankAccountName"
            label={
              <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
                <div className="flex gap-2 items-center text-xs">
                  <span>
                    <strong>Your Name</strong>
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
              placeholder="Nguyen Van A"
            />
          </Form.Item>

          <Form.Item>
            <div className="form-submit-wrapper">
              <button
                style={{ width: '300px', height: '35px' }}
                href=""
                data-size="large"
                data-theme="default"
                data-busy="false"
                className='contact-section form[data-theme="basic"] button'
                id="contact-section-save-to-list"
                type="submit"
              >
                Save
              </button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default BankExpertForm;
