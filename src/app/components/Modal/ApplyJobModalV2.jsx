/* eslint-disable */

import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Button, Form, Input, Select, Spin, Switch, notification } from 'antd';
import './card.css';
import '../../components/Form/customtext.css';
// import './button.css';
import { applyJob, createReview } from './reviewService';
import { LoadingOutlined } from '@ant-design/icons';
import SuccessJob from './SuccessJob';
import Link from 'next/link';
import createCoverLetterService from './createCoverLetterService';
import { useRouter } from 'next/navigation';

export default function ApplyJobModalV2({
  onCreated,
  resumeOptions,
  coverOptions,
  jobId,
  cvId,
  coverLetterId,
  jobTitle,
  handleSuccess,
}) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const coverLetterIdInt = parseInt(coverLetterId, 10);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedResume, setSelectedResume] = useState();
  const [selectedCover, setSelectedCover] = useState();

  const [enabled, setEnabled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [resumeId, setResumeId] = useState();

  const [disabled, setDisabled] = useState(false);

  const toggle = () => {
    setDisabled(!disabled);
  };

  const handleChangeResume = value => {
    setResumeId(value);
  };
  function closeModal() {
    setIsOpen(false);
    setSelectedResume();
    setSelectedCover();
  }

  function openModal() {
    setSelectedResume(cvId);
    setSelectedCover(coverLetterIdInt);
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
    // console.log("coverLetterId: ", coverLetterId)
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
      notification.success({
        message: 'Success',
      });
      setIsOpen(false);
      handleSuccess();
    } catch (error) {
      notification.error({
        message: `Error: ${error?.response?.data}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onChangeResume = value => {
    console.log('onChangeResume: ', value);
    console.log('coverOptions: ', coverOptions);

    setSelectedResume(value);
  };
  const nameOfSelectedResume = resumeOptions?.find(
    resume => resume.value === selectedResume,
  )?.label;

  const onChangeCover = value => {
    console.log('onChangeCover: ', value);
    setSelectedCover(value);
  };

  const handleCreateNewCoverLetter = async () => {
    // Here you can perform any actions with the form data, such as sending it to the server
    // const submitData123 = { selectedResume: selectedResume, jobId: jobId, jobTitle: jobTitle };
    // console.log('Form data submitted: ', submitData123);
    // console.log('jobTitle: ', jobTitle);
    try {
      const timestamp = new Date().getTime();

      const submitData = { title: `Cover letter for ${jobTitle} - ${timestamp}` };
      const result = await createCoverLetterService(selectedResume, submitData);
      notification.success({
        message: 'Success',
      });
      console.log('result: ', result);

      // router.push(`/cover-letter/${result.id}/contact?jobId=${jobId}&isApplyProcess=true`);
      // Open the new tab using window.open
      const newTab = window.open(
        `/cover-letter/${result.id}/contact?jobId=${jobId}&isApplyProcess=true`,
        '_blank',
      );

      // Check if the new tab was successfully opened
      if (newTab) {
        // Close the new tab's reference to the current tab to avoid circular references
        newTab.opener = null;
      }
    } catch (error) {
      notification.error({
        message: `Error: ${error?.response?.data}`,
      });
    }
  };
  return (
    <>
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
                    style={{ width: 1000 }}
                    className="z-99 relative transform rounded-lg  text-left align-middle shadow-sm transition-all opacity-100 scale-100"
                  >
                    <div className="container px-4 py-6">
                      <div className="!p-0 mb-5 mt-9 card">
                        <div className="flex  justify-center">
                          <div className="p-9" style={{ width: 1200, color: 'black' }}>
                            <h2>Apply job for {jobTitle}</h2>
                            <p>Apply for the job.</p>
                            <div>
                              {coverLetterIdInt && cvId && (
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
                                  initialValues={{ resume: cvId, coverletter: coverLetterIdInt }}
                                >
                                  <Form.Item
                                    className="custom-label-normal"
                                    name="resume"
                                    label="Select Resume *"
                                    rules={[
                                      {
                                        required: true,
                                      },
                                    ]}
                                  >
                                    <Select
                                      className=""
                                      style={{ width: '100%', height: 50 }}
                                      value={selectedResume}
                                      defaultValue={cvId}
                                      disabled={true}
                                      onChange={onChangeResume}
                                      options={resumeOptions}
                                    />
                                  </Form.Item>

                                  <>
                                    {' '}
                                    <div className="flex mt-10 mb-5">
                                      {/* <Switch className="mr-2" onClick={toggle} value={disabled} /> */}
                                      {/* <span className="" style={{ fontSize: 13 }}>
                                        Choose from existed cover letter
                                      </span> */}
                                    </div>
                                    {/* {disabled && (
                                      <button
                                        type="button"
                                        style={{ color: 'blue' }}
                                        onClick={handleCreateNewCoverLetter}
                                        class="mb-5"
                                      >
                                        Create new cover letter for this job with resume{' '}
                                        {nameOfSelectedResume}
                                      </button>
                                    )} */}
                                    <Form.Item
                                      className="custom-label-normal"
                                      name="coverletter"
                                      onChange={onChangeCover}
                                      label="select Cover Letter "
                                    >
                                      <Select
                                        style={{ width: '100%', height: 50 }}
                                        options={coverOptions}
                                        disabled={true}
                                        value={selectedCover}
                                        defaultValue={coverLetterIdInt}
                                      />
                                    </Form.Item>
                                  </>

                                  {/* {coverLetterId ? coverLetterId : 'null'} */}

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
                              )}

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
