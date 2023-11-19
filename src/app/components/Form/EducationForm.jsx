import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Typography } from 'antd';
import { createEducation, updateEducation } from '@/app/resume/[id]/education/educationService';
import './customtext.css';

const EducationForm = ({ cvId, onEducationCreated, education }) => {
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false); // Add this state

  useEffect(() => {
    if (education) {
      form.setFieldsValue(education);
      setIsEditMode(true); // Set to edit mode if education prop is provided
    } else {
      form.resetFields();
      setIsEditMode(false); // Set to create mode if education prop is not provided
    }
  }, [education, form]);

  const handleSubmit = async values => {
    try {
      if (isEditMode) {
        await updateEducation(cvId, education.id, values);
        setIsEditMode(false); // Set to create mode after updating
        form.resetFields(); // Reset the form
      } else {
        await createEducation(cvId, values);
        form.resetFields();
      }
      onEducationCreated();
    } catch (error) {
      console.log('Submit EducationForm. Error:', error);
    }
  };

  const [inputValue, setInputValue] = useState(''); // State to track input value
  const handleInputChange = event => {
    const newValue = event.target.value;

    // Check if the newValue starts with a bullet point
    if (!newValue.startsWith('• ')) {
      setInputValue(`• ${newValue}`);
      form.setFieldValue('description', `• ${newValue}`);
    } else {
      setInputValue(newValue);
      form.setFieldValue('description', newValue);
    }
  };

  return (
    <div className="" style={{ width: '775px' }}>
      <Form onFinish={handleSubmit} form={form} layout="vertical" autoComplete="off">
        <Form.Item
          name="degree"
          label={
            <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
              <div className="flex gap-2 items-center text-xs">
                What is your <strong>degree</strong>or other <strong>qualification</strong>and
                <strong>major</strong>?
              </div>
            </label>
          }
        >
          <Input
            style={{ marginTop: '-10px' }}
            className="inputEl education-section inputEl st-current"
            placeholder="Software Engineer"
          />
        </Form.Item>
        <Form.Item
          name="collegeName"
          label={
            <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
              <div className="flex gap-2 items-center text-xs">
                <strong>WHERE</strong> DID YOU EARN YOUR DEGREE/QUALIFICATION?
              </div>
            </label>
          }
        >
          <Input
            style={{ marginTop: '-10px' }}
            className="inputEl education-section inputEl st-current"
            placeholder="FPT University, Thu Duc"
          />
        </Form.Item>
        <Form.Item
          name="location"
          label={
            <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
              <div className="flex gap-2 items-center text-xs">
                <strong>WHERE</strong> IS THE INSTITUTION LOCATED?
              </div>
            </label>
          }
        >
          <Input
            style={{ marginTop: '-10px' }}
            className="inputEl education-section inputEl st-current"
            placeholder="Thu Duc, HCM"
          />
        </Form.Item>
        <Form.Item
          name="endYear"
          label={
            <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
              <div className="flex gap-2 items-center text-xs">
                <strong>WHEN</strong> DID YOU EARN YOUR DEGREE/QUALIFICATION?
              </div>
            </label>
          }
        >
          <Input
            style={{ marginTop: '-10px' }}
            className="inputEl education-section inputEl st-current"
            placeholder="2023"
          />
        </Form.Item>
        <Form.Item
          name="minor"
          label={
            <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
              <div className="flex gap-2 items-center text-xs">
                DID YOU <strong>MINOR</strong> IN ANYTHING?
              </div>
            </label>
          }
        >
          <Input
            style={{ marginTop: '-10px' }}
            className="inputEl education-section inputEl st-current"
            placeholder="SE"
          />{' '}
        </Form.Item>
        <Form.Item
          name="gpa"
          label={
            <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
              <div className="flex gap-2 items-center text-xs">
                <strong>GPA</strong> (IF APPLICABLE)
              </div>
            </label>
          }
        >
          <Input
            style={{ marginTop: '-10px' }}
            className="inputEl education-section inputEl st-current"
            placeholder="3.82"
          />{' '}
        </Form.Item>
        <Form.Item
          name="description"
          label={
            <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
              <div className="flex gap-2 items-center text-xs">
                OPEN FIELD FOR ADDITIONAL INFORMATION
              </div>
            </label>
          }
        >
          <Input
            style={{ marginTop: '-10px' }}
            className="inputEl education-section inputEl st-current"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Awarded full schoolarship for 4 years due to grades."
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
            {isEditMode ? 'UPDATE EDUCATION' : 'SAVE TO EDUCATION LIST'}
          </div>
        </Button>
      </Form>
    </div>
  );
};
export default EducationForm;
