/* eslint-disable */

'use client';

import React, { useEffect, useState } from 'react';
import { getAts } from './finishUpService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle, faWarning } from '@fortawesome/free-solid-svg-icons';
import JobModal from '@/app/components/Modal/JobModal';
import JobModalCreate from '@/app/components/Modal/JobModalCreate';
import useStore from '@/store/store';
import { getAllExperiences } from '../experience/experienceService';
import { getJobLists } from '@/app/utils/indexService';
import { CloseOutlined, ExportOutlined, EyeOutlined } from '@ant-design/icons';
import Link from 'next/link';
import JobModalUpdate from '@/app/components/Modal/JobModalUpdate';
import { Button, Card, Form, Input, Space, Typography } from 'antd';

const Custom = ({
  cvId,
  dataAts,
  setDataAts,
  onGen,
  onDisableHightlight,
  isCreatedAts,
  setIsCreatedAts,
}) => {
  const [form] = Form.useForm();

  return (
    <div style={{ color: 'black', textAlign: 'left' }}>
      <div className="keyword-card card share-card ">
        <div className="keyword-wrapper">
          <div className="keyword-side">
            <h4>Custom Section</h4>
          </div>
          <div style={{}} className="keyword-list">
            <span className="keyword-infos"></span>
            <div className="mt-4">
              <div></div>
            </div>
          </div>
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
              initialValues={{
                items: [{}],
              }}
            >
              <Form.List name="items">
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
                        title={`Item ${field.name + 1}`}
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
                        <Form.Item label="List">
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
                                  <Space className='flex flex-col' key={subField.key}>
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

              <Form.Item noStyle shouldUpdate>
                {() => (
                  <Typography>
                    <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                  </Typography>
                )}
              </Form.Item>
            </Form>

            {/* <JobModalCreate
              cvId={cvId}
              onCreated={onCreated}
              title={title}
              description={description}
              options={options}
            /> */}
          </div>

          {/* <button className="keyword-button button" onClick={handleCLick}>
            Update job description
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Custom;
