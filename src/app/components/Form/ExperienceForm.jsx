import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Typography } from 'antd';
import moment from 'moment';
import { createExperience, updateExperience } from '@/app/resume/[id]/experience/experienceService';

const { RangePicker } = DatePicker;

const ExperienceForm = ({ cvId, onExperienceCreated, experience }) => {
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false); // Add this state

  useEffect(() => {
    if (experience) {
      // Convert the startDate and endDate to moment objects
      const startDateMoment = moment(experience.startDate);
      const endDateMoment = moment(experience.endDate);

      // Set the form values
      form.setFieldsValue({
        ...experience,
        'range-picker': [startDateMoment, endDateMoment],
      });
      // form.setFieldsValue(experience);
      setIsEditMode(true); // Set to edit mode if experience prop is provided
    } else {
      form.resetFields();
      setIsEditMode(false); // Set to create mode if experience prop is not provided
    }
  }, [experience, form]);

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
        await updateExperience(cvId, experience.id, values);
        setIsEditMode(false);
        form.resetFields();
      } else {
        await createExperience(cvId, values);
        form.resetFields();
      }
      onExperienceCreated();
    } catch (error) {
      console.log('Submit ExperienceForm. Error:', error);
    }
  };

  return (
    <div className="w-2/3 ">
      <Form onFinish={handleSubmit} form={form} layout="vertical" autoComplete="off">
        <Form.Item name="role" label="WHAT WAS YOUR ROLE AT THE COMPANY?">
          <Input style={{}} placeholder="Marketing Analyst" />
        </Form.Item>
        <Form.Item name="companyName" label="FOR WHICH COMPANY DID YOU WORK?">
          <Input style={{}} placeholder="Google" />
        </Form.Item>

        <Form.Item name="startDate" hidden>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name="endDate" hidden>
          <Input type="hidden" />
        </Form.Item>

        <Form.Item name="range-picker" label="HOW LONG WERE YOU WITH THE COMPANY?">
          <RangePicker style={{}} picker="month" onChange={handleDateChange} />
        </Form.Item>

        <Form.Item name="location" label="WHERE WAS THE COMPANY LOCATED?">
          <Input style={{}} placeholder="NewYork, NY" />
        </Form.Item>
        <Form.Item name="description" label="WHAT DID YOU DO AT THE COMPANY?">
          <Input style={{}} placeholder="• Orgi..." />
        </Form.Item>

        <Button
          htmlType="submit"
          className="form-button w-full"
          style={{ backgroundColor: 'rgb(77, 112, 235)', color: 'white' }}
        >
          {isEditMode ? 'UPDATE EXPERIENCE' : 'SAVE TO EXPERIENCE LIST'}
        </Button>
      </Form>
    </div>
  );
};
export default ExperienceForm;
