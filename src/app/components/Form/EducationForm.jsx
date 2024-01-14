import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Typography } from 'antd';
import { createEducation, updateEducation } from '@/app/resume/[id]/education/educationService';
import './customtext.css';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import { format, parse, startOfMonth } from 'date-fns';

const EducationForm = ({ cvId, onEducationCreated, education }) => {
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false); // Add this state
  console.log('EducationForm.education', education);
  useEffect(() => {
    if (education) {
      console.log('EducationForm.education.minor', education.minor);
      form.setFieldsValue(education);
      setIsEditMode(true); // Set to edit mode if education prop is provided
    } else {
      form.resetFields();
      setIsEditMode(false); // Set to create mode if education prop is not provided
    }
  }, [education, form]);

  const handleSubmit = async values => {
    try {
      if (values.gpa) {
        const floatValue = parseFloat(values.gpa);

        // Check for a valid number and within the specified range
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(floatValue) || floatValue < 0 || floatValue > 4) {
          // eslint-disable-next-line prefer-promise-reject-errors
          values.gpa = floatValue;
        }
      } else {
        values.gpa = null;
      }
    } catch (err) {
      console.log('error');
    }
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

  // const [inputValue, setInputValue] = useState(''); // State to track input value
  // const handleInputChange = event => {
  //   const newValue = event.target.value;

  //   // Check if the newValue starts with a bullet point
  //   if (!newValue.startsWith('• ')) {
  //     setInputValue(`• ${newValue}`);
  //     form.setFieldValue('description', `• ${newValue}`);
  //   } else {
  //     setInputValue(newValue);
  //     form.setFieldValue('description', newValue);
  //   }
  // };

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = event => {
    const newValue = event.target.value;

    // Check if the newValue starts with a bullet point
    const formattedValue = newValue.startsWith('• ') ? newValue : `• ${newValue}`;

    // Check if the formattedValue is different from the current inputValue
    if (formattedValue !== inputValue) {
      setInputValue(formattedValue);
    }
  };

  useEffect(() => {
    form.setFieldValue('description', inputValue);
  }, [inputValue, form]);

  const endYearFromForm = form?.getFieldValue('endYear');
  const selectedDate = Number.isInteger(endYearFromForm) ? new Date(endYearFromForm, 0, 1) : null;
  const currentYear = new Date().getFullYear();
  const minDate = new Date(currentYear - 100, 0, 1);
  const maxDate = new Date(currentYear, 11, 31); // Assuming you want the maximum date to be the end of the current year

  // Custom function to validate the GPA range
  const validateGPA = (rule, value) => {
    // Skip validation if the value is empty or undefined
    if (!value) {
      return Promise.resolve();
    }

    const floatValue = parseFloat(value);

    // Check for a valid number and within the specified range
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(floatValue) || floatValue < 0 || floatValue > 4) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('GPA must be a number between 0 and 4');
    }

    return Promise.resolve();
  };

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
          name="degree"
          rules={[{ required: true }]}
          label={
            <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
              <div className="flex gap-2 items-center text-xs">
                What is your <strong>degree</strong>or other <strong>qualification</strong>and
                <strong>major</strong>? *
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
          {/* <DatePicker
            dateFormat="yyyy"
            showYearPicker
            selected={format(2024, 'yyyy')}
            onChange={date => form.setFieldValue('endYear', format(date, 'yyyy'))}
          /> */}
          {/* <DatePicker
            dateFormat="yyyy"
            showYearPicker
            selected={new Date(2024, 0, 1)} // Month is zero-based, so 0 corresponds to January
            onChange={date => form.setFieldValue('endYear', format(date, 'yyyy'))}
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
          {/* <Input
            style={{ marginTop: '-10px' }}
            className="inputEl education-section inputEl st-current"
            placeholder="2023"
          /> */}
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
          />
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
          rules={[
            {
              validator: validateGPA,
            },
          ]}
        >
          <Input
            style={{ marginTop: '-10px' }}
            className="inputEl education-section inputEl st-current"
            placeholder="3.2"
          />
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
