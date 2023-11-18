/* eslint-disable no-shadow */

import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Select, Slider } from 'antd';

import DataService from '@/app/utils/dataService';
import { createCoverLetter } from './coverLetterService';
// import { convertToSliderValue, convertToSliderLabel } from './CreativitySlider';

import './customtext.css';
import './select.css';
import './coverletter.css';
import updateCoverLetter from './updateCoverLetterService';

const { TextArea } = Input;

const stylesInput = {
  width: '100%',
  height: '56.19px',
  padding: '17.30px 15.50px 15.89px',
  backgroundColor: 'white',
  borderRadius: '4px',
  border: '2px solid #e5e5e5',
  fontSize: '16px',
  fontWeight: '600',
  fontFamily: 'Source Sans Pro, sans-serif',
};

const CoverLetterFormV2 = ({ cvId, onCreated, data, listResumes }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    console.log('ContactForm data: ', data);

    if (data) {
      const mockData = {
        name: data.name,
      };

      console.log('Form fields set with data:', data);

      // Use mockData if no data is provided
      const initialData = mockData;
      console.log('initialData: ', initialData);
      // form.setFieldsValue(initialData);
    }
  }, [data, form]);

  const [content, setContent] = useState();
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isShowContent, setIsShowContent] = useState(false);

  const handleSubmit = async values => {
    try {
      const userId = 1;
      setLoading(true);
      const contentResponse = await createCoverLetter(userId, values);
      console.log('handleSubmit, values: ', values);
      console.log('content state: ', content);
      console.log('content.data.reply: ', contentResponse.reply);

      // form.resetFields();
      setContent(contentResponse.reply);
      if (contentResponse.reply) {
        setLoading(false);
        setIsShowContent(true);
      }
      console.log('content state: ', content);
      onCreated();
    } catch (error) {
      console.log('Submit. Error:', error);
    }
  };

  const handleSubmitSave = async values => {
    try {
      const userId = 1;
      setLoading(true);

      console.log('save values: ', values);

      const submitUpdate = {
        title: 'title',
        data: '2023-10-23T13:40:14.035Z',
        company: 'Google',
        description: content,
      };

      const response = await updateCoverLetter(userId, cvId, submitUpdate);

      console.log('handleSubmit, values: ', values);
      console.log('content state: ', content);
      console.log('content.data.reply: ', contentResponse.reply);
    } catch (error) {
      console.log('Submit. Error:', error);
    }
  };

  const marks = {
    0: 'Most standard',
    0.3: 'A bit creative',
    0.6: 'More creative',
  };
  const formatter = value => {
    if (value > 0 && value < 0.3) {
      return 'Most standard';
    }
    if (value < 0.6 >= 0.3) {
      return 'A bit creative';
    }
    if (value >= 0.6) {
      return 'More creative';
    }
    return `${value}`; // Default case
  };

  return (
    <div className="w-full">
      {!isShowContent && (
        <Form onFinish={handleSubmit} form={form} layout="vertical" autoComplete="off">
          {/* <Form.Item
            name="temperature"
            label={
              <label style={{}}>
                <span className="custom-text whitespace-nowrap">
                  <strong>Temperature</strong>
                </span>
              </label>
            }
          >
            <Input style={stylesInput} placeholder="0.2" />
          </Form.Item> */}
          {listResumes.length > 0 && (
            <Form.Item
              name="cvId"
              label={
                <label style={{}}>
                  <span className="custom-text whitespace-nowrap">
                    <strong>CHOOSE CV</strong>
                  </span>
                </label>
              }
            >
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="Select a resume"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option?.children?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0
                }
              >
                {listResumes.map(resume => (
                  <Select.Option key={resume.id} value={resume.id}>
                    {resume.id} - {resume.resumeName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
          {/* <Form.Item
            name="cvId"
            label={
              <label style={{}}>
                <span className="custom-text whitespace-nowrap">
                  <strong>CvId</strong>
                </span>
              </label>
            }
          >
            <Input style={stylesInput} placeholder="cvId" />
          </Form.Item> */}
          <Form.Item
            name="title"
            label={
              <label style={{}}>
                <span className="custom-text whitespace-nowrap">
                  <strong>JOB TITLE</strong>
                </span>
              </label>
            }
          >
            <Input style={stylesInput} placeholder="Software Engineer" />
          </Form.Item>

          <Form.Item
            name="company"
            label={
              <label style={{}}>
                <span className="custom-text whitespace-nowrap">
                  <strong>Company</strong>
                </span>
              </label>
            }
          >
            <Input style={stylesInput} placeholder="Google" />
          </Form.Item>

          {/* <Form.Item
            name="dear"
            label={
              <label style={{}}>
                <span className="custom-text whitespace-nowrap">
                  <strong>Dear</strong>
                </span>
              </label>
            }
          >
            <Input style={stylesInput} placeholder="Google" />
          </Form.Item>

          <Form.Item
            name="name"
            label={
              <label style={{}}>
                <span className="custom-text whitespace-nowrap">
                  <strong>Name</strong>
                </span>
              </label>
            }
          >
            <Input style={stylesInput} placeholder="John Doe" />
          </Form.Item> */}
          <Form.Item
            name="description"
            label={
              <label style={{}}>
                <span className="custom-text whitespace-nowrap">
                  <strong>Description</strong>
                </span>
              </label>
            }
          >
            <TextArea
              style={{
                padding: '17.30px 15.50px 15.89px',
                backgroundColor: 'white',
                borderRadius: '4px',
                border: '2px solid #e5e5e5',
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: 'Source Sans Pro, sans-serif',
              }}
              rows={6}
              placeholder="Copy and paste the job description"
            />
            {/* //<Input style={stylesInput} placeholder="Copy and paste the job description" /> */}
          </Form.Item>

          <Slider
            min={0}
            max={1}
            step={0.01}
            marks={marks}
            tooltip={{
              formatter,
            }}
          />

          <Button
            htmlType="submit"
            className="form-button"
            style={{
              width: '100%',
              backgroundColor: loading ? 'gray' : 'rgb(77, 112, 235)',
              color: 'white',
            }}
            disabled={loading}
          >
            {loading ? 'WAIT TO CREATING COVER LETTER' : 'CREATE CONTENT COVER LETTER '}
          </Button>
        </Form>
      )}

      {isShowContent && (
        <div className="relative mt-10 border-2 border-gray-300 rounded-md">
          <div>
            <Button
              style={{
                width: '100%',
                backgroundColor: loading ? 'gray' : 'rgb(77, 112, 235)',
                color: 'white',
              }}
              onClick={handleSubmitSave}
            >
              SAVE
            </Button>
          </div>
          <textarea
            className="inputEl undefined src-components-Form-Field--Es8ORQL2ofo= "
            id="content-section-form-0"
            aria-label="Write a professional **cover letter**"
            rows={20}
            placeholder={
              loading
                ? 'We are writing cover letter for you... It will in here soon! '
                : 'As an accomplished Marketing graduate from Wisconsin University with years of strategic marketing and data analysis experience, ...'
            }
            name="content"
            onChange={e => {
              setContent(e.target.value);
            }}
            value={loading ? null : content}
            style={{ background: 'white', height: 545, width: 1050 }}
          />
        </div>
      )}
    </div>
  );
};

export default CoverLetterFormV2;
