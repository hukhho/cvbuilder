/* eslint-disable */

'use client';

import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Upload,
  notification,
} from 'antd';
import UserLayout from '@/app/components/Layout/UserLayout';
import UserHeader from '@/app/components/UserHeader';
import UserHeaderReview from '@/app/components/UserHeaderReview';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit } from '@fortawesome/free-solid-svg-icons';

import { getResumes } from '@/app/utils/indexService';

import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { text } from '@fortawesome/fontawesome-svg-core';
import { getReviewRequestsByCandiate } from '@/app/review/new/reviewService';
import HeaderHR from '@/app/components/HeaderHR';
import Link from 'next/link';
import {
  banJob,
  getEvaluatesConfig,
  getPostingJobs,
  getSub,
  getUsers,
  getWithdrawRequests,
  saveScore,
  saveSub,
  unbanJob,
} from '../adminServices';
import AdminLayout from '@/app/components/Layout/AdminLayout';
import moment from 'moment';
import { updateExpertConfig, updateOpenAiKey } from '@/app/expert/expertServices';

const { Title } = Typography;

const ApiKey = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message, type = 'info') => {
    const notificationTypes = {
      info: api.info,
      success: api.success,
      warning: api.warning,
      error: api.error,
    };

    const notificationFunc = notificationTypes[type] || api.info;

    notificationFunc({
      message: 'Notification',
      description: message,
      placement,
    });
  };

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async values => {
    try {
      console.log('handleSubmit: ', values);
      const result = await updateOpenAiKey(values);

      openNotification('bottomRight', `Save changes`);
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

  const fetchData = async () => {
    try {
      console.log('fetchData getReviewRequestsByCandiate');
      const fetchedDataFromAPI = await getSub();
      if (fetchedDataFromAPI) {
        form.setFieldsValue(fetchedDataFromAPI);
      }
    } catch (error) {
      console.log('getReviewRequestsByCandiate:Error: ', error);
    }
  };

  useEffect(() => {
    console.log('useEffect');

    fetchData();
  }, []);

  return (
    <ConfigProvider>
      <AdminLayout
        selected="7"
        userHeader={<></>}
        content={
          <div className="container mt-16" style={{ width: '80%' }}>
            {contextHolder}
            <div style={{ textAlign: 'left' }}>
              {/* <Title level={5}>CV Review Table</Title> */}
            </div>
            <div></div>
            <div className="!p-0 mb-5 mt-5 card">
              <div className="">
                <div className="" style={{ width: '700px' }}>
                  {contextHolder}
                  <Card className="mt-16">
                    <Title>Open API Key</Title>
                    <p>Set up your Open AI key</p>
                    <Form onFinish={handleSubmit} form={form} layout="vertical" autoComplete="off">
                      <Form.Item
                        name="apiKey"
                        style={{
                          marginTop: '10px',
                        }}
                        label={
                          <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
                            <div className="flex gap-2 items-center text-xs">
                              <span>
                                <strong>OpenAI key</strong>
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
              </div>
            </div>
          </div>
        }
      />
    </ConfigProvider>
  );
};

export default ApiKey;
