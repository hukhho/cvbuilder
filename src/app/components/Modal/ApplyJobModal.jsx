/* eslint-disable */

import { Dialog, Switch, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Button, Form, Input, Select, Spin, notification } from 'antd';
import './card.css';
import '../../components/Form/customtext.css';
// import './button.css';
import { applyJob, createReview } from './reviewService';
import { LoadingOutlined } from '@ant-design/icons';
import SuccessJob from './SuccessJob';

export default function ApplyJobModal({
  onCreated,
  resumeOptions,
  coverOptions,
  jobId,
  handleSuccess,
}) {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message) => {
    api.info({
      message: 'Notification',
      description: message,
      placement,
    });
  };
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

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleTextareaInput = event => {
    const textarea = event.target;
    textarea.style.height = 'auto'; // Reset the height to auto to recalculate the scroll height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height
  };

  const [options, setOptions] = useState([]);
  useEffect(() => {
    // Get the current date
    const today = new Date();

    // Generate options
    const newOptions = [
      { value: null, metadata: '5-d', label: '5 days' },
      { value: null, metadata: '4-d', label: '4 days' },
      { value: null, metadata: '3-d', label: '3 days' },
      { value: null, metadata: '2-d', label: '2 days' },
      { value: null, metadata: '1-d', label: '1 day' },
    ].map(option => {
      const daysToAdd = parseInt(option.metadata, 10);

      const newDate = new Date(today);
      newDate.setDate(today.getDate() + daysToAdd);

      const newDateStr = newDate.toISOString().split('T')[0];
      option.value = newDateStr;
      option.label = `${option.label} (${newDateStr})`;

      return option;
    });

    setOptions(newOptions);
  }, []);

  const onFinish = async values => {
    console.log('values: ', values);
    try {
      setIsSubmitting(true);
      const result = await applyJob(jobId, values.resume, values.coverletter, values.note);
      openNotification('bottomRight', `Success: ${result}`);
      setIsOpen(false);
      handleSuccess();
    } catch (error) {
      console.log('error: ', error);
      openNotification('bottomRight', `Error: ${error}`);
      setIsOpen(false);
    } finally {
      setIsSubmitting(false);
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
          <span>Apply for this job</span>
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className=" relative z-10" onClose={closeModal}>
          <div className="bg-red-500" style={{ width: 5000 }}>
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
                    style={{ width: 550 }}
                    className="z-99 relative transform rounded-lg  text-left align-middle shadow-sm transition-all opacity-100 scale-100"
                  >
                    <div className="container px-4 py-6">
                      <div className="!p-0 mb-5 mt-9 card">
                        <div className="flex  justify-center">
                          <div className="p-9 w-[70%]" style={{ color: 'black' }}>
                            <h2>Select your CV and Cover Letter</h2>
                            <p>Choosing the suitable CV and Cover Letter to apply for the job.</p>
                            <div>
                              <Form
                                form={form}
                                name="control-hooks"
                                onFinish={onFinish}
                                layout="vertical"
                                style={{
                                  marginTop: 20,
                                  maxWidth: 900,
                                }}
                                requiredMark={false}
                              >
                                <Form.Item
                                  className="custom-label-normal"
                                  name="resume"
                                  label="Select Resume"
                                  rules={[
                                    {
                                      required: true,
                                    },
                                  ]}
                                >
                                  <Select
                                    className=""
                                    style={{ width: '100%', height: 50 }}
                                    options={resumeOptions}
                                  />
                                </Form.Item>
                                <Form.Item
                                  className="custom-label-normal"
                                  name="coverletter"
                                  label="select Cover Letter "
                                >
                                  <Select
                                    style={{ width: '100%', height: 50 }}
                                    options={coverOptions}
                                  />
                                </Form.Item>
                                {/* <Form.Item
                                  name="deadline"
                                  label="Deadline"
                                  rules={[
                                    {
                                      required: true,
                                    },
                                  ]}
                                >
                                  <Select style={{ width: 200 }} options={options} />
                                </Form.Item> */}

                                <Form.Item
                                  className="custom-label-normal"
                                  name="note"
                                  label="Notes for Hiring Manager"
                                  rules={[
                                    {
                                      required: true,
                                    },
                                  ]}
                                >
                                  <Input
                                    className="custom-search"
                                    placeholder="Anything you'd like us to express for the hiring manager"
                                  />
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
                                  <Button
                                    className="button cta width-fit"
                                    style={{ height: 35 }}
                                    disabled={isSubmitting}
                                    type="primary"
                                    htmlType="submit"
                                  >
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
