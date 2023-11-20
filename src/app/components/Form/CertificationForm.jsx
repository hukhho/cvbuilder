import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Typography } from 'antd';
import { createEducation, updateEducation } from '@/app/resume/[id]/education/educationService';
import './customtext.css';
import Certification from '@/app/resume/[id]/certification/page';
import {
  createCertification,
  updateCertification,
} from '@/app/resume/[id]/certification/certificationService';

const CertificationForm = ({ cvId, onEducationCreated, education }) => {
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false); // Add this state
  console.log('CertificationForm: ', education);

  useEffect(() => {
    if (education) {
      form.setFieldsValue(education);
      console.log('set education: ', education, ' to form');
      setIsEditMode(true); // Set to edit mode if education prop is provided
    } else {
      form.resetFields();
      setIsEditMode(false); // Set to create mode if education prop is not provided
    }
  }, [education, form]);

  const handleSubmit = async values => {
    try {
      if (isEditMode) {
        await updateCertification(cvId, education.id, values);
        setIsEditMode(false); // Set to create mode after updating
        form.resetFields(); // Reset the form
      } else {
        await createCertification(cvId, values);
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
      form.setFieldValue('certificateRelevance', `• ${newValue}`);
    } else {
      setInputValue(newValue);
      form.setFieldValue('certificateRelevance', newValue);
    }
  };

  return (
    <div className="" style={{ width: '775px' }}>
      <Form
        onFinish={handleSubmit}
        form={form}
        layout="vertical"
        autoComplete="off"
        requiredMark={false}
      >
        <Form.Item
          name="name"
          rules={[{ required: true }]}
          label={
            <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
              <div className="flex gap-2 items-center text-xs">
                WHAT WAS THE CERTIFICATE <strong>NAME</strong>?
              </div>
            </label>
          }
        >
          <Input
            style={{ marginTop: '-10px' }}
            className="inputEl education-section inputEl st-current"
            placeholder="Project Management Professional (PMP)"
          />
        </Form.Item>
        <Form.Item
          name="certificateSource"
          label={
            <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
              <div className="flex gap-2 items-center text-xs">
                <strong>WHERE</strong> DID YOU GET THE CERTIFICATE?
              </div>
            </label>
          }
        >
          <Input
            style={{ marginTop: '-10px' }}
            className="inputEl education-section inputEl st-current"
            placeholder="Project Management Institute"
          />
        </Form.Item>
        <Form.Item
          name="endYear"
          label={
            <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
              <div className="flex gap-2 items-center text-xs">
                <strong>WHEN</strong> DID YOU GET THE CERTIFICATE?
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
          name="certificateRelevance"
          label={
            <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
              <div className="flex gap-2 items-center text-xs">
                HOW IS THE CERTIFICATE <strong>RELEVANT</strong>?
              </div>
            </label>
          }
        >
          <Input
            style={{ marginTop: '-10px' }}
            className="inputEl education-section inputEl st-current"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="• Certified in a standardized and evolving set of project management principles."
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
export default CertificationForm;
