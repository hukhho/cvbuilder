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
import TextArea from 'antd/es/input/TextArea';
import UserLayout from '@/app/components/Layout/UserLayout';
import getCoverLetter from '../finishup/getCoverLetter';
import useStore from '@/store/store';

const Content = ({ params }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message) => {
    api.info({
      message: 'Notification',
      description: message,
      placement,
    });
  };
  const [enabledCategories, setEnabledCategories] = useState({
    CONTENT: true,
  });
  const { avatar, email, userRole } = useStore();

  const [data, setData] = useState();
  const [contentData, setContentData] = useState();
  const [cvId, setCvId] = useState();
  const [loading, setLoading] = useState(false);

  const onChange = e => {
    console.log('Change:', e.target.value);
  };

  const coverLetterId = params.id;
  const fetchContent = async () => {
    try {
      const contentFetch = await getCoverLetter(params.id);
      setContentData(contentFetch.description);
      setData(contentFetch);
      setCvId(contentFetch.cvId);

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
      console.log('contentData:', data);
      data.description = values.description;
      const response = await updateCoverLetter(cvId, params.id, data);

      router.push(`/cover-letter/${params.id}/finishup`);
    } catch (error) {
      console.log('Submit. Error:', error);
    }
  };

  return (
    <UserLayout
      isCollapsed
      avatar={avatar}
      email={email}
      userRole={userRole}
      userHeader={
        <UserCoverLetterBuilderHeader
          coverLetterId={coverLetterId}
          initialEnabledCategories={enabledCategories}
        />
      }
      content={
        <div className="flex h-screen mb-8">
          <div className="flex flex-col p-4 pb-8">
            <div styles={{ width: '900px' }}>
              {contextHolder}
              <div className="" styles={{ width: '900px' }}>
                <Form onFinish={handleSubmitSave} form={form} layout="vertical" autoComplete="off">
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
                    <TextArea
                      className="inputEl"
                      id="content-section-form-0"
                      aria-label="Write a professional **cover letter**"
                      autoSize={{
                        minRows: 20,
                        maxRows: 50,
                      }}
                      placeholder="As an accomplished Marketing graduate from Wisconsin University with years of strategic marketing and data analysis experience, ..."
                      name="content"
                      onChange={onChange}
                      defaultValue={contentData}
                      style={{
                        background: 'white',
                        width: '900px',
                        fontWeight: 400,
                        resize: 'none',
                      }}
                    />
                  </Form.Item>
                  <button className="button mt-8 mb-16" type="submit" disabled={loading}>
                    {loading ? 'WAIT TO UPDATE COVER LETTER' : 'UPDATE'}
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default Content;
