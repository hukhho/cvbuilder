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
import { CloseOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import { updateExpertConfig } from '@/app/expert/expertServices';
import { updateHrConfig } from '@/app/hr/hrServices';
import { getCookieToken } from '@/app/utils/indexService';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
const HrForm = ({ onCreated, data, resumeOptions }) => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message) => {
    api.info({
      message: 'Thong bao',
      description: message,
      placement,
    });
  };

  const [form] = Form.useForm();

  useEffect(() => {
    console.log('ExpertForm data: ', data);

    if (data) {
      // const mockData = data
      // console.log('Form fields set with data:', data);
      // // Use mockData if no data is provided
      // const initialData = mockData;
      // console.log('initialData: ', initialData);
      form.setFieldsValue(data);
    }
  }, [data, form]);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(data?.companyLogo);

  const handleSubmit = async values => {
    try {
      values.companyLogo = imageUrl;
      console.log('handleSubmit: ', values);
      const result = await updateHrConfig(values.cv, values);
      // openNotification('bottomRight', `Save changes: ${result}`);
    } catch (error) {
      openNotification('bottomRight', `Error: ${error}`);
      console.log('Submit. Error:', error);
    }
  };

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
      // setLoading(false);
      //   setImageUrl(url);
      //   console.log('url: ', url);
      // });
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
    <div className="" style={{ width: '800px' }}>
      {contextHolder}
      <Card>
        <Title>Your Company Infomation</Title>
        <p>
          Set up your company information you want the candidate to see. We will use this
          information along your job posting
        </p>
        <Form onFinish={handleSubmit} form={form} layout="vertical" autoComplete="off">
          <Form.Item
            name="name"
            label={
              <label className="mt-16 !leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
                <div className="flex gap-2 items-center text-xs">
                  <span>
                    <strong>Your name</strong>
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

          <Form.Item
            name="companyName"
            label={
              <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
                <div className="flex gap-2 items-center text-xs">
                  <span>
                    <strong>Company name</strong>
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
              placeholder="Google"
            />
          </Form.Item>

          <Form.Item
            name="companyLogo"
            label={
              <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
                <div className="flex gap-2 items-center text-xs">
                  <span>
                    <strong>Logo</strong>
                  </span>
                </div>
              </label>
            }
          >
            {/* <Input
              style={{
                marginTop: '-10px',
              }}
              hidden
              className="inputEl contact-section inputEl st-current"
              id="contact-section-form-0"
              placeholder=""
            /> */}
            <div>
              <Upload
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                action="https://api-cvbuilder.monoinfinity.net/api/v1/auth/upload/image"
                headers={{ authorization: `Bearer ${token}` }}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                      width: '100px',
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </div>
          </Form.Item>
          <Form.Item
            name="companyLocation"
            label={
              <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
                <div className="flex gap-2 items-center text-xs">
                  <span>
                    <strong>Company Location</strong>
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
              placeholder="District 1, Ho Chi Minh City"
            />
          </Form.Item>
          <Form.Item
            name="companyDescription"
            label={
              <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
                <div className="flex gap-2 items-center text-xs">
                  <span>
                    <strong>About the company</strong>
                  </span>
                </div>
              </label>
            }
          >
            <Input.TextArea
              style={{
                marginTop: '-10px',
              }}
              className="inputEl contact-section inputEl st-current"
              id="contact-section-form-0"
              placeholder="Write a brief introduction to help the recruiter know who you are"
            />
          </Form.Item>

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
                Save
              </button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default HrForm;
