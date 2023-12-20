/* eslint-disable */

'use client';

import React, { Fragment, useEffect, useState } from 'react';
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
  notification,
} from 'antd';
import UserLayout from '@/app/components/Layout/UserLayout';
import UserHeader from '@/app/components/UserHeader';
import UserHeaderReview from '@/app/components/UserHeaderReview';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { getResumes } from '@/app/utils/indexService';

import { ExclamationCircleFilled, StarFilled } from '@ant-design/icons';
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
import { Dialog, Transition } from '@headlessui/react';

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
  const { confirm } = Modal;

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
  const [isLimited, setIsLimited] = useState(false);

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
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
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
    setIsLimited(checked);
  };

  const [openSuccess, setOpenSuccess] = useState(false);

  const onFinish = async values => {
    values.deadline = deadlineString;
    values.isLimited = isLimited;
    if (!isLimited) {
      values.applyAgain = 99;
    }
    console.log('Form data:', values);
    try {
      const result = await updateHrPublic(params.id, values);
      notification.success({
        message: 'Save success',
      });

      setOpenSuccess(true);
      setIsOpen(true);
      fetchJobPosting();

    } catch (error) {
      notification.error({
        message: 'Save error',
      });

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
      notification.success({
        message: 'Save success',
      });
      fetchJobPosting();

    } catch (error) {
      notification.eror({
        message: 'Error',
      });
    }
  };
  const handleClickShare = async e => {
    e.preventDefault();
    try {
      const result = await updateHrShare(params.id);
      notification.success({
        message: 'Save success',
      });
      fetchJobPosting();

    } catch (error) {
      console.log('error: ', error);
      notification.error({
        message: 'Error',
      });
    }
  };
  const showPromiseConfirmShare = e => {
    confirm({
      title: 'Do you want to publish this post?',
      icon: <ExclamationCircleFilled />,
      content: 'When clicked the OK button, this Post will be Published!',
      async onOk() {
        await handleClickShare(e);
      },
      onCancel() {},
    });
  };

  const showPromiseConfirmUnshare = e => {
    confirm({
      title: 'Do you want to unpublish this post?',
      icon: <ExclamationCircleFilled />,
      content: 'When clicked the OK button, this Post will be Unpublished!',
      async onOk() {
        await handleClickUnshare(e);
      },
      onCancel() {},
    });
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
          <div className="">
            <div>
              <>
                <Transition appear show={isOpen} as={Fragment}>
                  <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                              as="h3"
                              className="text-lg font-medium leading-6 text-gray-900"
                            >
                              Successful
                            </Dialog.Title>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                Your post has been save successfully.
                              </p>
                            </div>

                            <div className="mt-4">
                              <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={() => {
                                  closeModal();
                                }}
                              >
                                Got it, thanks!
                              </button>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition>
              </>
            </div>
            <div className="!p-0" style={{ width: 900 }}>
              <div className="mt-8">
                <Card>
                  <Title level={4}>Update a job posting</Title>
                  <p>Update job posting</p>
                </Card>
              </div>
              <div className="mt-16" style={{ width: 900 }}>
                <Form
                  layout="vertical"
                  initialValues={{
                    size: 'large',
                    workingType: 'Full Time', // Set the default value here
                    applyAgain: 1,
                  }}
                  requiredMark={false}
                  form={form}
                  onFinish={onFinish}
                >
                  <Form.Item
                    rules={[{ required: true }]}
                    className="custom-label"
                    name="title"
                    label="JOB TITLE *"
                  >
                    <Input className="inputEl" />
                  </Form.Item>
                  <Form.Item className="custom-label" name="workingType" label="TYPE OF JOB">
                    <Select
                      defaultValue="Full Time"
                      style={{
                        width: 350,
                        height: '60px',
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
                      className="custom-label"
                      name="companyName"
                      label="COMPANY NAME"
                      style={{
                        width: '40%',
                        marginRight: '10px',
                      }}
                    >
                      <Input className="inputEl" placeholder="Google" disabled />
                    </Form.Item>
                    <Form.Item
                      className="custom-label"
                      name="location"
                      label="COMPANY LOCATION"
                      style={{
                        width: '40%',
                        marginRight: '10px',
                      }}
                    >
                      <Input className="inputEl" placeholder="New York" disabled />
                    </Form.Item>
                    <Form.Item
                      className="custom-label"
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
                  <Form.Item className="custom-label" name="about" label="About">
                    <Input.TextArea className="inputEl" placeholder="About the company" rows={10} />
                  </Form.Item>
                  <Form.Item className="custom-label" name="salary" label="SALARY">
                    <Input className="inputEl" placeholder="Salary" />
                  </Form.Item>
                  <Form.Item className="custom-label" name="benefit" label="Benefit">
                    <Input.TextArea
                      className="inputEl"
                      placeholder="Say about what benefits candidate can recieve"
                      rows={10}
                    />
                  </Form.Item>
                  <Form.Item className="custom-label" name="requirement" label="Job Requirement">
                    <Input.TextArea
                      className="inputEl"
                      placeholder="Say about requirement of the job"
                      rows={10}
                    />
                  </Form.Item>
                  <Form.Item className="custom-label" name="description" label="Job Description">
                    <Input.TextArea
                      className="inputEl"
                      placeholder="Say about the description of the job"
                      rows={10}
                    />
                  </Form.Item>
                  <Form.Item name="skill" className="custom-label" label="Skills">
                    <Select
                      mode="tags"
                      style={{
                        width: '100%',
                        height: 50,
                      }}
                      placeholder="Tags Mode"
                      onChange={handleChangeTag}
                      options={options}
                    />
                  </Form.Item>
                  <div
                    className="custom-space-item-2"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Form.Item
                      className="custom-item custom-label"
                      name="deadline"
                      rules={[{ required: true }]}
                      label="Deadline *"
                    >
                      <DatePicker
                        style={{ height: '60px', marginTop: -10, marginBottom: 0 }}
                        className="inputEl"
                        format="YYYY-MM-DD"
                        onChange={onChangeDate}
                      />
                    </Form.Item>

                    <div className="custom-item custom-label">
                      <div className="">
                        <Switch
                          value={isLimited}
                          defaultChecked={isLimited}
                          onChange={onChangeSwitch}
                        />
                        <span className="ml-4">LIMIT CANDIDATE'S APPLYING PER JOB</span>
                      </div>
                      <Form.Item className="mb-4" name="applyAgain">
                        {isLimited && (
                          <InputNumber className="inputEl" defaultValue={1} min={1} type="number" />
                        )}
                      </Form.Item>

                      <Form.Item
                        className="custom-label"
                        name="share"
                        label="Status"
                      >
                        <Input
                          className="inputEl"
                          disabled
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <Form.Item>
                    <div className="flex items-between">
                      <Button
                        style={{
                          height: 35,
                          width: '78%',
                          marginRight: '12px',
                        }}
                        type="primary"
                        htmlType="submit"
                      >
                        UPDATE
                      </Button>
                      <Button
                        style={{
                          height: 35,
                          width: '18%',
                          background: 'white',
                        }}
                        onClick={e => showPromiseConfirmShare(e)}
                      >
                        PUBLISH
                      </Button>
                      <Button
                        style={{
                          height: 35,
                          width: '18%',
                          background: 'white',
                        }}
                        onClick={e => showPromiseConfirmUnshare(e)}
                      >
                        UNPUBLISH
                      </Button>
                    </div>
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

export default HRUpdatePost;
