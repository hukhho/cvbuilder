'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, Card, ConfigProvider, Form, Input, notification, Select, Switch } from 'antd';

import UserCVBuilderHeader from '@/app/components/UserCVBuilderHeader';
import UserCVBuilderLayout from '@/app/components/Layout/UseCVBuilderLayout';

import DataService from '../../../utils/dataService';
import ContactForm from '@/app/components/Form/ContactForm';
import SummaryForm from '@/app/components/Form/SummaryForm';
import { getSummary, getSummaryHistory, postSummaryAi } from './summaryService';

import './summary.css';
import './textarena.css';
import { getAllExperiences } from '../experience/experienceService';
import { Listbox } from '@headlessui/react';
import UserLayout from '@/app/components/Layout/UserLayout';

const { Meta } = Card;

const Summary = ({ params }) => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message) => {
    api.info({
      message: 'Thong bao',
      description: message,
      placement,
    });
  };
  const [form] = Form.useForm();
  const [summaryData, setSummaryData] = useState([]); // Renamed to summaryData
  const [summaryHistory, setSummaryHistory] = useState([]);

  const [selectedData, setSelectedData] = useState(null);
  const [enabledCategories, setEnabledCategories] = useState({
    SUMMARY: true,
  });
  const [experiences, setExperiences] = useState([]);
  const cvId = params.id;
  const dataService = new DataService('certifications', cvId);

  const fetchExperiences = async () => {
    try {
      const data = await getAllExperiences(cvId);
      console.log('data getAllExperiences ', data);

      setExperiences(data);
    } catch (error) {
      console.error('There was an error fetching the experiences', error);
    }
  };

  const options = experiences.map(item => ({
    value: `${item.role} at ${item.companyName}`,
    label: `${item.role} at ${item.companyName}`,
  }));

  const [isAiWrite, setIsAiWrite] = useState(false);
  const [aiContent, setAiContent] = useState('');
  console.log('Data: ', params);

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

  const fetchSummaryHistory = async () => {
    try {
      const data = await getSummaryHistory(params.id);
      // console.log('fetchData ', data);
      // console.log('Summary: ', data.summary);
      const sortedData = data.sort((a, b) => b.id - a.id);
      const lastThreeItems = sortedData.slice(0, 3);

      setSummaryHistory(lastThreeItems); // Updated to setSummaryData
    } catch (error) {
      console.error('There was an error fetching the data', error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchExperiences();
    fetchSummaryHistory();
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

  // const summaryHistory = [
  //   { id: 1, version: 'This is content 1' },
  //   { id: 2, version: 'This is content 2' },
  // ];
  const handleSubmit = async values => {
    try {
      console.log('summary page: submit: ', values);
      const result = await postSummaryAi(cvId, values);
      // console.log(summary, result);
      openNotification('bottomRight', 'oke');
      fetchSummaryHistory();
    } catch (error) {
      console.log('Submit. Error:', error);
      openNotification('bottomRight', `Error: ${error}`);
      fetchSummaryHistory();
    }
  };
  const handleApplyAi = async content => {
    try {
      console.log('summary page: handleApplyAi::content: ', content);
      setAiContent(content);
      setIsAiWrite(true);
      // setSummaryData(null);
      // postSummaryAi(cvId, values);
    } catch (error) {
      console.log('Submit. Error:', error);
    }
  };
  const saveSuggestion = () => {
    setSummaryData({ summary: aiContent });
    setIsAiWrite(false);
    setAiContent(null);
  };
  const cancelSuggestion = () => {
    setIsAiWrite(false);
    setAiContent(null);
  };
  const onSubmit = async () => {
    console.log('onSubmit');
    const data = await getSummary(cvId);
    console.log('fetchData ', data);
    console.log('Summary: ', data.summary);
    setSummaryData(data); // Updated to setSummaryData
    setIsAiWrite(false);
    setAiContent(null);
  };
  const handleChange = value => {
    console.log(`selected ${value}`);
  };
  const [disabled, setDisabled] = useState(false);
  const toggle = () => {
    setDisabled(!disabled);
  };
  return (
    <main>
      <ConfigProvider>
        <UserLayout
          isCollapsed
          userHeader={
            <UserCVBuilderHeader initialEnabledCategories={enabledCategories} cvId={params.id} />
          }
          content={
            <div className="flex h-screen">
              {contextHolder}
              <div className="flex flex-col p-4" style={{ width: '900px' }}>
                <SummaryForm
                  cvId={cvId}
                  onCreated={fetchData}
                  data={summaryData}
                  isAiWrite={isAiWrite}
                  aiContent={aiContent}
                  onSubmit={onSubmit}
                />
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
                    <div className="flex gap-2 items-center">
                      <Form
                        onFinish={handleSubmit}
                        form={form}
                        layout="vertical"
                        autoComplete="off"
                      >
                        <Form.Item
                          name="position_highlight"
                          label={
                            <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs  text-gray-600">
                              <div className="flex gap-2 items-center text-xs">
                                Position Highlight
                              </div>
                              <div className="ml-10 flex">
                                <span className="text-gray-300" style={{ fontSize: 13 }}>
                                  from resume
                                </span>
                                <Switch className="mt-2" onClick={toggle} defaultChecked />
                              </div>
                            </label>
                          }
                        >
                          {!disabled && (
                            <Select
                              style={{
                                height: 50,
                              }}
                              className=""
                              onChange={handleChange}
                              options={options}
                            />
                          )}
                          {disabled && (
                            <Input
                              style={{ marginTop: '-10px' }}
                              className="inputEl st-current"
                              placeholder="Marketing Asistant at Sony"
                            />
                          )}
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
                    {isAiWrite && (
                      <div className="mt-8">
                        <button onClick={saveSuggestion} className="button">
                          Save Suggestion
                        </button>
                        <button onClick={cancelSuggestion} className="button bg-red-500 mt-2">
                          Cancel Suggestion
                        </button>
                      </div>
                    )}
                  </div>
                </Card>
                <div className="mt-4">
                  {summaryHistory?.map((summary, index) => {
                    return (
                      <React.Fragment key={index}>
                        <Card className="flex flex-col" style={{ marginTop: '4px' }}>
                          <div className="text-gray-400">Summary #{summary.id}</div>
                          {summary.summary}{' '}
                          <button
                            onClick={() => handleApplyAi(summary.summary)}
                            className="button mt-2"
                          >
                            Apply
                          </button>
                        </Card>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          }
        />
      </ConfigProvider>
    </main>
  );
};

export default Summary;
