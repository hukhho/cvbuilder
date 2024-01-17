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
          <Form.Item name="avatar" label={<></>}>
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
            style={{
              marginTop: '-50px',
            }}
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
              autoSize={{
                minRows: 2,
                maxRows: 10,
              }}
              className="inputEl contact-section inputEl st-current"
              id="contact-section-form-0"
              placeholder="About"
            />
          </Form.Item>
          <Space
            className="custom-space-item-2"
            style={{ justifyContent: 'space-between', width: '100%' }}
            align="center"
          >
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
              <Select
                placeholder="Set your resume"
                className="customtext"
                style={{ height: 50, marginTop: '-10px' }}
                options={resumeOptions}
              />
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
                type="number"
                min={1}
                style={{
                  marginTop: '-10px',
                }}
                className="inputEl contact-section inputEl st-current"
                id="contact-section-form-0"
                placeholder="0"
              />
            </Form.Item>
          </Space>

          <Form.Item
            label={
              <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs text-gray-600">
                <div className="flex gap-2 items-center text-xs">
                  <span className="flex flex-col">
                    <span>
                      <strong>PRICING</strong>
                    </span>
                    <div>
                      <span style={{ textTransform: 'none' }}>Set your review request pricing</span>
                    </div>
                  </span>
                </div>
              </label>
            }
          >
            <Form.List
              name={['price']}
              initialValue={[{ day: 1, price: 10000 }]} // Initialize with one item
              // rules={[
              //   {
              //     validator: async (_, prices) => {
              //       if (!prices || prices.length < 1) {
              //         return Promise.reject(new Error('At least one price item is required'));
              //       }
              //     },
              //   },
              // ]}
              rules={[
                {
                  validator: async (_, prices) => {
                    if (!prices || prices.length < 1) {
                      return Promise.reject(new Error('At least one price item is required'));
                    }
            
                    const days = prices.map(item => item.day);
                    if (new Set(days).size !== days.length) {
                      return Promise.reject(new Error('Days must not be duplicated'));
                    }
                  },
                },
              ]}
            >
              {(subFields, subOpt, { errors }) => (
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                    {subFields.map(subField => (
                      <Space className="custom-space-item-3" key={subField.key}>
                        <Form.Item
                          noStyle
                          name={[subField.name, 'day']}
                          // rules={[{ required: true, message: 'Day is required' }]}
                          rules={[
                            { required: true, message: 'Day is required' },
                            { type: 'number', min: 1, max: 7, message: 'Days must be between 1 and 7' },
                          ]}
                        >
                          <InputNumber addonAfter={<div>days</div>} placeholder="day" />
                        </Form.Item>
                        <Form.Item
                          noStyle
                          name={[subField.name, 'price']}
                          // rules={[{ required: true, message: 'Price is required' }]}
                          rules={[
                            { required: true, message: 'Price is required' },
                            { type: 'number', min: 10000, max: 50000000, message: 'Price must be between 10,000 and 50,000,000' },
                          ]}
                        >
                          <InputNumber addonAfter={<div> vnđ</div>} placeholder="price" />
                        </Form.Item>

                        {subFields.length > 1 && (
                          <CloseOutlined
                            onClick={() => {
                              subOpt.remove(subField.name);
                            }}
                          />
                        )}
                      </Space>
                    ))}
                  </div>
                  <div style={{ marginTop: 10, display: 'flex', justifyContent: 'end' }}>
                    {subFields.length < 3 && (
                      <Button
                        className="custom-button"
                        type="dashed"
                        onClick={() => subOpt.add()}
                        block
                      >
                        + Add more day
                      </Button>
                    )}
                  </div>
                  <Form.ErrorList errors={errors} />
                </div>
              )}
            </Form.List>
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
