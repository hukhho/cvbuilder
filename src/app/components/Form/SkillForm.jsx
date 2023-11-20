import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Input, InputNumber, Typography } from 'antd';
import DataService from '@/app/utils/dataService';

import './customtext.css';

const SkillsForm = ({ cvId, onCreated, data }) => {
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false); // Add this state
  const [inputValue, setInputValue] = useState();

  const dataService = new DataService('skills', cvId);

  const textAreaRef = useRef(null);
  const resizeTextArea = () => {
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };
  const resizeTextAreaInit = () => {
    textAreaRef.current.style.height = '200px';
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };
  useEffect(() => {
    resizeTextAreaInit();
    resizeTextArea();
  }, [inputValue]);

  useEffect(() => {
    if (data) {
      resizeTextAreaInit();
      form.setFieldsValue(data);
      setIsEditMode(true); // Set to edit mode if education prop is provided
      setInputValue(data.description);
    } else {
      form.resetFields();
      setInputValue('');
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
  const handleInputChange = event => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };
  return (
    <div className="" style={{ minWidth: '852.13px' }}>
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
            ref={textAreaRef}
            style={{ height: 'auto', overflow: 'hidden', resize: 'none' }}
            onChange={handleInputChange}
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
          type="submit"
          onSubmit={handleSubmit}
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
