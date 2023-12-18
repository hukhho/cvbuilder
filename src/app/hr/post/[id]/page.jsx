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
  Switch,
  TreeSelect,
  Typography,
  notification,
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
// import { postHrPublic } from '../hrServices';
import SuccessModalHrPost from '@/app/components/Modal/SuccessModalHrPost';
import { useRouter } from 'next/navigation';
import HeaderHR from '@/app/components/HeaderHR';
import { getJobPosting, updateHrPublic, updateHrShare, updateHrUnshare } from '../../hrServices';
import useStore from '@/store/store';

const { Title } = Typography;

const mockData = {
  id: 1,
  title: '123',
  workingType: 'Full time',
  companyName: 'Zalo',
  avatar:
    'https://firebasestorage.googleapis.com/v0/b/cvbuilder-dc116.appspot.com/o/1bd25e29-cc6e-4bf3-9261-5da91a4005cf.jpg?alt=media&token=1bd25e29-cc6e-4bf3-9261-5da91a4005cf.jpg',
  location: 'HCM',
  about: null,
  benefit: '132',
  description: '123',
  requirement: '123',
  salary: 'From $ 1000 to $ 1000',
  skill: ['[logitech1', ' logitech2', ' logitech3]'],
  view: 0,
  liked: false,
  deadline: '2023-11-30',
  createDate: '2023-11-26',
  updateDate: null,
  status: 'ACTIVE',
  share: 'Published',
};
const HRUpdatePost = ({ params }) => {
  const [enabledCategories, setEnabledCategories] = useState({
    'POST A JOB': true,
  });
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message) => {
    api.info({
      message: 'Notification',
      description: message,
      placement,
    });
  };
  const { avatar, email, userRole } = useStore();

  const [form] = Form.useForm();

  const [deadlineString, setDeadlineString] = useState();

  const [experts, setExperts] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [options, setOptions] = useState([]);
  const [expertsMock, setExpertsMock] = useState([]);
  const [data, setData] = useState();

  const fetchJobPosting = async () => {
    try {
      // Simulate fetching resumes (replace with your actual fetch logic)
      const fetchedJobPosting = await getJobPosting(params.id);
      console.log('fetchedJobPosting: ', fetchedJobPosting);
      setData(fetchedJobPosting);
      fetchedJobPosting.deadline = moment(fetchedJobPosting.deadline, 'YYYY-MM-DD');
      form.setFieldsValue(fetchedJobPosting);
      //   const fetchedResumes = await getResumes();
      //   console.log('fetchedExperts: ', fetchedExperts);
      // const similatorFetch =
      //   setExperts(fetchedExperts);
      //   setResumes(fetchedResumes);
    } catch (error) {
      console.error('There was an error fetching resumes', error);
    }
  };

  useEffect(() => {
    fetchJobPosting();
  }, []);

  // useEffect(() => {
  //   // Set the initial value for the deadline field
  //   // form.setFieldsValue({
  //   // //   deadline: moment(deadlineString, 'YYYY-MM-DD'), // Use moment to parse the date string
  //   // mockData
  //   // });
  //   mockData.deadline = moment(mockData.deadline, 'YYYY-MM-DD');
  //   // form.setFieldsValue(mockData);
  // }, [form, deadlineString]);

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
    try {
      const result = await updateHrPublic(params.id, values);
      setOpenSuccess(true);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const router = useRouter();
  const handleClick = e => {
    e.preventDefault();
    router.push('/hr/list');
  };
  const handleClickUnshare = async e => {
    e.preventDefault();
    try {
      const result = await updateHrUnshare(params.id);
      openNotification('bottomRight', `Save changed: ${result}`);
    } catch (error) {
      console.log('error: ', error);
      openNotification('bottomRight', `Error: ${error}`);
    }
  };
  const handleClickShare = async e => {
    e.preventDefault();
    try {
      const result = await updateHrShare(params.id);
      openNotification('bottomRight', `Save changed: ${result}`);
    } catch (error) {
      console.log('error: ', error);
      openNotification('bottomRight', `Error: ${error}`);
    }
  };
  return (
    <ConfigProvider>
      <UserLayout
        isCollapsed={false}
        avatar={avatar}
        email={email}
        userRole={userRole}
        selected="3"
        userHeader={<HeaderHR initialEnabledCategories={enabledCategories} />}
        content={
          <div className="container">
            {contextHolder}
            <Modal
              title="Update post success"
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
                  <Title level={4}>Update a job posting</Title>
                  <p>Update a job posting</p>
                </Card>
              </div>
              <div className="mt-16">
                <Form
                  labelCol={{
                    span: 4,
                  }}
                  wrapperCol={{
                    span: 10,
                  }}
                  layout="horizontal"
                  initialValues={{
                    size: 'large',
                  }}
                  style={{}}
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
                  <div className="">
                    <Form.Item name="companyName" label="COMPANY NAME">
                      <Input placeholder="Google" />
                    </Form.Item>
                    <Form.Item name="location" label="COMPANY LOCATION">
                      <Input placeholder="New York" disabled />
                    </Form.Item>
                    <Form.Item name="avatar" label="COMPANY AVATAR">
                      <Input hidden />
                      <Avatar size="large" src={data?.avatar} />
                    </Form.Item>
                  </div>
                  <Form.Item name="about" label="About">
                    <Input.TextArea disabled placeholder="About the company" rows={10} />
                  </Form.Item>
                  <Form.Item name="salary" className="salary" label="SALARY">
                    <Input placeholder="Up to $5000" />
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
                  <div className="flex ml-32 pb-16">
                    <Button type="primary" htmlType="submit">
                      Update
                    </Button>
                    <Button type="primary" onClick={handleClickShare} className="bg-blue-600 ml-10">
                      Publish
                    </Button>
                    <Button type="button" onClick={handleClickUnshare} className="bg-red-500 ml-10">
                      Unpublish
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        }
      />
    </ConfigProvider>
  );
};

export default HRUpdatePost;
