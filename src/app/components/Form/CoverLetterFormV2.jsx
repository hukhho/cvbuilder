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

const CoverLetterFormV2 = ({ coverLetterId, data, resumeData, listResumes, onCreated }) => {
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message) => {
    api.info({
      message: 'Notification',
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
      values.dear = values.company;
      values.date = '2023-12-14';
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

  // const handleSubmitSave = async values => {
  //   try {
  //     setLoading(true);
  //     console.log('save values: ', values);
  //     const submitUpdate = {
  //       title: 'title',
  //       data: '2023-10-23T13:40:14.035Z',
  //       company: 'Google',
  //       description: content,
  //     };

  //     const response = await updateCoverLetter(coverLetterId, submitUpdate);

  //     console.log('handleSubmit, values: ', values);
  //     console.log('content state: ', content);
  //     console.log('content.data.reply: ', contentResponse.reply);
  //   } catch (error) {
  //     openNotification('bottomRight', `Submit. Error: ${error}`);

  //     console.log('Submit. Error:', error);
  //   }
  // };
  const formData = {
    resumeName: data?.resumeName,
    title: data?.title,
    company: data?.company,
    cvId: data?.cvId,
  };

  const resumeOptions = listResumes.map(resume => ({
    value: resume.id,
    label: resume.resumeName,
  }));

  useEffect(() => {
    console.log('form.setFieldsValue(formData): ', formData);

    form.setFieldsValue(formData);
  }, [data, form]);

  return (
    <div className="w-full">
      {contextHolder}

      <Form
        onFinish={handleSubmit}
        form={form}
        layout="vertical"
        autoComplete="off"
        requiredMark={false}
      >
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
          rules={[
            {
              required: true,
            },
          ]}
          label={
            <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
              <div className="flex gap-2 items-center text-xs">
                <span>
                  <strong>Select resume for review *</strong>
                </span>
              </div>
            </label>
          }
        >
          <Select size="large" options={resumeOptions} />
        </Form.Item>
        <Form.Item
          name="job_title"
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

        <Form.Item
          name="job_description"
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

        <button hidden={loading} className="button mt-8" type="submit">
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
    </div>
  );
};

export default CoverLetterFormV2;
