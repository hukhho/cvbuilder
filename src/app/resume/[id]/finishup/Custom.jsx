/* eslint-disable */

'use client';

import React, { useEffect, useState } from 'react';
import { getAts } from './finishUpService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCheckCircle, faCircle, faWarning } from '@fortawesome/free-solid-svg-icons';
import JobModal from '@/app/components/Modal/JobModal';
import JobModalCreate from '@/app/components/Modal/JobModalCreate';
import useStore from '@/store/store';
import { getAllExperiences } from '../experience/experienceService';
import { getJobLists } from '@/app/utils/indexService';
import { CloseOutlined, ExportOutlined, EyeOutlined } from '@ant-design/icons';
import Link from 'next/link';
import JobModalUpdate from '@/app/components/Modal/JobModalUpdate';
import { DatePicker, Button, Card, Form, Input, Space, Typography, notification } from 'antd';
import { set } from 'lodash';
const { MonthPicker } = DatePicker;

const Custom = ({ finishUpData, onSubmitCustomSections }) => {
  const [form] = Form.useForm();
  console.log('finishUpData customSections', finishUpData);
  const initData = finishUpData;
  // const initData = {
  //   customSections: [
  //     {
  //       sectionName: 'Custom Section',
  //       sectionData: [
  //         {
  //           id: 1,
  //           theOrder: 1,
  //           isDisplay: false,
  //           duration: 'July 2022 - April 2023',
  //           location: null,
  //           subTitle: 'sub title',
  //           title: 'Custom Title',
  //           description: 'Custom',
  //         },
  //         {
  //           id: 2,
  //           theOrder: 2,
  //           isDisplay: true,
  //           duration: 'July 2022 - April 2023',
  //           location: 'Thu Duc',
  //           subTitle: 'sub title 2',
  //           title: 'Custom Title 2',
  //           description: 'Custom 2',
  //         },
  //         {
  //           id: 3,
  //           theOrder: 3,
  //           isDisplay: true,
  //           duration: 'July 2022 - April 2023',
  //           location: 'Thu Duc',
  //           subTitle: 'sub title 5',
  //           title: 'Custom Title 5',
  //           description: 'Custom 5',
  //         },
  //       ],
  //     },
  //     {
  //       sectionName: 'Custom Section 2',
  //       sectionData: [
  //         {
  //           id: 1,
  //           theOrder: 1,
  //           isDisplay: false,
  //           duration: 'July 2022 - April 2023',
  //           location: null,
  //           subTitle: 'sub title 3',
  //           title: 'Custom Title 3',
  //           description: 'Custom 3',
  //         },
  //         {
  //           id: 2,
  //           theOrder: 2,
  //           isDisplay: true,
  //           duration: 'July 2022 - April 2023',
  //           location: 'Thu Duc',
  //           subTitle: 'sub title 4',
  //           title: 'Custom Title 4',
  //           description: 'Custom 4',
  //         },
  //       ],
  //     },
  //   ],
  // };
  const [data, setData] = useState(initData);
  const [isSetData, setIsSetData] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const handleDownButton = () => {
    setIsShow(!isShow);
  };
  useEffect(() => {
    if (!isSetData) {
      form.setFieldsValue(data);
      console.log('data123: ', data);
      if (data?.customSections?.length > 0) {
        setIsShow(true);
      }
    }
    setIsSetData(true);
  }, [isSetData]);

  // const onFinish = values => {
  //   console.log('values', values?.customSections);

  //   values.customSections.forEach((section, index) => {
  //     section.id = index + 1;
  //     if (section?.sectionData === null || section?.sectionData === undefined) {
  //       section.sectionData = [];
  //     }
  //     if (section?.sectionData?.length > 0) {
  //       // section?.sectionData.forEach((item, index2) => {
  //       //   item.id = index2 + 1;
  //       //   item.isDisplay = true;
  //       //   item.theOrder = index2 + 1;
  //       // });
  //     }
  //   });

  //   onSubmitCustomSections(values);
  // };

  const onFinish = values => {
    console.log('values', values?.customSections);

    const uniqueSectionNames = new Set();

    // Flag to check if there's an error
    let hasError = false;

    values.customSections.forEach((section, index) => {
      if (!section.sectionName || uniqueSectionNames.has(section.sectionName)) {
        // Show notification error for null or duplicate sectionName
        notification.error({
          message: `Error: Has a section has a null or duplicate sectionName.`,
        });
        console.error(`Error: Section ${index + 1} has a null or duplicate sectionName.`);

        // Set the flag to true indicating there's an error
        hasError = true;
        return;
      }

      uniqueSectionNames.add(section.sectionName);

      section.id = index + 1;

      if (section?.sectionData === null || section?.sectionData === undefined) {
        section.sectionData = [];
      }

      if (section?.sectionData?.length > 0) {
        section.sectionData.forEach((item, index2) => {
          item.id = index2 + 1;
          item.isDisplay = true;
          item.theOrder = index2 + 1;
        });
      }
    });

    // Only submit if there's no error
    if (!hasError) {
      onSubmitCustomSections(values);
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ color: 'black', textAlign: 'left', minWidth: 360 }}>
      <div className="keyword-card card share-card ">
        <div className="keyword-wrapper">
          <div className="keyword-side">
            <div className="flex">
              <h4 className="mr-4">Custom Section </h4>
              <div className="ml-4">
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className={!isShow ? 'transform -rotate-90' : 'transform rotate-0'}
                  style={{}}
                  onClick={handleDownButton}
                />
              </div>{' '}
            </div>
          </div>
          <div style={{}} className="keyword-list">
            <span className="keyword-infos"></span>
            <div className="mt-4"></div>
          </div>
          {isShow && (
            <div>
              <Form
                labelCol={{
                  span: 6,
                }}
                wrapperCol={{
                  span: 18,
                }}
                form={form}
                name="dynamic_form_complex"
                style={{
                  maxWidth: 600,
                }}
                autoComplete="off"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{
                  customSections: [{}],
                }}
              >
                <Form.List name="customSections">
                  {(fields, { add, remove }) => (
                    <div
                      style={{
                        display: 'flex',
                        rowGap: 16,
                        flexDirection: 'column',
                      }}
                    >
                      {fields.map(field => (
                        <Card
                          size="small"
                          title={`Custom Section ${field.name + 1}`}
                          key={field.key}
                          extra={
                            <CloseOutlined
                              onClick={() => {
                                remove(field.name);
                              }}
                            />
                          }
                        >
                          <Form.Item label="Name" name={[field.name, 'sectionName']}>
                            <Input />
                          </Form.Item>

                          {/* Nest Form.List */}
                          <Form.Item hidden label="List">
                            <Form.List name={[field.name, 'sectionData']}>
                              {(subFields, subOpt) => (
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    rowGap: 1,
                                  }}
                                >
                                  {subFields.map(subField => (
                                    <Space className="flex flex-col" key={subField.key}>
                                      <Form.Item noStyle name={[subField.name, 'id']}>
                                        <Input placeholder="id" />
                                      </Form.Item>
                                      <Form.Item noStyle name={[subField.name, 'isDisplay']}>
                                        <Input placeholder="isDisplay" />
                                      </Form.Item>
                                      <Form.Item noStyle name={[subField.name, 'theOrder']}>
                                        <Input placeholder="theOrder" />
                                      </Form.Item>
                                      <Form.Item noStyle name={[subField.name, 'title']}>
                                        <Input placeholder="title" />
                                      </Form.Item>
                                      <Form.Item noStyle name={[subField.name, 'subTitle']}>
                                        <Input placeholder="subTitle" />
                                      </Form.Item>
                                      <Form.Item noStyle name={[subField.name, 'location']}>
                                        <Input placeholder="location" />
                                      </Form.Item>
                                      <Form.Item noStyle name={[subField.name, 'duration']}>
                                        <Input placeholder="duration" />
                                      </Form.Item>
                                      <Form.Item noStyle name={[subField.name, 'description']}>
                                        <Input placeholder="description" />
                                      </Form.Item>
                                      <CloseOutlined
                                        onClick={() => {
                                          subOpt.remove(subField.name);
                                        }}
                                      />
                                    </Space>
                                  ))}
                                  <Button type="dashed" onClick={() => subOpt.add()} block>
                                    + Add Sub Item
                                  </Button>
                                </div>
                              )}
                            </Form.List>
                          </Form.Item>
                        </Card>
                      ))}

                      <Button type="dashed" onClick={() => add()} block>
                        + Add Item
                      </Button>
                    </div>
                  )}
                </Form.List>
                <Form.Item noStyle>
                  <button type="submit" className="button">
                    Submit
                  </button>
                </Form.Item>
                {/* <Form.Item noStyle shouldUpdate>
                {() => (
                  <Typography>
                    <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                  </Typography>
                )}
              </Form.Item> */}
              </Form>

              {/* <JobModalCreate
              cvId={cvId}
              onCreated={onCreated}
              title={title}
              description={description}
              options={options}
            /> */}
            </div>
          )}

          {/* <button className="keyword-button button" onClick={handleCLick}>
            Update job description
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Custom;
