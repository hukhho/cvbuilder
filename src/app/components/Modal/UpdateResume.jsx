/* eslint-disable */

import { Dialog, Switch, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import './setting.css';
import './input.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import createResumeService from './createResumeService';
import { notification } from 'antd';
import updateResumeService from './updateResumeService';

export default function UpdateResume({ isOpen, onOpenModal, onClose, onCreated, resume }) {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message) => {
    api.info({
      message: 'Notification',
      description: message,
      placement,
    });
  };

  useEffect(() => {
    console.log('Modal state:', isOpen);
  }, [isOpen]);

  const [enabled, setEnabled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [formData, setFormData] = useState({
    resumeName: '',
    jobTitle: '',
    companyName: '',
    jobDescription: '',
  });

  useEffect(() => {
    setFormData({
      resumeName: resume?.resumeName || '',
      jobTitle: resume?.jobTitle || '',
      companyName: resume?.companyName || '',
      jobDescription: resume?.jobDescription || '',
    });
  }, [resume]);

  function closeModal() {
    onClose();

  }


  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTextAreaChange = event => {
    setInputValue(event.target.value);

    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTextareaInput = event => {
    const textarea = event.target;
    textarea.style.height = 'auto'; // Reset the height to auto to recalculate the scroll height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
    // Here you can perform any actions with the form data, such as sending it to the server
    console.log('Form data submitted:', formData);

    try {
      formData.jobDescriptionTarget = formData.jobDescription;
      const result = await updateResumeService(resume.id, formData);
      notification.success({
        message: 'Save changed',
      });
      onCreated();
      closeModal();
    } catch (error) {
      notification.error({
        message: 'Error',
      });    }
  };
  return (
    <>
      {contextHolder}
      <div className="inset-0 flex items-center justify-center"></div>
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
                <Dialog.Panel className="relative w-full transform rounded-lg bg-white text-left align-middle shadow-sm transition-all max-w-md opacity-100 scale-100">
                  <Dialog.Title
                    as="h2"
                    className="w-full flex leading-7 text-xl font-semibold bg-slate-50 rounded-t-lg text-gray-900 items-center px-6 py-5 border-b border-slate-200"
                  >
                    <div className="grow font-semibold">Update a resume</div>
                    <i className="fal fa-times cursor-pointer" aria-hidden="true" />
                  </Dialog.Title>
                  <div className="p-6">
                    <form onSubmit={handleFormSubmit}>
                      <div className="input">
                        <label
                          className="!leading-[15px] !mb-3 label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600"
                          htmlFor="resumeName" // Add htmlFor with the correct id
                        >
                          <div className="flex gap-2 items-center">
                            <span>Resume name</span> *
                          </div>
                          <div id="null-portal-root" />
                        </label>
                        <div className="relative">
                          <input
                            name="resumeName"
                            className="inputEl new-resume-form"
                            id="resumeName" // Add id attribute here
                            required=""
                            onChange={handleInputChange}
                            aria-label="Resume name"
                            defaultValue={resume?.resumeName}
                          />
                        </div>
                      </div>
                      <br />

                      <br />

                      {/* <div style={{ position: 'relative' }}>
                        <div className="flex justify-between">
                          <h3 className="info-supp">Target your resume</h3>

                          <Switch
                            checked={enabled}
                            onChange={setEnabled}
                            className={`${
                              enabled ? 'bg-blue-600' : 'bg-gray-200'
                            } relative inline-flex h-6 w-11 items-center rounded-full mt-10`}
                          >
                            <span className="sr-only">Enable notifications</span>
                            <span
                              className={`${
                                enabled ? 'translate-x-6' : 'translate-x-1'
                              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                          </Switch>
                        </div>
                      </div> */}
                      {/* {!enabled && (
                        <div className="warning-target">
                          <i className="fas fa-check-circle" aria-hidden="true" />
                          <FontAwesomeIcon
                            style={{ color: '#48c9b0', marginRight: '10px' }}
                            icon={faCircleCheck}
                          />
                          <p>
                            A targeted resume is a resume tailored to a specific job opening. You
                            have a significantly higher chance of getting an interview when you make
                            it clear you have the experience required for the job.
                          </p>
                        </div>
                      )}

                      {enabled && (
                        <div>
                          <div className="input">
                            <label
                              className="!leading-[15px] !mb-3 label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600"
                              htmlFor="jobTitle"
                            >
                              <div className="flex gap-2 items-center">
                                <span>Job Title </span>
                              </div>
                              <div id="null-portal-root" />
                            </label>
                            <div className="relative">
                              <input
                                className="inputEl new-resume-form"
                                id="jobTitle"
                                name="jobTitle"
                                aria-label="Job Title "
                                defaultValue=""
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="input">
                            <label
                              className="!leading-[15px] !mb-3 label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600"
                              htmlFor="companyName"
                            >
                              <div className="flex gap-2 items-center">
                                <span>Company name</span>
                              </div>
                              <div id="null-portal-root" />
                            </label>
                            <div className="relative">
                              <input
                                className="inputEl new-resume-form "
                                id="companyName"
                                name="companyName"
                                aria-label="Company name"
                                defaultValue=""
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="input ">
                            <label
                              className="!leading-[15px] !mb-3 label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600"
                              htmlFor="jobDescription"
                            >
                              <div className="flex gap-2 items-center">
                                <span>Job Description </span>
                              </div>
                              <div id="jobDescription-portal-root" />
                            </label>
                            <div className="relative">
                              <textarea
                                className="inputEl new-resume-form"
                                id="jobDescription"
                                name="jobDescription"
                                aria-label="Job Description "
                                rows={3}
                                onChange={handleTextAreaChange}
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
                      )} */}
                      <button
                        href=""
                        data-size="default"
                        data-theme="default"
                        data-busy="false"
                        className="form-submission button cta "
                        id="create-resume-form-submitted"
                        type="submit"
                      >
                        Save
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
