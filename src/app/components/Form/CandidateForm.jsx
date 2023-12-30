/* eslint-disable */

import React, { useEffect, useState } from 'react';
import {
  Avatar,
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
  Switch,
  Upload,
} from 'antd';
import DataService from '@/app/utils/dataService';

import './customtext.css';
import ButtonContact from './ButtonContact';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import { updateExpertConfig } from '@/app/expert/expertServices';
import { updateCandidateConfig } from '@/app/candidate/candidateServices';
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
const CandidateForm = ({ onCreated, data, resumes }) => {
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
  const [imageUrl, setImageUrl] = useState(data?.avatar);
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
      // const mockData = data
      // console.log('Form fields set with data:', data);
      // // Use mockData if no data is provided
      // const initialData = mockData;
      // console.log('initialData: ', initialData);
      // If data.cv is an array of objects, extract their ids
      const cvIds = data.cv?.map(cv => cv.id) ?? [];
      const formData = {
        ...data,
        cv: cvIds, // Set the cv field with an array of ids
      };
      form.setFieldsValue(formData);
    }
  }, [data, form]);

  const handleSubmit = async values => {
    try {
      values.avatar = imageUrl;
      console.log('handleSubmit: ', values);
      const result = await updateCandidateConfig(values);
      openNotification('bottomRight', `Save changes: ${result}`);
    } catch (error) {
      openNotification('bottomRight', `Error: ${error}`);
      console.log('Submit. Error:', error);
    }
  };

  const resumeOptions = resumes?.map(resume => ({
    value: resume.id,
    label: resume.resumeName,
  }));

  const handleChangeTag = value => {
    console.log(`selected ${value}`);
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
  // const accessToken = localStorage?.getItem('accessToken');
  const [accessToken, setAccessToken] = useState();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get the accessToken from localStorage
      const accessTokenLocal = localStorage.getItem('accessToken');

      // Set the Authorization header if the accessToken is available
      if (accessTokenLocal) {
        setAccessToken(accessTokenLocal);
      }
    }
  }, []);

  return (
    <div className="" style={{ width: '700px' }}>
      {contextHolder}
      <Card>
        <Title>Your infomation</Title>
        <p>Set up the information you want the candidate to see</p>
        <Form onFinish={handleSubmit} form={form} layout="vertical" autoComplete="off">
          <Title className="mt-8" level={5}>
            Change avatar
          </Title>
          <Upload
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            action="https://api-cvbuilder.monoinfinity.net/api/messages/public/upload/image"
            headers={{ authorization: `Bearer ${accessToken}` }}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? <Avatar src={imageUrl} alt="avatar" size={100} /> : uploadButton}
          </Upload>
          <Form.Item
            name="avatar"
            style={{
              // display: 'none',
              marginTop: '-10px',
            }}
            label={
              <></>
              // <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
              //   <div className="flex gap-2 items-center text-xs">
              //     <span>
              //       <strong>Avatar</strong>
              //     </span>
              //   </div>
              // </label>
            }
          >
            <Input
              style={{
                // display: 'none',
                marginTop: '-10px',
              }}
              hidden
              className="inputEl contact-section inputEl st-current"
              id="contact-section-form-0"
            />
          </Form.Item>
          <Form.Item
            name="name"
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

          <Form.Item
            name="jobTitle"
            label={
              <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
                <div className="flex gap-2 items-center text-xs">
                  <span>
                    <strong>Job Title</strong>
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
              placeholder="Java Developer"
            />
          </Form.Item>

          <Form.Item
            name="company"
            label={
              <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
                <div className="flex gap-2 items-center text-xs">
                  <span>
                    <strong>Company</strong>
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
            name="about"
            label={
              <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
                <div className="flex gap-2 items-center text-xs">
                  <span>
                    <strong>About</strong>
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
              placeholder="About"
            />
          </Form.Item>
          {/* <Space align="center">
            <Form.Item
              name="cv"
              label={
                <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs text-gray-600">
                  <div className="flex gap-2 items-center text-xs">
                    <span className="flex flex-col">
                      <div>
                        <strong>Choose CV</strong>
                      </div>
                      <div>
                        <span style={{ textTransform: 'none' }}>
                          Choose your best CV to show for the recruiter
                        </span>
                      </div>
                    </span>
                  </div>
                </label>
              }
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select style={{ width: 300, height: 60, marginTop: 5 }} options={resumeOptions} />
            </Form.Item>
          </Space> */}
          <Form.Item
            name="cv"
            label={
              <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs text-gray-600">
                <div className="flex gap-2 items-center text-xs">
                  <span className="flex flex-col">
                    <div>
                      <strong>Choose CV</strong>
                    </div>
                    <div>
                      <span style={{ textTransform: 'none' }}>
                        Choose your best CV to show for the recruiter
                      </span>
                    </div>
                  </span>
                </div>
              </label>
            }
          >
            <Select
              style={{ width: 300, height: 50, marginTop: 5 }}
              mode="tags"
              onChange={handleChangeTag}
              options={resumeOptions}
            />
          </Form.Item>
          <Form.Item
            label={
              <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
                <div className="flex gap-2 items-center text-xs">
                  <span>
                    <strong>Publish your profile</strong>
                  </span>
                </div>
              </label>
            }
            name="publish"
            valuePropName="checked"
          >
            <Switch />
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
                Save basic info
              </button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CandidateForm;
