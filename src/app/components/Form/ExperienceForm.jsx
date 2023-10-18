import React, { useEffect, useState } from 'react';
import { createExperience, updateExperience } from '@/app/resume/[id]/experience/experienceService';
import { Button, DatePicker, Form, Input, InputNumber, Typography } from 'antd';
import moment from 'moment';

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
  const handleDescriptionChange = e => {
    const bullet = '• ';
    const inputValue = e.target.value;
    // Check if the input value starts with a bullet point, and if not, add it.
    if (!inputValue.startsWith(bullet)) {
      form.setFieldsValue({ description: bullet + inputValue });
    }
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
          <Input style={stylesInput} placeholder="Marketing Analyst" />
        </Form.Item>
        <Form.Item name="companyName" label="FOR WHICH COMPANY DID YOU WORK?">
          <Input style={stylesInput} placeholder="Google" />
        </Form.Item>

        <Form.Item name="startDate" hidden>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name="endDate" hidden>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name="range-picker" label="HOW LONG WERE YOU WITH THE COMPANY?">
          <RangePicker style={stylesInput} picker="month" onChange={handleDateChange} />
        </Form.Item>

        <Form.Item name="location" label="WHERE WAS THE COMPANY LOCATED?">
          <Input style={stylesInput} placeholder="NewYork, NY" />
        </Form.Item>
        <Form.Item name="description" label="WHAT DID YOU DO AT THE COMPANY?">
          <Input style={stylesInput} placeholder="• Orgi..." onInput={handleDescriptionChange} />
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
            {isEditMode ? 'UPDATE ' : 'SAVE TO EXPERIENCE LIST'}
          </div>
        </Button>
      </Form>
    </div>
  );
};
export default ExperienceForm;
