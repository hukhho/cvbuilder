/* eslint-disable */

'use client';

import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  Cascader,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Space,
  Switch,
  TreeSelect,
  Typography,
} from 'antd';
import UserLayout from '@/app/components/Layout/UserLayout';
import UserHeader from '@/app/components/UserHeader';
import UserHeaderReview from '@/app/components/UserHeaderReview';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { getResumes } from '@/app/utils/indexService';

import { StarFilled } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import Link from 'next/link';
import UserHeaderHR from '@/app/components/UserHeaderHR';
import moment from 'moment';
import { getHrConfig, postHrPublic } from '../hrServices';
import SuccessModalHrPost from '@/app/components/Modal/SuccessModalHrPost';
import { useRouter } from 'next/navigation';
import HeaderHR from '@/app/components/HeaderHR';

const { Title } = Typography;
const generateMockExperts = () => {
  const mockExperts = [];
  for (let i = 1; i <= 9; i++) {
    mockExperts.push({
      id: i,
      name: `Expert ${i}`,
      rating: 3.5,
      jobTitle: 'Product Manager',
      location: 'FPT',
      hourlyRate: '50,000 VND',
      experience: '6 years',
      numberOfReviews: 5,
    });
  }
  return mockExperts;
};
const HRPost = () => {
  const [enabledCategories, setEnabledCategories] = useState({
    'POST A JOB': true,
  });
  const [form] = Form.useForm();

  const [deadlineString, setDeadlineString] = useState('2023-11-29');
  const [options, setOptions] = useState([]);

  const [data, setData] = useState();
  const [resumes, setResumes] = useState([]);

  const fetchData = async () => {
    try {
      const fetchedDataFromAPI = await getHrConfig();
      console.log('fetchedDataFromAPI: ', fetchedDataFromAPI);

      setData(fetchedDataFromAPI);

      form.setFieldsValue({
        avatar: fetchedDataFromAPI?.companyLogo,
        companyName: fetchedDataFromAPI?.companyName,
        location: fetchedDataFromAPI?.companyLocation,
        about: fetchedDataFromAPI?.companyDescription,
      });
    } catch (error) {
      console.log('getReviewRequestsByCandiate:Error: ', error);
    }
  };

  useEffect(() => {
    console.log('useEffect');
    fetchData();
  }, []);

  // useEffect(() => {
  //   // Set the initial value for the deadline field
    
  // }, [form]);

  const [salaryName, setSalaryName] = useState('');
  const [salaryFrom, setSalaryFrom] = useState('');
  const [salaryTo, setSalaryTo] = useState('');

  const handleChangeSalaryName = value => {
    setSalaryName(value);
  };
  const handleChangeSalaryFrom = value => {
    setSalaryFrom(value);
    setSalaryName(`From $ ${value} to $ ${salaryTo}`);
  };
  const handleChangeSalaryTo = value => {
    setSalaryTo(value);
    setSalaryName(`From $ ${salaryFrom} to $ ${value}`);
  };

  const handleSubmit = async e => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Add your form submission logic here, e.g., sending data to a server
    // You can access form input values and other data from your state
    // For now, you can simply log a message to the console.
    // Extract data from form inputs
    const formData = new FormData(e.target);

    // const resumeId = formData.get('resumeId');
    // const expertId = formData.get('expertId');
    // const receivedDate = formData.get('receivedDate');
    // const experienceLevel = formData.get('experienceLevel');
    // const note = formData.get('note');

    // Construct the data object to send to the server
    // const data = {
    //   receivedDate,
    //   note,
    // };

    // const result = await createReview(resumeId, expertId, data);

    console.log('Form submitted! Data:', formData);
  };

  const [searchValue, setSearchValue] = useState('');

  const onSearch = async (value, _e, info) => {
    const result = await searchExperts(value);
    setExperts(result);
    setSearchValue(value);
  };

  const handleChangeSelectJobType = value => {
    console.log(`selected ${value}`);
  };

  const [salaryOptions, setSalaryOptions] = useState();
  const handleChangeSelectSalary = value => {
    setSalaryOptions(value);
    if (value === 1) {
      setSalaryName("You'll love it");
    } else if (value === 2) {
      setSalaryName('Up to $ 1000');
    } else if (value === 3) {
      setSalaryName('Extract $ 1000');
    } else if (value === 0) {
      setSalaryFrom(1000);
      setSalaryTo(1000);
      setSalaryName('From $ 1000 to $ 1000');
    }
  };

  const optionTags = [];
  for (let i = 10; i < 36; i++) {
    optionTags.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  const handleChangeTag = value => {
    console.log(`selected ${value}`);
  };
  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
    setDeadlineString(dateString);
  };

  const onChangeSwitch = checked => {
    console.log(`switch to ${checked}`);
  };

  const [openSuccess, setOpenSuccess] = useState(false);

  const onFinish = async values => {
    values.salary = salaryName;
    values.deadline = deadlineString;

    console.log('Form data:', values);
    const result = await postHrPublic(values);
    setOpenSuccess(true);
  };

  const router = useRouter();
  const handleClick = e => {
    e.preventDefault();
    router.push('/hr/list');
  };

  return (
    <ConfigProvider>
      <UserLayout
        selected="3"
        userHeader={<HeaderHR initialEnabledCategories={enabledCategories} />}
        content={
          <div className="container mx-auto">
            <Modal
              title="Create post success"
              centered
              open={openSuccess}
              onOk={e => handleClick(e)}
              width={1000}
            >
              Successs
            </Modal>{' '}
            <div className="!p-0">
              <div className="mt-8">
                <Card>
                  <Title level={4}>Create a job posting</Title>
                  <p>Create a job posting that help users ...</p>
                </Card>
              </div>
              <div className="mt-16" style={{ width: 900 }}>
                <Form
                  layout="vertical"
                  initialValues={{
                    size: 'large',
                  }}
                  form={form}
                  onFinish={onFinish}
                >
                  <Form.Item name="title" label="JOB TITLE">
                    <Input />
                  </Form.Item>
                  <Form.Item name="workingType" label="TYPE OF JOB">
                    <Select
                      defaultValue="Full Time"
                      style={{
                        width: 120,
                      }}
                      onChange={handleChangeSelectJobType}
                      options={[
                        {
                          value: 'Full Time',
                          label: 'Full Time',
                        },
                        {
                          value: 'Part Time',
                          label: 'Part Time',
                        },
                        {
                          value: 'Others',
                          label: 'Others',
                        },
                      ]}
                    />
                  </Form.Item>
                  <Space.Compact block>
                    {' '}
                    <Form.Item
                      name="companyName"
                      label="COMPANY NAME"
                      style={{
                        width: '40%',
                        marginRight: '10px',
                      }}
                    >
                      <Input placeholder="Google" />
                    </Form.Item>
                    <Form.Item
                      name="location"
                      label="COMPANY LOCATION"
                      style={{
                        width: '40%',
                        marginRight: '10px',
                      }}
                    >
                      <Input placeholder="New York" />
                    </Form.Item>
                    <Form.Item
                      name="avatar"
                      label="COMPANY AVATAR"
                      style={{
                        width: '20%',
                      }}
                    >
                      <Input hidden />
                      <Avatar size="large" src={data?.companyLogo} />
                    </Form.Item>
                  </Space.Compact>
                  <Form.Item name="about" label="About">
                    <Input.TextArea placeholder="About the company" rows={10} />
                  </Form.Item>
                  <Form.Item name="" className="" label="SALARY">
                    <Select
                      style={{
                        width: 200,
                      }}
                      value={salaryOptions}
                      onChange={handleChangeSelectSalary}
                      options={[
                        {
                          value: 0,
                          label: 'Range',
                        },
                        {
                          value: 1,
                          label: "You'll love it",
                        },
                        {
                          value: 2,
                          label: 'Up to',
                        },
                        {
                          value: 3,
                          label: 'Extract',
                        },
                      ]}
                    />
                    {salaryOptions === 0 && (
                      <div className="mt-4">
                        <InputNumber
                          className="ml-8"
                          defaultValue={1000}
                          value={salaryFrom}
                          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/\$\s?|(,*)/g, '')}
                          onChange={value => handleChangeSalaryFrom(value)}
                        />
                        <InputNumber
                          className="ml-2"
                          defaultValue={2000}
                          value={salaryTo}
                          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/\$\s?|(,*)/g, '')}
                          onChange={value => handleChangeSalaryTo(value)}
                        />{' '}
                      </div>
                    )}
                    {salaryOptions === 2 && (
                      <>
                        <InputNumber
                          className="ml-8"
                          defaultValue={1000}
                          onChange={value => handleChangeSalaryName(`Up to $${value}`)}
                          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                      </>
                    )}
                    {salaryOptions === 3 && (
                      <>
                        <InputNumber
                          className="ml-8"
                          defaultValue={1000}
                          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/\$\s?|(,*)/g, '')}
                          onChange={value => handleChangeSalaryName(`Extract $${value}`)}
                        />
                      </>
                    )}
                  </Form.Item>
                  <Form.Item name="benefit" label="Benefit">
                    <Input.TextArea
                      placeholder="Say about what benefits candidate can recieve"
                      rows={10}
                    />
                  </Form.Item>
                  <Form.Item name="requirement" label="Job Requirement">
                    <Input.TextArea placeholder="Say about requirement of the job" rows={10} />
                  </Form.Item>
                  <Form.Item name="description" label="Job Description">
                    <Input.TextArea placeholder="Say about the description of the job" rows={10} />
                  </Form.Item>
                  <Form.Item name="skill" label="Skills">
                    <Select
                      mode="tags"
                      style={{
                        width: '100%',
                      }}
                      placeholder="Tags Mode"
                      onChange={handleChangeTag}
                      options={options}
                    />
                  </Form.Item>
                  <Form.Item name="deadline" label="Deadline">
                    <DatePicker format="YYYY-MM-DD" onChange={onChangeDate} />
                  </Form.Item>

                  <div className="ml-20">
                    <Switch defaultChecked onChange={onChangeSwitch} />
                    <span className="ml-4">Not Allow Candidate to apply many time in a job</span>
                  </div>
                  <Form.Item name="applyAgain" label="Apply Again">
                    <InputNumber defaultValue={0} />
                  </Form.Item>
                  <Form.Item label="Button">
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>{' '}
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        }
      />
    </ConfigProvider>
  );
};

export default HRPost;
