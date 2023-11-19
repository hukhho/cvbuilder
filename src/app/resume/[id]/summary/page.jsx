'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, Card, ConfigProvider, Form, Input } from 'antd';

import UserCVBuilderHeader from '@/app/components/UserCVBuilderHeader';
import UserCVBuilderLayout from '@/app/components/Layout/UseCVBuilderLayout';

import DataService from '../../../utils/dataService';
import ContactForm from '@/app/components/Form/ContactForm';
import SummaryForm from '@/app/components/Form/SummaryForm';
import { getSummary, postSummaryAi } from './summaryService';

import './summary.css';

const { Meta } = Card;

const Summary = ({ params }) => {
  const [form] = Form.useForm();
  const [summaryData, setSummaryData] = useState([]); // Renamed to summaryData
  const [selectedData, setSelectedData] = useState(null);
  const [enabledCategories, setEnabledCategories] = useState({
    SUMMARY: true,
  });
  console.log('Data: ', params);

  const cvId = params.id;
  const dataService = new DataService('certifications', cvId);

  const fetchData = async () => {
    try {
      const data = await getSummary(cvId);

      console.log('fetchData ', data);
      console.log('Summary: ', data.summary);
      setSummaryData(data); // Updated to setSummaryData
    } catch (error) {
      console.error('There was an error fetching the data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditData = item => {
    setSelectedData(item);
  };

  const handleDeleteData = async itemId => {
    try {
      await dataService.delete(cvId, itemId);
      const updatedData = await dataService.getAll(cvId);
      setSummaryData(updatedData); // Updated to setSummaryData
    } catch (error) {
      console.error('There was an error deleting the data', error);
    }
  };
  const [sortByDate, setSortByDate] = useState(true);

  const handleSortChange = () => {
    setSortByDate(!sortByDate);
  };

  const handleSubmit = async values => {
    try {
      console.log('summary page: submit: ', values);
      postSummaryAi(cvId, values);
    } catch (error) {
      console.log('Submit. Error:', error);
    }
  };

  return (
    <main>
      <ConfigProvider>
        <UserCVBuilderLayout
          userHeader={
            <UserCVBuilderHeader initialEnabledCategories={enabledCategories} cvId={params.id} />
          }
          content={
            <div className="flex h-screen">
              <div className="flex flex-col p-4" style={{ width: '900px' }}>
                <SummaryForm cvId={cvId} onCreated={fetchData} data={summaryData} />
              </div>
              <div className="summary-wrapper" style={{ width: '320px', textAlign: 'left' }}>
                <Card className="summary-ai-wrapper" style={{ marginTop: '57px' }}>
                  <div>
                    <h4 style={{}}>
                      AI summary Writer<sup>BETA</sup>
                    </h4>
                  </div>
                  <div>
                    <p>
                      AI writer helps you to write your summary for a{' '}
                      <span style={{ color: '#4d70eb', cursor: 'pointer' }}>
                        targeted job position
                      </span>
                      . Strange result? Just regenerate!
                    </p>{' '}
                  </div>
                  <div>
                    <div class="flex gap-2 items-center">
                      <Form
                        onFinish={handleSubmit}
                        form={form}
                        layout="vertical"
                        autoComplete="off"
                      >
                        <Form.Item
                          name="temperature"
                          label={
                            <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs  text-gray-600">
                              <div className="flex gap-2 items-center text-xs">Temperature</div>
                            </label>
                          }
                        >
                          <Input
                            style={{ marginTop: '-10px' }}
                            className="inputEl st-current"
                            placeholder="0.6"
                          />
                        </Form.Item>
                        <Form.Item
                          name="position_highlight"
                          label={
                            <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs  text-gray-600">
                              <div className="flex gap-2 items-center text-xs">
                                Position Highlight
                              </div>
                            </label>
                          }
                        >
                          <Input
                            style={{ marginTop: '-10px' }}
                            className="inputEl st-current"
                            placeholder="Marketing Asistant at Sony"
                          />
                        </Form.Item>
                        <Form.Item
                          name="skill_highlight"
                          label={
                            <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs  text-gray-600">
                              <div className="flex gap-2 items-center text-xs">Skill Highlight</div>
                            </label>
                          }
                        >
                          <Input
                            style={{ marginTop: '-10px' }}
                            className="inputEl st-current"
                            placeholder="Marketing Asistant at Sony"
                          />
                        </Form.Item>
                        <button
                          href=""
                          data-size="large"
                          data-theme="default"
                          data-busy="false"
                          className="summary-section button"
                          id="summary-section-save-to-list"
                          type="submit"
                        >
                          AI WRITER READY
                        </button>
                      </Form>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          }
        />
      </ConfigProvider>
    </main>
  );
};

export default Summary;
