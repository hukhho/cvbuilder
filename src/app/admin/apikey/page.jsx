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
  checkApiKey,
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
      setLoading(true)
      console.log('handleSubmit: ', values);
      const result = await updateOpenAiKey(values);
      notification.success({
        message: "Save changes",
      });
      // openNotification('bottomRight', `Save changes`);
    } catch (error) {
      // if (error?.response?.data?.error) {
      //   openNotification('bottomRight', `Error`);
      // } else if (error?.response?.data) {
      //   openNotification('bottomRight', `Error ${error?.response?.data}`);
      // } else {
      //   openNotification('bottomRight', `Error ${error}`);
      // }
      notification.error({
        message: `Error ${error?.response?.data?.error || error?.response?.data || error}`
      })
    } finally {
      setLoading(false)
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true)
      console.log('fetchData getReviewRequestsByCandiate');
      const fetchedDataFromAPI = await getSub();
      if (fetchedDataFromAPI) {
        form.setFieldsValue(fetchedDataFromAPI);
      }
    } catch (error) {
      console.log('getReviewRequestsByCandiate:Error: ', error);
    } finally {
      setLoading(false)
    }

  };
  const handleCheck = async () => {
    try {
      setLoading(true)
      const fetchedDataFromAPI = await checkApiKey();
      console.log("fetchedDataFromAPI",fetchedDataFromAPI)
      if (fetchedDataFromAPI === true) {
        notification.success({
          message: "Key is valid",
        });
      } else {
        notification.error({
          message: "Key is invalid",
        });
      } 
    
    } catch (error) {
      notification.error({
        message: "Some thing went wrong",
      });
      console.log('getReviewRequestsByCandiate:Error: ', error);
    } finally {
      setLoading(false)
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
                        <div className="flex form-submit-wrapper justify-between	">
                          <button
                            style={{ width: '300px', height: '35px' }}
                            href=""
                            data-size="large"
                            data-theme="default"
                            data-busy="false"
                            className='contact-section form[data-theme="basic"] button'
                            id="contact-section-save-to-list"
                            type="submit"
                            disabled={loading}

                          >
                            Save
                          </button>

                          <button
                            style={{ width: '300px', height: '35px', backgroundColor: '#65B741' }}
                            href=""
                            data-size="large"
                            data-theme="default"
                            data-busy="false"
                            className='contact-section form[data-theme="basic"] button'
                            id="contact-section-save-to-list"
                            type="button"
                            disabled={loading}
                            onClick={() => handleCheck()}
                          >
                            Check key status
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
