/* eslint-disable */

'use client';

import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Upload,
  notification,
} from 'antd';
import UserLayout from '@/app/components/Layout/UserLayout';
import UserHeader from '@/app/components/UserHeader';
import UserHeaderReview from '@/app/components/UserHeaderReview';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit } from '@fortawesome/free-solid-svg-icons';

import { getResumes } from '@/app/utils/indexService';

import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { text } from '@fortawesome/fontawesome-svg-core';
import { getReviewRequestsByCandiate } from '@/app/review/new/reviewService';
import HeaderHR from '@/app/components/HeaderHR';
import Link from 'next/link';
import {
  banJob,
  getEvaluatesConfig,
  getPostingJobs,
  getSub,
  getUsers,
  getWithdrawRequests,
  saveScore,
  saveSub,
  unbanJob,
} from '../adminServices';
import AdminLayout from '@/app/components/Layout/AdminLayout';
import moment from 'moment';

const { Title } = Typography;

const originData = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === 'number' ? (
      <InputNumber />
    ) : inputType === 'text' ? (
      <Input />
    ) : inputType === 'checkbox' ? (
      <Checkbox />
    ) : (
      <Input />
    );

  // Render a checkbox for the "criteria" column
  if (dataIndex === 'criteria') {
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            <Checkbox checked={record.criteria} />
          </Form.Item>
        ) : (
          // Render checkbox in view mode
          <div>{record.criteria ? <Checkbox checked disabled /> : <Checkbox disabled />}</div>
        )}
      </td>
    );
  }
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const Home = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message, type = 'info') => {
    const notificationTypes = {
      info: api.info,
      success: api.success,
      warning: api.warning,
      error: api.error,
    };

    const notificationFunc = notificationTypes[type] || api.info;

    notificationFunc({
      message: 'Notification',
      description: message,
      placement,
    });
  };
  const [enabledCategories, setEnabledCategories] = useState({
    'APPLICATION LIST': true,
  });

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const initialData = [
    {
      id: 'month',
      plan: 'Month',
      description: 'VIP Month Ratio',
      pricing: 0,
    },
    {
      id: 'year',
      plan: 'Year',
      description: 'VIP Year Ratio',
      pricing: 0,
    },
  ];
  const updateMonthPrice = amount => {
    // Find the index of the "Month" plan in the data array
    const monthIndex = data.findIndex(item => item.plan === 'Month');

    if (monthIndex !== -1) {
      // Create a copy of the data array
      const newData = [...data];

      // Update the pricing value for the "Month" plan
      newData[monthIndex].pricing = amount; // Replace 10 with your desired price

      // Set the updated data using setData
      console.log('updateMonthPrice');
      setData(newData);
    }
  };
  const updateYearPrice = amount => {
    // Find the index of the "Month" plan in the data array
    const monthIndex = data.findIndex(item => item.plan === 'Year');

    if (monthIndex !== -1) {
      // Create a copy of the data array
      const newData = [...data];

      // Update the pricing value for the "Month" plan
      newData[monthIndex].pricing = amount; // Replace 10 with your desired price

      // Set the updated data using setData
      setData(newData);
    }
  };

  const [form] = Form.useForm();
  const [data, setData] = useState(initialData);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = record => record.id === editingKey;
  const edit = record => {
    form.setFieldsValue({
      price: '',
      ...record,
    });
    setEditingKey(record.id);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async key => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex(item => key === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
      const monthPrice = parseFloat(
        newData.reduce((price, item) => (item.id === 'month' ? item.pricing : price), 0),
      );
      const yearPrice = parseFloat(
        newData.reduce((price, item) => (item.id === 'year' ? item.pricing : price), 0),
      );

      const submitData = {
        vipMonthRatio: monthPrice,
        vipYearRatio: yearPrice,
        // moneyRatio: 1,
      };
      console.log('Submit: ', submitData);
      const result = await saveSub(submitData);
      openNotification('bottomRight', `Save changed`, 'success');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
      openNotification('bottomRight', `Save failed ${errInfo}`, 'error');
    }
  };
  const columns = [
    {
      title: 'Plan',
      dataIndex: 'plan',
      width: '25%',
      editable: false,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '40%',
      editable: false,
    },
    {
      title: 'Pricing',
      dataIndex: 'pricing',
      width: '15%',
      editable: true,
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        inputType:
          col.dataIndex === 'score' ? 'number' : col.dataIndex === 'criteria' ? 'checkbox' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const fetchData = async () => {
    try {
      console.log('fetchData getReviewRequestsByCandiate');
      const fetchedDataFromAPI = await getSub();

      const monthPrice = fetchedDataFromAPI.vipMonthRatio;
      console.log('monthPrice', monthPrice);
      const yearPrice = fetchedDataFromAPI.vipYearRatio;

      updateMonthPrice(monthPrice);
      updateYearPrice(yearPrice);
    } catch (error) {
      console.log('getReviewRequestsByCandiate:Error: ', error);
    }
  };

  useEffect(() => {
    console.log('useEffect');

    fetchData();
  }, []);

  return (
    <ConfigProvider>
      <AdminLayout
        selected="6"
        userHeader={<></>}
        content={
          <div className="container mt-16" style={{ width: '80%' }}>
            {contextHolder}
            <div style={{ textAlign: 'left' }}>
              {/* <Title level={5}>CV Review Table</Title> */}
            </div>
            <div>
            </div>
            <div className="!p-0 mb-5 mt-5 card">
              <div className="">
                <Form form={form} component={false}>
                  <Table
                    components={{
                      body: {
                        cell: EditableCell,
                      },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                      position: 'none',
                    }}
                  />
                </Form>
              </div>
            </div>
          </div>
        }
      />
    </ConfigProvider>
  );
};

export default Home;
