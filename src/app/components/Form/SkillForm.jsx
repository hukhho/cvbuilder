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
const SkillsForm = ({ cvId, onCreated, data }) => {
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false); // Add this state

  const dataService = new DataService('skills', cvId);

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
  const [inputValue, setInputValue] = useState();
  const handleInputChange = event => {
    setInputValue(event.target.value);
  };
  const handleTextareaInput = event => {
    const textarea = event.target;
    textarea.style.height = 'auto'; // Reset the height to auto to recalculate the scroll height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height
  };
  return (
    <div className="w-2/3" style={{ minWidth: '852.13px' }}>
      <Form onFinish={handleSubmit} form={form} layout="vertical" autoComplete="off">
        <Form.Item
          name="description"
          label={
            <label style={{}}>
              <span className="custom-text whitespace-nowrap">
                ENTER THE <strong>SKILLS</strong> YOU POSSESS
              </span>
            </label>
          }
        >
          <textarea
            className="inputEl undefined"
            id="skills-section-form-0"
            required
            aria-label="Enter the **skills** you possess"
            rows={1}
            placeholder="Front End: HTML, CSS, Javascript"
            name="skill"
            style={{ height: 'auto', overflow: 'hidden', resize: 'none' }}
            onChange={handleInputChange}
            onInput={handleTextareaInput}
            value={inputValue}
          />
          {/* <Input className="inputEl" placeholder="Project Management Professional (PMP)" /> */}
        </Form.Item>
        <button
          href=""
          data-size="large"
          data-theme="default"
          data-busy="false"
          className="skills-section form-submit button "
          id="skills-section-save-to-list"
          type=""
          on
        >
          Save to Skills list
        </button>
        {/* <Button
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
            {isEditMode ? 'UPDATE ' : 'SAVE TO SKILLS LIST'}
          </div>
        </Button> */}
      </Form>
    </div>
  );
};
export default SkillsForm;
