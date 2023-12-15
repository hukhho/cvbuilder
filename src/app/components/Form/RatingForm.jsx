import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  notification,
  Rate,
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
import { ratingComment } from '@/app/review/reviewServices';

const RatingForm = ({ onCreated, data, responseId }) => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message) => {
    api.info({
      message: 'Notification',
      description: message,
      placement,
    });
  };

  const [form] = Form.useForm();

  // useEffect(() => {
  //   console.log('ExpertForm data: ', data);

  //   if (data) {
  //     // const mockData = data
  //     // console.log('Form fields set with data:', data);
  //     // // Use mockData if no data is provided
  //     // const initialData = mockData;
  //     // console.log('initialData: ', initialData);
  //     form.setFieldsValue(data);
  //   }
  // }, [data, form]);

  const handleSubmit = async values => {
    try {
      console.log('handleSubmit: ', values);
      const result = await ratingComment(responseId, values);
      openNotification('bottomRight', `Comment success: ${result}`);
      onCreated();
    } catch (error) {
      try {
        openNotification('bottomRight', `Error: ${error.response.data}`);
        console.log('Submit. Error:', error);
      } catch (err) {
        console.log('Submit. Error:', err);
      }
    }
  };

  return (
    <div className="" style={{ width: '800px' }}>
      {contextHolder}
      <Card>
        <Form onFinish={handleSubmit} form={form} layout="vertical" autoComplete="off">
          <Form.Item
            name="score"
            label={
              <label className="mt-16 !leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
                <div className="flex gap-2 items-center text-xs">
                  <span>
                    <strong>Rating</strong>
                  </span>
                </div>
              </label>
            }
          >
            <Rate />
          </Form.Item>

          <Form.Item
            name="comment"
            label={
              <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
                <div className="flex gap-2 items-center text-xs">
                  <span>
                    <strong>Comment</strong>
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
              placeholder="Write a comment"
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

export default RatingForm;
