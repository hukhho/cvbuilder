/* eslint-disable */

import { Dialog, Switch, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Button, Form, Input, Select, Spin, notification } from 'antd';
import './card.css';
import './button.css';
import { createReview } from './reviewService';
import { LoadingOutlined } from '@ant-design/icons';
import useStore from '@/store/store';
import { useAuth0 } from '@auth0/auth0-react';

export default function ReviewNewModal({ onCreated, resumes, expert }) {
  const [api, contextHolder] = notification.useNotification();


  const { isLoading, isAuthenticated, error, user, getAccessTokenSilently } = useAuth0();
  const { setMessage, setEmail, setAvatar, setUserRole, setBalance } = useStore();

  const refreshMoney = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      localStorage.setItem('accessToken', accessToken); // This is fine to keep in client-side code
      console.log('accessToken: ', accessToken);
      const { data } = await getProtectedResource(accessToken);
      console.log('data: ', data);
      // Save user data to localStorage
      localStorage.setItem('email', data.email);
      localStorage.setItem('avatar', data.avatar);
      localStorage.setItem('userId', data.id);
      localStorage.setItem('userRole', data.role.roleName);
      // Update Zustand store with user data
      setEmail(data.email);
      setAvatar(data.avatar);
      setBalance(data.accountBalance);
      setUserRole(data.role.roleName);
 
    } catch (fetchError) {
      console.error('Fetching user data error:', fetchError);
      setMessage(JSON.stringify(fetchError, null, 2));
    }
  };

  // useEffect(() => {
  //   // if (error) {
  //   //   console.error('Auth0 error:', error);
  //   //   setMessage(JSON.stringify(error, null, 2));
  //   //   router.push('/error');
  //   // } else if (isAuthenticated && !isLoading) {
  //   //   refreshMoney();
  //   // }
  //   refreshMoney();

  // }, []);



  const { balance, refreshBalance } = useStore();

  // useEffect(() => {
  //   if (balance === -1) {
  //     refreshBalance();
  //   }
  // }, [balance, refreshBalance]);


  const openNotification = (placement, message) => {
    api.info({
      message: 'Notification',
      description: message,
      placement,
    });
  };
  console.log('price: ', expert?.price);
  const [form] = Form.useForm();

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [enabled, setEnabled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [resumeId, setResumeId] = useState();
  const handleChangeResume = value => {
    setResumeId(value);
  };
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // Handle change for standard select elements
  const handleSelectChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Handle change for input
  const handleInputChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleTextareaInput = event => {
    const textarea = event.target;
    textarea.style.height = 'auto'; // Reset the height to auto to recalculate the scroll height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height
  };

  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (expert?.price) {
      console.log('useEffect: ', expert);

      const prices = expert?.price;

      const today = new Date();
      const newOptions = prices.map(price => {
        const daysToAdd = price.day;

        const newDate = new Date(today);
        newDate.setDate(today.getDate() + daysToAdd);

        const newDateStr = newDate.toISOString().split('T')[0];
        // const parsedPrice = parseFloat(price.price); // Assuming price.price is a string representation of a number
        // const formattedPrice = new Intl.NumberFormat('vi-VN', {
        //   style: 'currency',
        //   currency: 'VND',
        // }).format(parsedPrice);

        return {
          value: price.id,
          metadata: `${price.day}-d`,
          label: `${price.day} days (${newDateStr}) - ${price.price} đ`,
        };
      });

      setOptions(newOptions);
      console.log('newOptions: ', newOptions);
    }
  }, [expert]);

  const resumeOptions = resumes.map(resume => ({
    value: resume.id,
    label: resume.resumeName,
  }));
  const onFinish = async values => {
    // console.log('resumeId: ', resumeId);

    // values.deadline = convertedDate.toISOString();
    console.log(values);
    try {
      setIsSubmitting(true);
      const result = await createReview(values.resume, expert.id, values.optionId, values);
      openNotification('bottomRight', `Send request successful.`);
      setIsOpen(false);
      refreshBalance();
    } catch (error) {
      openNotification('bottomRight', `Error: ${error.response.data}`);
    } finally {
      setIsSubmitting(false);
      // refreshMoney();
    }
  };
  return (
    <>
      {contextHolder}
      <div className="inset-0 flex items-start justify-center ">
        <button
          style={{ width: '300px' }}
          href=""
          data-size="default"
          data-theme="default"
          data-busy="false"
          className="cta-button button cta "
          id="navi-create-new-resume"
          onClick={openModal}
        >
          <i className="fad fa-file-plus" aria-hidden="true" />
          <span> Request Review</span>
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className=" relative z-10" onClose={closeModal}>
          <div className="" style={{ width: 900 }}>
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
                  <Dialog.Panel
                    style={{ width: 900 }}
                    className="z-99 relative transform rounded-lg  text-left align-middle shadow-sm transition-all opacity-100 scale-100"
                  >
                    <button
                      className="absolute btn btn-sm btn-circle right-7 top-16"
                      onClick={() => closeModal()}
                    >
                      ✕
                    </button>
                    <div className="container px-4 py-6">
                      <div className="!p-0 mb-5 mt-9 card">
                        <div className="flex ">
                          <div className="bg-rezi-blue text-white p-9 rounded-l-lg w-[30%]">
                            <h5 className="uppercase mb-1 text-xs text-yellow-400">
                              Your Selection
                            </h5>
                            <div>
                              <h1 className="text-4xl">
                                {/* <sup className="text-sm align-top top-0"> total</sup> */}
                              </h1>
                              <span className="text-xs mt-1 mb-6 leading-4 block"></span>
                            </div>
                            <ul className="mb-6">
                              <li className="text-xs mb-2 py-0.5 min-w-[200px]">
                                <FontAwesomeIcon icon={faCheck} className="mr-1 text-[#48c9b0]" />
                                Score 90 or above
                              </li>
                              <li className="text-xs mb-2 py-0.5 min-w-[200px]">
                                <FontAwesomeIcon icon={faCheck} className="mr-1 text-[#48c9b0]" />{' '}
                                Corrected Formatting
                              </li>
                              <li className="text-xs mb-2 py-0.5 min-w-[200px]">
                                <FontAwesomeIcon icon={faCheck} className="mr-1 text-[#48c9b0]" />{' '}
                                Analyzed Content
                              </li>
                              <li className="text-xs mb-2 py-0.5 min-w-[200px]">
                                <FontAwesomeIcon icon={faCheck} className="mr-1 text-[#48c9b0]" />{' '}
                                Improved Grammar
                              </li>
                            </ul>
                            <hr className="mb-6" />
                            <h4>Questions?</h4>
                            <span className="text-xs mt-1 mb-6 leading-4 block">
                              <a target="_blank" style={{ color: 'white' }}>
                                Frequent Questions &amp; Answers{' '}
                                <i className="fad fa-chevron-right" aria-hidden="true" />
                              </a>
                            </span>
                          </div>
                          <div className="p-9 w-[70%]" style={{ color: 'black' }}>
                            <h2>Resume Review</h2>
                            <p>
                              A expert can help you polish your resume into exactly what recruiters
                              are looking for. We'll correct all formatting, content, and grammar
                              errors directly in your resume.
                            </p>
                            <div>
                              <Form
                                form={form}
                                name="control-hooks"
                                onFinish={onFinish}
                                style={{
                                  marginTop: 50,
                                  maxWidth: 900,
                                }}
                                layout="vertical"
                                requiredMark={false}
                              >
                                <Form.Item
                                  name="resume"
                                  rules={[
                                    {
                                      required: true,
                                    },
                                  ]}
                                  label={
                                    <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
                                      <div className="flex gap-2 items-center text-xs">
                                        <span>
                                          <strong>Select resume for review *</strong>
                                        </span>
                                      </div>
                                    </label>
                                  }
                                >
                                  <Select size="large" options={resumeOptions} />
                                </Form.Item>
                                <Form.Item
                                  name="optionId"
                                  label={
                                    <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
                                      <div className="flex gap-2 items-center text-xs">
                                        <span>
                                          <strong>Deadline *</strong>
                                        </span>
                                      </div>
                                    </label>
                                  }
                                  rules={[
                                    {
                                      required: true,
                                    },
                                  ]}
                                >
                                  <Select size="large" options={options} />
                                </Form.Item>

                                <Form.Item
                                  name="note"
                                  label={
                                    <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
                                      <div className="flex gap-2 items-center text-xs">
                                        <span>
                                          <strong>Note</strong>
                                        </span>
                                      </div>
                                    </label>
                                  }
                                >
                                  <Input />
                                </Form.Item>

                                <Form.Item>
                                  {isSubmitting && (
                                    <Spin
                                      indicator={
                                        <LoadingOutlined
                                          style={{
                                            fontSize: 24,
                                            marginRight: 10,
                                          }}
                                          spin
                                        />
                                      }
                                    />
                                  )}
                                  <Button disabled={isSubmitting} type="primary" htmlType="submit">
                                    Submit
                                  </Button>
                                </Form.Item>
                              </Form>
                              {/* <form>
                                <div className="mb-4 relative w-full mt-2">
                                  <div className="flex justify-between">
                                    <label
                                      tabIndex={0}
                                      role="group"
                                      className="mb-3 uppercase flex items-center text-xs leading-[15px] text-[#565656] font-normal"
                                    >
                                      <span>Select Resume For Review</span> *
                                    </label>
                                  </div>
                                  <div className="relative">
                                    <select
                                      name="resumeId"
                                      className="border-2 border-grey-50 border-solid py-3 rounded m0 text-[1rem] leading-[1.5rem] w-full min-h-[38px] w-full font-semibold transition-colors text-[#b5b9bf] border-grey-50 hover:border-grey-300"
                                      style={{ fontWeight: 600 }}
                                    >
                                      <option value="placeholder" disabled="">
                                        Resume name
                                      </option>
                                      {resumes?.map((resume, index) => (
                                        <option value={resume.id} key={index}>
                                          {resume.resumeName}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                                <div className="flex items-start justify-between w-full">
                                  <div className="w-[calc(50%_-_1em)]">
                                    <div className="mb-4 relative undefined">
                                      <div className="flex justify-between">
                                        <label
                                          tabIndex={0}
                                          role="group"
                                          className="mb-3 uppercase flex items-center text-xs leading-[15px] text-[#565656] font-normal"
                                        >
                                          <span>Select Resume For Review</span> *
                                        </label>
                                      </div>
                                      <div className="relative">
                                        <select
                                          name="receivedDate"
                                          className="border-2 border-grey-50 border-solid py-3 rounded m0 text-[1rem] leading-[1.5rem] w-full min-h-[38px] w-full font-semibold transition-colors text-grey-900 border-grey-50 hover:border-grey-300"
                                          style={{ fontWeight: 600 }}
                                        >
                                        
                                          {options?.map(option => (
                                            <option key={option.value} value={option.value}>
                                              {option.label}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="my-4">
                                  <label
                                    className="!leading-[15px] !mb-3 label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600"
                                    htmlFor="zdki8"
                                  >
                                    <div className="flex gap-2 items-center">
                                      <span>Notes for reviewer</span>
                                    </div>
                                    <div id="null-portal-root" />
                                  </label>
                                  <div className="relative">
                                    <input
                                      name="note"
                                      className="inputEl  src-components-Form-Field--Es8ORQL2ofo= "
                                      id="cpnzdd"
                                      aria-label="Notes for reviewer"
                                      placeholder="Explain anything you'd like us to know for the review."
                                      defaultValue=""
                                    />
                                  </div>
                                </div>
                                <div>
                                  <button
                                    type="submit"
                                    data-busy="false"
                                    className="text-white disabled:bg-gray-100 font-[700] uppercase disabled:text-gray-300 focus:ring-0 focus:outline-none  mt-8 bg-rezi-blue text-white px-4 py-2 rounded-[.5em] text-[.7rem]"
                                    style={{ background: 'var(--color-primary)' }}
                                  >
                                    Submit
                                  </button>
                                </div>
                              </form> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
