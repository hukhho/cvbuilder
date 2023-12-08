'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, ConfigProvider, DatePicker, Form, Input, notification, Select } from 'antd';

import UserCVBuilderHeader from '@/app/components/UserCVBuilderHeader';
import UserCVBuilderLayout from '@/app/components/Layout/UseCVBuilderLayout';
import UserCoverLetterBuilderHeader from '@/app/components/UserCoverLetterBuilderHeader';

import DataService from '../../../utils/dataService';
import ContactForm from '@/app/components/Form/ContactForm';
import CoverLetterForm from '@/app/components/Form/CoverLetterForm';
import CoverLetterContent from '@/app/components/Form/CoverLetterContent';
import getContent from './contentService';
import { useRouter } from 'next/navigation';
import { format, parse } from 'date-fns';
import updateCoverLetter from '@/app/components/Form/updateCoverLetterService';

const Content = ({ params }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message) => {
    api.info({
      message: 'Thong bao',
      description: message,
      placement,
    });
  };
  const [enabledCategories, setEnabledCategories] = useState({
    CONTENT: true,
  });
  const [contentData, setContentData] = useState();

  const [content, setContent] = useState();
  const [cvId, setCvId] = useState();
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isShowContent, setIsShowContent] = useState(false);

  const [slider, setSlider] = useState(0.1);

  const [date, setDate] = useState();
  const onChange = dateString => {
    console.log(dateString);
    setDate(dateString);
  };
  const coverLetterId = params.id;
  const fetchContent = async () => {
    try {
      // Simulate fetching resumes (replace with your actual fetch logic)
      const contentFetch = await getContent(params.id);

      setContentData(contentFetch.description);
      setCvId(contentFetch.cvId);
      // Assuming contentFetch.date is in the format '2023-11-01'
      const dateObject = new Date(contentFetch.date);
      contentFetch.date = null;

      // const parsedStartDate = parse(contentFetch.date, 'yyyy-MM-dd', new Date());
      // contentFetch.date = parsedStartDate;
      console.log('contentFetch: ', contentFetch);
      form.setFieldsValue(contentFetch);
    } catch (error) {
      console.error('There was an error fetching resumes', error);
    }
  };
  useEffect(() => {
    fetchContent();
  }, []);

  const handleSubmitSave = async values => {
    try {
      // setLoading(true);
      const submitUpdate = {
        ...values,
        // title: 'title',
        // data: '2023-10-23T13:40:14.035Z',
        // company: 'Google',
        // description: content,
      };
      console.log('save values: ', submitUpdate);

      const response = await updateCoverLetter(cvId, params.id, values);

      // console.log('handleSubmit, values: ', values);
      // console.log('content state: ', content);
      // console.log('content.data.reply: ', contentResponse.reply);

      router.push(`/cover-letter/${params.id}/finishup`);
    } catch (error) {
      console.log('Submit. Error:', error);
    }
  };

  return (
    <main>
      <ConfigProvider>
        <UserCVBuilderLayout
          userHeader={
            <UserCoverLetterBuilderHeader
              coverLetterId={coverLetterId}
              initialEnabledCategories={enabledCategories}
            />
          }
          content={
            <div className="flex h-screen">
              <div className="flex flex-col p-4">
                <div className="w-full">
                  {contextHolder}
                  <div className="relative mt-10">
                    <Form
                      onFinish={handleSubmitSave}
                      form={form}
                      layout="vertical"
                      autoComplete="off"
                    >
                      {/* <Form.Item
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

                      <Form.Item
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
                      </Form.Item>

                      <Form.Item
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
                              <strong>Content</strong>
                            </span>
                          </label>
                        }
                      >
                        <textarea
                          className="inputEl"
                          id="content-section-form-0"
                          aria-label="Write a professional **cover letter**"
                          rows={20}
                          placeholder="As an accomplished Marketing graduate from Wisconsin University with years of strategic marketing and data analysis experience, ..."
                          name="content"
                          onChange={e => setContentData(e.target.value)}
                          value={contentData}
                          style={{ background: 'white', height: 545, width: 1000, resize: 'none' }}
                          // defaultValue={content}
                        />
                        {/* //<Input style={stylesInput} placeholder="Copy and paste the job description" /> */}
                      </Form.Item>
                      <button className="button mt-8" type="submit" disabled={loading}>
                        {loading ? 'WAIT TO UPDATE COVER LETTER' : 'UPDATE'}
                      </button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </ConfigProvider>
    </main>
  );
};

export default Content;
