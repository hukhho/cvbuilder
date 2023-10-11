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

  return (
    <div className="w-2/3 ">
      <Form onFinish={handleSubmit} form={form} layout="vertical" autoComplete="off">
        <Form.Item
          name="summary"
          label={
            <label style={{}}>
              <span className="custom-text whitespace-nowrap">
                WRITE A PROFESSIONAL <strong>SUMMARY</strong>
              </span>
            </label>
          }
        >
          <Input style={stylesInput} placeholder="Project Management Professional (PMP)" />
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
            SAVE SUMMARY INFO
          </div>
        </Button>
      </Form>
    </div>
  );
};
export default SummaryForm;
