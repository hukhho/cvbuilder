import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, notification, Typography } from 'antd';
import { createEducation, updateEducation } from '@/app/resume/[id]/education/educationService';
import './customtext.css';
import Certification from '@/app/resume/[id]/certification/page';
import {
  createCertification,
  updateCertification,
} from '@/app/resume/[id]/certification/certificationService';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import { format, parse, startOfMonth } from 'date-fns';

const CertificationForm = ({ cvId, onEducationCreated, education }) => {
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSetData, setIsSetData] = useState(false);
  useEffect(() => {
    setIsSetData(true);
    if (education) {
      console.log('setFieldsValue', education);
      form.setFieldsValue(education);
      setIsEditMode(true); // Set to edit mode if education prop is provided
    } else if (!isSetData && !education) {
      console.log('resetFields ', isSetData);
      form.resetFields();
      setIsEditMode(false); // Set to create mode if education prop is not provided
    }
  }, [education, form]);

  const handleSubmit = async values => {
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await updateCertification(cvId, education.id, values);
        setIsEditMode(false); // Set to create mode after updating
        form.resetFields(); // Reset the form
        notification.success({
          message: 'Save changed',
        });
      } else {
        await createCertification(cvId, values);
        form.resetFields();
        notification.success({
          message: 'Save changed',
        });
      }
      onEducationCreated();
    } catch (error) {
      notification.error({
        message: 'Error during saving',
      });
      console.log('Submit EducationForm. Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // const [inputValue, setInputValue] = useState(''); // State to track input value
  // const handleInputChange = event => {
  //   const newValue = event.target.value;

  //   // Check if the newValue starts with a bullet point
  //   if (!newValue.startsWith('• ')) {
  //     setInputValue(`• ${newValue}`);
  //     form.setFieldValue('certificateRelevance', `• ${newValue}`);
  //   } else {
  //     setInputValue(newValue);
  //     form.setFieldValue('certificateRelevance', newValue);
  //   }
  // };
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = event => {
    const newValue = event.target.value;

    // Check if the newValue is not empty or contains only spaces
    if (newValue.trim() !== '') {
      // Add bullet point only if the newValue is not starting with a bullet point
      setInputValue(newValue.startsWith('• ') ? newValue : `• ${newValue}`);
      form.setFieldValue(
        'certificateRelevance',
        newValue.startsWith('• ') ? newValue : `• ${newValue}`,
      );
    } else {
      // If input is empty or contains only spaces, set • as the value
      setInputValue('');
      form.setFieldValue('certificateRelevance', '');
    }
  };

  const endYearFromForm = form?.getFieldValue('endYear');
  const selectedDate = Number.isInteger(endYearFromForm) ? new Date(endYearFromForm, 0, 1) : null;
  const currentYear = new Date().getFullYear();
  const minDate = new Date(currentYear - 100, 0, 1);
  const maxDate = new Date(currentYear, 11, 31); // Assuming you want the maximum date to be the end of the current year

  return (
    <div className="" style={{ width: '100%' }}>
      <Form
        onFinish={handleSubmit}
        form={form}
        layout="vertical"
        autoComplete="off"
        requiredMark={false}
      >
        <Form.Item style={{ display: 'none' }} name="theOrder">
          <Input hidden />
        </Form.Item>
        <Form.Item style={{ display: 'none' }} name="isDisplay">
          <Input hidden />
        </Form.Item>
        <Form.Item style={{ display: 'none' }} name="status">
          <Input hidden />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[{ required: true }]}
          label={
            <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
              <div className="flex gap-2 items-center text-xs">
                WHAT WAS THE CERTIFICATE <strong>NAME</strong>? *
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
          {/* <Input
            style={{ marginTop: '-10px' }}
            className="inputEl education-section inputEl st-current"
            placeholder="2023"
          /> */}
          <DatePicker
            dateFormat="yyyy"
            showYearPicker
            placeholderText={format(new Date(), 'yyyy')}
            selected={selectedDate}
            onChange={date => form.setFieldValue('endYear', format(date, 'yyyy'))}
            minDate={minDate}
            maxDate={maxDate}
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
        <Form.Item>
          <div className="form-submit-wrapper">
            <button
              style={{ width: '100%', height: '50px' }}
              href=""
              data-size="large"
              data-theme="default"
              data-busy="false"
              className='contact-section form[data-theme="basic"] button'
              id="contact-section-save-to-list"
              type="submit"
              disabled={isSubmitting}
            >
              SAVE TO CERTIFICATION LIST{' '}
            </button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
export default CertificationForm;
