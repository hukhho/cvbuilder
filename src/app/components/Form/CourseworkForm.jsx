import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Typography } from 'antd';
import DataService from '@/app/utils/dataService';

import './customtext.css';

const stylesInput = {
  width: '769.22px',
  height: '56.19px',
  padding: '17.30px 15.50px 15.89px',
  backgroundColor: 'white',
  borderRadius: '4px',
  border: '2px solid #e5e5e5',
  fontSize: '16px',
  fontWeight: '600',
  fontFamily: 'Source Sans Pro, sans-serif',
};
const CourseworkForm = ({ cvId, onCreated, data }) => {
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false); // Add this state

  const dataService = new DataService('source-works', cvId);

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
      setIsEditMode(true); // Set to edit mode if education prop is provided
    } else {
      form.resetFields();
      setIsEditMode(false); // Set to create mode if education prop is not provided
    }
  }, [data, form]);

  const handleSubmit = async values => {
    try {
      if (isEditMode) {
        await dataService.update(data.id, values);
        setIsEditMode(false); // Set to create mode after updating
        form.resetFields(); // Reset the form
      } else {
        await dataService.create(values);
        form.resetFields();
      }
      onCreated();
    } catch (error) {
      console.log('Submit. Error:', error);
    }
  };

  return (
    <div className="w-2/3 ">
      <Form onFinish={handleSubmit} form={form} layout="vertical" autoComplete="off">
        <Form.Item
          name="name"
          label={
            <label style={{}}>
              <span className="custom-text whitespace-nowrap">
                WHAT WAS THE COURSE <strong>NAME</strong>?
              </span>
            </label>
          }
        >
          <Input style={stylesInput} placeholder="Introduction to Computer Systems" />
        </Form.Item>
        <Form.Item
          name="courseLocation"
          label={
            <label style={{}}>
              <span className="custom-text whitespace-nowrap">
                <strong>WHERE</strong> DID YOU TAKE THE COURSE?
              </span>
            </label>
          }
        >
          <Input style={stylesInput} placeholder="University of Wisconsin, Madison" />
        </Form.Item>
        <Form.Item
          name="endYear"
          label={
            <label style={{}}>
              <span className="custom-text whitespace-nowrap">
                <strong>WHEN</strong> DID YOU TAKE THE COURSE?
              </span>
            </label>
          }
        >
          <Input style={stylesInput} placeholder="2023" />
        </Form.Item>
        <Form.Item
          name="description"
          label={
            <label style={{}}>
              <span className="custom-text whitespace-nowrap">
                HOW WAS THAT SKILL <strong>APPLIED</strong>?
              </span>
            </label>
          }
        >
          <Input style={stylesInput} placeholder="Teamwork" />
        </Form.Item>

        <Form.Item
          name="skill"
          label={
            <label style={{}}>
              <span className="custom-text whitespace-nowrap">
                WHAT <strong>SKILL</strong> DID YOU USE?
              </span>
            </label>
          }
        >
          <Input
            style={stylesInput}
            placeholder="• Coordinating on code with a small group of people."
          />
        </Form.Item>

        <Button
          htmlType="submit"
          className="form-button w-full w-[769.22px] h-[47.86px] pl-[313.83px] pr-[315.39px] pt-[17.26px] pb-[17.60px] bg-indigo-500 rounded-md justify-center items-center inline-flex hover:text-white"
          style={{
            width: '769.22px',
            height: '47.86px',
            backgroundColor: 'rgb(77, 112, 235)',
            color: 'white',
          }}
        >
          <div className="hover:text-white text-center text-white text-opacity-80 text-xs font-bold font-['Source Sans Pro'] uppercase leading-3 whitespace-nowrap">
            {isEditMode ? 'UPDATE ' : 'SAVE TO COURSEWORK LIST'}
          </div>
        </Button>
      </Form>
    </div>
  );
};
export default CourseworkForm;
