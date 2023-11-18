import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Typography } from 'antd';
import DataService from '@/app/utils/dataService';
import updateSummary from './updateSummaryService';
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
const SummaryForm = ({ cvId, onCreated, data }) => {
  const [form] = Form.useForm();
  console.log('SummaryForm::data: ', data);
  useEffect(() => {
    if (data) {
      console.log('data.summary: ', data.summary);
      const sum = { summary: data.summary };
      form.setFieldsValue(sum);
    }
  }, [data, form]);

  const handleSubmit = async values => {
    try {
      await updateSummary(1, cvId, values);
      // onCreated();
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
    <div className="" style={{ width: '912.05px' }}>
      <Form onFinish={handleSubmit} form={form} layout="vertical" autoComplete="off">
        <Form.Item
          name="summary"
          label={
            <label
              style={{}}
              className="!leading-[15px] !mb-3 label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600"
              for="summary-section-form-0"
            >
              <div className="flex gap-2 items-center">
                <span>
                  Write a professional <strong>summary</strong>
                </span>
              </div>
              <div id="summary-section-form-0-portal-root" />
            </label>
          }
        >
          <textarea
            className="inputEl undefined src-components-Form-Field--Es8ORQL2ofo= "
            id="summary-section-form-0"
            aria-label="Write a professional **summary**"
            rows={3}
            placeholder="Experienced global early-stage executive with economics and mathematics degree from the University of Wisconsin. Passion for building inspiring companies people love through industry-leading design, development, branding, and making big bets."
            name="summary"
            defaultValue="A production professional with experience creating solutions for the most demanding video content challenges.  I’m a proven successful collaborator with multi-disciplinary teams, artists and personalities."
            style={{
              background: 'white',
              height: 120,
              fontWeight: 400,
              overflow: 'hidden',
              resize: 'none',
            }}
            onChange={handleInputChange}
            onInput={handleTextareaInput}
            value={inputValue}
          />

          {/* <Input style={stylesInput} placeholder="Project Management Professional (PMP)" /> */}
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

        {/* <Button
          htmlType="submit"
          href=""
          data-size="large"
          data-theme="default"
          data-busy="false"
          className="summary-section button"
          id="summary-section-save-to-list"
        >
            SAVE SUMMARY INFO
        </Button> */}
      </Form>
    </div>
  );
};
export default SummaryForm;
