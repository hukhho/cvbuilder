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
  Radio,
  Select,
  Space,
  Switch,
  TreeSelect,
  Typography,
  notification,
} from 'antd';
import '../../components/Form/customtext.css';
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
import { getHrConfig, postHrDraft, postHrPublic } from '../hrServices';
import SuccessModalHrPost from '@/app/components/Modal/SuccessModalHrPost';
import { useRouter } from 'next/navigation';
import HeaderHR from '@/app/components/HeaderHR';
import useStore from '@/store/store';
import { Dialog, Transition } from '@headlessui/react';
import dayjs from 'dayjs';

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
  const { avatar, email, userRole } = useStore();

  const [form] = Form.useForm();

  const [deadlineString, setDeadlineString] = useState('');
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
        workingType: 'Full Time',
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

  const [salaryName, setSalaryName] = useState("You'll love it");
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

  const [isLimited, setIsLimited] = useState(false);

  const onChangeSwitch = checked => {
    console.log(`switch to ${checked}`);
    setIsLimited(checked);
  };

  const [openSuccess, setOpenSuccess] = useState(false);

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const onFinish = async values => {
    // values.salary = salaryName;
    if (deadlineString === '') {
      notification.error({
        message: 'Please select a deadline',
      });
      return;
    }

    values.deadline = deadlineString;
    values.isLimited = isLimited;
    if (!isLimited) {
      values.applyAgain = 99;
    }
    console.log('Form data:', values);
    try {
      const result = await postHrPublic(values);
      notification.success({
        message: 'Save changed',
      });
      setIsOpen(true);
    } catch (error) {
      notification.error({
        message: 'Save error',
      });
    }
  };

  const saveDraft = async values => {
    values.salary = salaryName;
    values.deadline = deadlineString;
    // Make an API call to save the draft on the server
    try {
      const result = await postHrDraft(values); // You should implement this function
      // Handle the result, e.g., show a success message
      console.log('Draft saved:', result);
      // setIsOpen(true);
      notification.success({
        message: 'Save changed',
      });
    } catch (error) {
      // Handle the error
    }
  };

  const router = useRouter();

  const handleClick = e => {
    e.preventDefault();
    router.push('/hr/list');
  };

  const validateDate = (_, date) => {
    // Convert the selected date to a moment object
    const selectedDate = moment(date);

    // Get today's date
    const today = moment();

    // Check if the selected date is greater than or equal to today's date
    if (selectedDate.isSameOrAfter(today, 'day')) {
      return Promise.resolve();
    } else {
      return Promise.reject('The date must be greater than or equal to today');
    }
  };

  // eslint-disable-next-line arrow-body-style
  // const disabledDate = (current) => {
  //   // Can not select days before today and today
  //   return current && current < dayjs().endOf('day');
  // };
  const disabledDate = current => {
    // Disable dates before today and more than 60 days in the future
    return (
      current &&
      (current < moment().endOf('day') || current > moment().add(60, 'days').endOf('day'))
    );
  };

  return (
    <ConfigProvider>
      <UserLayout
        selected="3"
        isCollapsed={false}
        avatar={avatar}
        email={email}
        userRole={userRole}
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
                                  router.push('/hr/list');
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
                  <Title level={4}>Create a job posting</Title>
                  <p>Create a job posting that help users ...</p>
                </Card>
              </div>
              <div className="mt-16" style={{ width: 900 }}>
                <Form
                  layout="vertical"
                  initialValues={{
                    size: 'large',
                    workingType: 'Full Time', // Set the default value here
                    applyAgain: 1,
                    salary: 'From 1,000$ to 2,000$',
                    isLimited: isLimited,
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
                  {/* <Form.Item className="custom-label" name="" label="SALARY">
                    <Select
                      style={{
                        width: 350,
                        height: 50,
                      }}
                      value={salaryOptions}
                      onChange={handleChangeSelectSalary}
                      defaultValue={1}
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
                  </Form.Item> */}

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
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: 'Please select a deadline',
                      //   },
                      // ]}
                      label="Deadline *"
                    >
                      <DatePicker
                        style={{ height: '60px', marginTop: -10, marginBottom: 0 }}
                        className="inputEl"
                        format="YYYY-MM-DD"
                        disabledDate={disabledDate}
                        onChange={onChangeDate}
                      />
                    </Form.Item>

                    <div className="custom-item custom-label">
                      <div className="">
                        <Form.Item name="isLimited" style={{ marginTop: -10, marginBottom: 0 }}>
                          <Switch
                            value={isLimited}
                            defaultChecked={isLimited}
                            onChange={onChangeSwitch}
                          />
                          <span className="ml-4">LIMIT CANDIDATE'S APPLYING PER JOB</span>
                        </Form.Item>
                      </div>

                      <Form.Item className="" styles={{ marginTop: -10 }} name="applyAgain">
                        {isLimited && (
                          <InputNumber className="inputEl" defaultValue={1} min={1} type="number" />
                        )}
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
                        PUBLISH THE JOB
                      </Button>
                      <Button
                        style={{
                          height: 35,
                          width: '18%',
                          background: 'white',
                        }}
                        onClick={() => {
                          // Validate the form fields
                          form
                            .validateFields()
                            .then(values => {
                              // Validation successful, call the saveDraft function to save the draft
                              saveDraft(values);
                            })
                            .catch(errorInfo => {
                              // Validation failed, you can handle the error or display a message to the user
                              console.log('Validation failed:', errorInfo);
                            });
                        }}
                      >
                        SAVE DRAFT
                      </Button>{' '}
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

export default HRPost;
