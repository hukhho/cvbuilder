import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Typography } from 'antd';
import DataService from '@/app/utils/dataService';
import moment from 'moment';

import './customtext.css';

const { RangePicker } = DatePicker;

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
const ProjectForm = ({ cvId, onCreated, data }) => {
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false); // Add this state

  const dataService = new DataService('projects', cvId);

  useEffect(() => {
    if (data) {
      //   // Convert the startDate and endDate to moment objects
      const startDateMoment = moment(data.startDate);
      const endDateMoment = moment(data.endDate);
      // Set the form values
      form.setFieldsValue({
        ...data,
        'range-picker': [startDateMoment, endDateMoment],
      });

      setIsEditMode(true); // Set to edit mode if education prop is provided
    } else {
      form.resetFields();
      setIsEditMode(false); // Set to create mode if education prop is not provided
    }
  }, [data, form]);

  const handleDateChange = (dates, dateStrings) => {
    const [startDate, endDate] = dates;
    form.setFieldsValue({
      startDate,
      endDate,
    });
  };
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
          name="title"
          label={
            <label style={{}}>
              <span className="custom-text whitespace-nowrap">
                GIVE YOUR PROJECT A <strong>TITLE</strong>
              </span>
            </label>
          }
        >
          <Input style={stylesInput} placeholder="Volunteer" />
        </Form.Item>
        <Form.Item
          name="organization"
          label={
            <label style={{}}>
              <span className="custom-text whitespace-nowrap">
                IN WHICH <strong>ORGANIZATION</strong> DID YOU DO YOUR PROJECT?
              </span>
            </label>
          }
        >
          <Input style={stylesInput} placeholder="Habitat for Humanity" />
        </Form.Item>
        <Form.Item name="startDate" hidden>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name="endDate" hidden>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item
          name="range-picker"
          label={
            <label style={{}}>
              <span className="custom-text whitespace-nowrap">
                <strong>WHEN</strong> DID YOU DO YOUR PROJECT?
              </span>
            </label>
          }
        >
          <RangePicker style={stylesInput} picker="month" onChange={handleDateChange} />
        </Form.Item>

        <Form.Item
          name="projectUrl"
          label={
            <label style={{}}>
              <span className="custom-text whitespace-nowrap">
                PROJECT <strong>URL</strong>
              </span>
            </label>
          }
        >
          <Input style={stylesInput} placeholder="https://www.rezi.ai/" />
        </Form.Item>
        <Form.Item
          name="description"
          label={
            <label style={{}}>
              <span className="custom-text whitespace-nowrap">
                NOW DESCRIBE WHAT <strong>YOU DID</strong>
              </span>
            </label>
          }
        >
          <Input
            style={stylesInput}
            placeholder="•Volunteerd to help renovate a house and managed a team of 6."
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
            {isEditMode ? 'UPDATE ' : 'SAVE TO PROJECT LIST'}
          </div>
        </Button>
      </Form>
    </div>
  );
};
export default ProjectForm;
