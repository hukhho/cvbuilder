/* eslint-disable no-shadow */

import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  notification,
  Row,
  Select,
  Slider,
  Spin,
} from 'antd';

import DataService from '@/app/utils/dataService';
import { createCoverLetter } from './coverLetterService';
// import { convertToSliderValue, convertToSliderLabel } from './CreativitySlider';

import './customtext.css';
// import './select.css';
import './coverletter.css';
import updateCoverLetter from './updateCoverLetterService';
import { getResumes } from '@/app/utils/indexService';
import { useRouter } from 'next/navigation';

const { TextArea } = Input;

const CoverLetterFormV2 = ({ coverLetterId, data, resumeData, onCreated }) => {
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message) => {
    api.info({
      message: 'Thong bao',
      description: message,
      placement,
    });
  };
  const [form] = Form.useForm();

  const [content, setContent] = useState();
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isShowContent, setIsShowContent] = useState(false);

  const [slider, setSlider] = useState(0.2);

  const [date, setDate] = useState();
  const onChange = (date, dateString) => {
    console.log(dateString);
    setDate(dateString);
  };
  const [cvId, setCvId] = useState();

  const handleSubmit = async values => {
    try {
      values.temperature = slider;
      console.log('handleSubmit, values: ', values);

      setLoading(true);

      openNotification('bottomRight', 'Submiting...');

      const contentResponse = await createCoverLetter(values.cvId, coverLetterId, values);
      console.log('content state: ', content);
      console.log('content.data.reply: ', contentResponse.reply);

      if (contentResponse.reply) {
        openNotification('bottomRight', 'Done, redirecting!!!');
        router.push(`/cover-letter/${coverLetterId}/content`);
      }
      console.log('content state: ', content);
      setLoading(false);
      // onCreated();
    } catch (error) {
      console.log('Submit. Error:', error);
      openNotification('bottomRight', `Submit. Error: ${error}`);

      setLoading(false);
    }
  };

  const handleSubmitSave = async values => {
    try {
      setLoading(true);
      console.log('save values: ', values);
      const submitUpdate = {
        title: 'title',
        data: '2023-10-23T13:40:14.035Z',
        company: 'Google',
        description: content,
      };

      const response = await updateCoverLetter(coverLetterId, submitUpdate);

      console.log('handleSubmit, values: ', values);
      console.log('content state: ', content);
      console.log('content.data.reply: ', contentResponse.reply);
    } catch (error) {
      openNotification('bottomRight', `Submit. Error: ${error}`);

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

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        cvId: data.cvId,
      });
    }
  }, [data, form]);

  return (
    <div className="w-full">
      {contextHolder}

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
          {/* <Form.Item
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
              onChange={value => setCvId(value)}
            >
              {listResumes?.map(resume => (
                <Select.Option key={resume.id} value={resume.id}>
                  {resume.resumeName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item> */}

          <Form.Item
            name="cvId"
            style={{ display: 'none' }}
            label={
              <label style={{}}>
                <span className="custom-text whitespace-nowrap">
                  <strong>CvId</strong>
                </span>
              </label>
            }
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="resumeName"
            label={
              <label style={{}}>
                <span className="custom-text whitespace-nowrap">
                  <strong>Resume Name</strong>
                </span>
              </label>
            }
          >
            <Input disabled value={resumeData?.resumeName} />
          </Form.Item>
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
            <Input className="inputEl" placeholder="Software Engineer" />
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
            <Input placeholder="Google" />
          </Form.Item>

          {/* <Form.Item
            name="dear"
            label={
              <label style={{}}>
                <span className="custom-text whitespace-nowrap">
                  <strong>DEAR</strong>
                </span>
              </label>
            }
          >
            <Input className="inputEl" placeholder="Software Engineer" />
          </Form.Item> */}

          {/* <Form.Item
            name="date"
            label={
              <label style={{}}>
                <span className="custom-text whitespace-nowrap">
                  <strong>DATE</strong>
                </span>
              </label>
            }
          >
            <DatePicker onChange={onChange} />
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
                fontWeight: '400',
                background: 'white',
                height: 'auto',
                overflow: 'hidden',
                resize: 'none',
              }}
              autoSize={{
                minRows: 2,
                maxRows: 10,
              }}
              className="inputEl"
              rows={6}
              placeholder="Copy and paste the job description"
            />
            {/* //<Input style={stylesInput} placeholder="Copy and paste the job description" /> */}
          </Form.Item>

          <Slider
            min={0.2}
            max={1}
            step={0.01}
            marks={marks}
            tooltip={{
              formatter,
            }}
            value={slider}
            onChange={val => setSlider(val)}
          />

          {/* <Button
            hidden={loading}
            htmlType="submit"
            className="form-button button"
            disabled={loading}
          >
            {loading ? 'WAIT TO CREATING COVER LETTER' : 'CREATE CONTENT COVER LETTER '}
          </Button> */}
          <button hidden={loading} className="button mt-8" htmlType="submit">
            {loading ? 'WAIT TO UPDATE COVER LETTER' : 'CREATE CONTENT COVER LETTER'}
          </button>
          {loading && (
            <Spin spinning={loading}>
              <Alert
                type="info"
                message="Content Cover Letter is writing..."
                description="Wait some second..."
              />
            </Spin>
          )}
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
