import React, { use, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, InputNumber, Typography } from 'antd';
import DataService from '@/app/utils/dataService';
import updateSummary from './updateSummaryService';
import './customtext.css';

const SummaryForm = ({ cvId, onCreated, data, isAiWrite, aiContent, onSubmit }) => {
  const [form] = Form.useForm();
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState();
  const [placeHolder, setPlaceHolder] = useState('');
  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  console.log('SummaryForm::data: ', data);
  console.log('isAiWrite: ', isAiWrite);
  console.log('aiContent: ', aiContent);
  useEffect(() => {
    if (data) {
      console.log('data.summary: ', data.summary);
      const sum = { summary: data.summary };
      // form.setFieldsValue(sum);
      setInputValue(data.summary);
    }
    if (isAiWrite === true) {
      setInputValue('');
      console.log('inputValue: ', inputValue);
    }
  }, [data, isAiWrite, form]);

  const handleSubmit = async values => {
    try {
      values.summary = inputValue;
      if (isAiWrite) {
        values.summary = aiContent;
      }
      console.log('values: ', values);
      await updateSummary(cvId, values);
      onSubmit();
    } catch (error) {
      console.log('Submit. Error:', error);
    }
  };

  const handleTextareaInput = event => {
    const textarea = event.target;
    textarea.style.height = 'auto'; // Reset the height to auto to recalculate the scroll height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height
  };

  return (
    <div className="" style={{ width: '850.05px' }}>
      <Form onFinish={handleSubmit} form={form} layout="vertical" autoComplete="off">
        <Form.Item
          name="summary"
          label={
            <lable style={{ display: 'none' }}>d</lable>
            // <label
            //   style={{ fontSize: 12 }}
            //   className="!leading-[15px] !mb-3 label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600"
            //   for="summary-section-form-0"
            // >
            //   <div className="flex gap-2 items-center">
            //     <span>
            //       Write a professional <strong>summary</strong>
            //     </span>
            //   </div>
            //   <div id="summary-section-form-0-portal-root" />
            // </label>
          }
        >
          <div style={{ position: 'relative', display: 'block', zIndex: 0, textAlign: 'left' }}>
            <div className="summary-section src-components-GeneratorForm--yE-M0KIYLqM= src-components-GeneratorForm--fATEgyCKtc4=   src-components-Form-Textarea--33tYOpt2RMw= ">
              <label
                className="!leading-[15px] !mb-3 label flex flex-col justify-between lg:flex-row lg:items-end uppercase text-gray-600"
                htmlFor="summary-section-form-0"
              >
                <div className="flex gap-2 items-center">
                  <span style={{ fontSize: 12 }}>
                    Write a professional <strong>summary</strong>
                  </span>
                </div>
                <div id="summary-section-form-0-portal-root">
                  <div className="ai-summary">
                    <span className="autocompleteText">{aiContent}</span>
                  </div>
                </div>
              </label>
              <div className="relative">
                {/* <textarea
                  className="inputEl undefined src-components-Form-Field--Es8ORQL2ofo= "
                  id="summary-section-form-0"
                  aria-label="Write a professional **summary**"
                  rows={3}
                  placeholder=""
                  name="summary"
                  style={{
                    background: 'transparent',
                    height: 120,
                    fontWeight: 400,
                    overflow: 'hidden',
                    resize: 'none',
                  }}
                /> */}
                <textarea
                  className="inputEl undefined src-components-Form-Field--Es8ORQL2ofo= "
                  id="summary-section-form-0"
                  aria-label="Write a professional **summary**"
                  rows={3}
                  disabled={isAiWrite}
                  placeholder={`${
                    isAiWrite
                      ? ''
                      : 'Experienced global early-stage executive with economics and mathematics degree from the University of Wisconsin. Passion for building inspiring companies people love through industry-leading design, development, branding, and making big bets.'
                  } `}
                  name="summary"
                  style={{
                    background: 'transparent',
                    height: 385,
                    fontWeight: 400,
                    overflow: 'hidden',
                    resize: 'none',
                  }}
                  ref={inputRef}
                  onChange={handleInputChange}
                  onInput={handleTextareaInput}
                  value={inputValue}
                />
              </div>
            </div>
          </div>

          <Input type="hidden" value={inputValue} />
        </Form.Item>
        <div style={{}}>
          <button
            href=""
            data-size="large"
            data-theme="default"
            data-busy="false"
            className="summary-section button"
            id="summary-section-save-to-list"
            type="submit"
          >
            Save summary info
          </button>
        </div>
      </Form>
    </div>
  );
};
export default SummaryForm;
