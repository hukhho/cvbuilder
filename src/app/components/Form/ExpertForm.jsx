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
import { CloseOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import { updateExpertConfig } from '@/app/expert/expertServices';
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
const ExpertForm = ({ onCreated, data, resumeOptions }) => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message) => {
    api.info({
      message: 'Thong bao',
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
      form.setFieldsValue(data);
    }
  }, [data, form]);

  const handleSubmit = async values => {
    try {
      values.avatar = imageUrl;
      console.log('handleSubmit: ', values);
      const result = await updateExpertConfig(values);
      openNotification('bottomRight', `Save changes: ${result}`);
    } catch (error) {
      openNotification('bottomRight', `Error: ${error}`);
      console.log('Submit. Error:', error);
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
          <Form.Item
            name="avatar"
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
              placeholder="Charles Bloomberg"
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
              placeholder="Charles Bloomberg"
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
          <Space align="center">
            <Form.Item
              name="cvId"
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
              <Select style={{ width: 300, height: 60, marginTop: 5 }} options={resumeOptions} />
            </Form.Item>
            <Form.Item
              name="experiences"
              label={
                <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs text-gray-600">
                  <div className="flex  gap-2 items-center text-xs">
                    <span className="flex flex-col">
                      <span>
                        <strong>YOUR YEARS OF EXPERIENCE</strong>
                      </span>
                      <div>
                        <span style={{ textTransform: 'none' }}>
                          Showing the number of experience to users
                        </span>
                      </div>
                    </span>
                  </div>
                </label>
              }
            >
              <InputNumber
                style={{
                  marginTop: '-10px',
                }}
                className="inputEl contact-section inputEl st-current"
                id="contact-section-form-0"
                placeholder="5"
              />
            </Form.Item>
          </Space>

          
          <Form.Item label="Price">
            <Form.List name={['price']}>
              {(subFields, subOpt) => (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: 16,
                  }}
                >
                  {subFields.map(subField => (
                    <Space key={subField.key}>
                      <Form.Item noStyle name={[subField.name, 'day']}>
                        <Input placeholder="day" />
                      </Form.Item>
                      <Form.Item noStyle name={[subField.name, 'price']}>
                        <Input placeholder="price" />
                      </Form.Item>
                      <CloseOutlined
                        onClick={() => {
                          subOpt.remove(subField.name);
                        }}
                      />
                    </Space>
                  ))}
                  <Button type="dashed" onClick={() => subOpt.add()} block>
                    + Add Sub Item
                  </Button>
                </div>
              )}
            </Form.List>
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

export default ExpertForm;
