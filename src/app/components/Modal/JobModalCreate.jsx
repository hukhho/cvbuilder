/* eslint-disable */

import { Dialog, Switch, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
// import './setting.css';
// import './input.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import createResumeService from './createResumeService';
import { Form, Input, Select, notification } from 'antd';
import { createJobDescription, updateJobDescription } from './updateJobDescription';
import { getAllExperiences } from '@/app/resume/[id]/experience/experienceService';
import TextArea from 'antd/es/input/TextArea';

const JobModalCreate = ({ onCreated, cvId, title, description, options }) => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message) => {
    api.info({
      message: 'Notification',
      description: message,
      placement,
    });
  };
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [form] = Form.useForm();

  const [disabled, setDisabled] = useState(false);
  const [isSetData, setIsSetData] = useState(false);

  useEffect(() => {
    if (title && description && !isSetData) {
      const mockData = {
        title: title,
        description: description,
      };
      const initialData = mockData;
      form.setFieldsValue(initialData);
      setIsSetData(true);
    }
  }, [title, description, form]);

  const [selectedOption, setSelectedOption] = useState();
  useEffect(() => {
    console.log(selectedOption)
  }, [selectedOption])
  const handleChange = value => {
    setSelectedOption(value);

    // Assuming 'value' is a string that needs to be compared, parse it to an integer first.
    const valueToFind = parseInt(value, 10);

    // Now, find the option where the parsed integer value of option.value matches valueToFind.
    const option = options.find(option => parseInt(option?.value, 10) === valueToFind);

    // 'option' will be the object from the options array where the value matches, or undefined if no match is found.

    console.log('option', option);

    console.log(`selected ${value}`);
    form.setFieldValue('title', option?.title);
    form.setFieldValue('description', option?.description);
  };
  const [enabled, setEnabled] = useState(false);
  const resetFormState = () => {
    form.resetFields();
    setSelectedOption(undefined);
    setEnabled(false);
  };
  const toggle = () => {
    setDisabled(!disabled);
  };

  function closeModal() {
    // const mockData = {
    //   title: title,
    //   description: description,
    // };
    // const initialData = mockData;
    // form.setFieldsValue(initialData);
    console.log('closeModal');
    setIsSetData(false);
    resetFormState();
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
    console.log('setSelectedOption null');
    setSelectedOption(undefined);
    const mockData = {
      title: title,
      description: description,
    };
    const initialData = mockData;
    form.setFieldsValue(initialData);
  }

  const handleInputChange = event => {
    const { id, value } = event.target;
    console.log('id value: ', id, value);
    if (id === 'description') {
      setInputValue(event.target.value);
    }
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleTextareaInput = event => {
    const textarea = event.target;
    textarea.style.height = 'auto'; // Reset the height to auto to recalculate the scroll height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height
  };

  const handleSubmit = async values => {
    try {
      console.log('summary page: submit: ', values);
      const result = await createJobDescription(cvId, values);
      notification.success({
        message: `Save changed`,
      }); // console.log(summary, result);
      onCreated();
      closeModal();
    } catch (error) {
      notification.error({
        message: `Submit. Error: ${error}`,
      });
      console.log('Submit. Error:', error);
    }
  };
  const handleFormSubmit = async event => {
    event.preventDefault();
    // Here you can perform any actions with the form data, such as sending it to the server
    console.log('Form data submitted:', formData);

    try {
      const result = await createJobDescription(cvId, formData);
      openNotification('bottomRight', `Create: ${result.id}`);
      onCreated();
      closeModal();
    } catch (error) {
      console.log('Error: ', error.response.data);
      if (error.response && error.response.status === 400 && error.response.data) {
        // The server returned a 400 status code with an error message
        const errorMessage = error.response.data;
        openNotification('bottomRight', `Error: ${errorMessage}`);
      } else {
        // Handle other types of errors
        openNotification('bottomRight', `Error: ${error.message}`);
      }
    }
  };
  return (
    <>
      {contextHolder}
      <div className="inset-0 flex items-center justify-center">
        <button
          data-size="default"
          data-theme="default"
          data-busy="false"
          className="form-submission button cta "
          id="create-resume-form-submitted"
          type="submit"
          onClick={openModal}
        >
          Create Job Description
        </button>
      </div>

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
                <Dialog.Panel
                  style={{ witdh: 1000 }}
                  className="relative transform rounded-lg bg-white text-left align-middle shadow-sm transition-all  opacity-100 scale-100"
                >
                  <Dialog.Title
                    as="h2"
                    className="w-full flex leading-7 text-xl font-semibold bg-slate-50 rounded-t-lg text-gray-900 items-center px-6 py-5 border-b border-slate-200"
                  >
                    <div className="grow font-semibold">Create Job Description</div>
                    <i className="fal fa-times cursor-pointer" aria-hidden="true" />
                  </Dialog.Title>

                  <div className="p-6">
                    <Form
                      onFinish={handleSubmit}
                      form={form}
                      layout="vertical"
                      autoComplete="off"
                      requiredMark={false}
                    >
                      <div className="flex mb-10">
                        <Switch
                          checked={enabled}
                          onChange={setEnabled}
                          className={`${
                            enabled ? 'bg-blue-600' : 'bg-gray-200'
                          } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                          <span
                            className={`${
                              enabled ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                          />
                        </Switch>{' '}
                        <div className="ml-10 flex">
                          <span className="text-gray-300" style={{ fontSize: 13 }}>
                            Choose from job list
                          </span>
                        </div>
                      </div>

                      {enabled && (
                        <Form.Item
                          name="jobPostingId"
                          label={
                            <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs  text-gray-600">
                              <div className="flex gap-2 items-center text-xs">
                                CHOOSE THE TARGET JOB *
                              </div>
                            </label>
                          }
                        >
                          {enabled && (
                            <Select
                              style={{
                                height: 50,
                                width: '100%',
                                minWidth: 700,
                                maxWidth: 1000,
                              }}
                              className=""
                              rules={[{ required: true }]}
                              value={selectedOption}
                              onChange={handleChange}
                              options={options}
                            />
                          )}
                        </Form.Item>
                      )}
                      {((enabled && selectedOption) || (!enabled)) && (
                        <>
                          {' '}
                          <Form.Item
                            style={{
                              marginTop: '-20px',
                              minWidth: 700,
                              maxWidth: 1000,
                            }}
                            name="title"
                            rules={[{ required: true }]}
                            label={
                              <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs  text-gray-600">
                                <div className="flex gap-2 items-center text-xs">JOB TITLE *</div>
                              </label>
                            }
                          >
                            <Input
                              style={{
                                marginTop: '-10px',
                                height: 50,
                                width: '100%',
                              }}
                              className="inputEl st-current"
                              placeholder="Java Developer"
                            />
                          </Form.Item>
                          <Form.Item
                            style={{
                              display: 'none',
                              marginTop: '-20px',
                              minWidth: 700,
                              maxWidth: 1000,
                            }}
                            name="company"
                            label={
                              <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs  text-gray-600">
                                <div className="flex gap-2 items-center text-xs">COMPANY</div>
                              </label>
                            }
                          >
                            <Input
                              style={{
                                marginTop: '-10px',
                                height: 50,
                                width: '100%',
                              }}
                              className="inputEl st-current"
                              placeholder="Google"
                            />
                          </Form.Item>
                          <Form.Item
                            style={{
                              marginTop: '-20px',
                            }}
                            name="description"
                            label={
                              <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs  text-gray-600">
                                <div className="flex gap-2 items-center text-xs">DESCRIPTION</div>
                              </label>
                            }
                          >
                            <TextArea
                              style={{
                                marginTop: '-10px',
                                height: 50,
                                width: '100%',
                              }}
                              autoSize={{
                                minRows: 3,
                                maxRows: 5,
                              }}
                              className="inputEl st-current"
                              placeholder="Description"
                            />
                          </Form.Item>
                        </>
                      )}

                      <button
                        href=""
                        data-size="large"
                        data-theme="default"
                        data-busy="false"
                        className="summary-section button"
                        id="summary-section-save-to-list"
                        type="submit"
                      >
                        SAVE
                      </button>
                    </Form>
                    {/* <form onSubmit={handleFormSubmit}>
                      
                      <div className="input">
                        <label
                          className="!leading-[15px] !mb-3 label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600"
                          htmlFor="resumeName" // Add htmlFor with the correct id
                        >
                          <div className="flex gap-2 items-center">
                            <span>Job title</span> *
                          </div>
                          <div id="null-portal-root" />
                        </label>
                        <div className="relative">
                          <input
                            name="title"
                            className="inputEl new-resume-form"
                            id="title" // Add id attribute here
                            required=""
                            aria-label="Job title"
                            defaultValue=""
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="input ">
                          <label
                            className="!leading-[15px] !mb-3 label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600"
                            htmlFor="description"
                          >
                            <div className="flex gap-2 items-center">
                              <span>Job Description </span>
                            </div>
                            <div id="description-portal-root" />
                          </label>
                          <div className="relative">
                            <textarea
                              className="inputEl new-resume-form"
                              id="description"
                              aria-label="Job Description "
                              rows={3}
                              onChange={handleInputChange}
                              onInput={handleTextareaInput}
                              value={inputValue}
                              style={{
                                height: 'auto',
                                overflow: 'hidden',
                                resize: 'none',
                                maxHeight: 200,
                                overflowY: 'auto',
                                background: 'white',
                                height: 120,
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        data-size="default"
                        data-theme="default"
                        data-busy="false"
                        className="form-submission button cta "
                        id="create-resume-form-submitted"
                        type="submit"
                      >
                        Save
                      </button>
                    </form> */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default JobModalCreate;
