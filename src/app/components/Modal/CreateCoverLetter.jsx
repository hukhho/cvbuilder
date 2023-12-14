/* eslint-disable */

import { Dialog, Switch, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import './setting.css';
import './input.css';
import './coverletter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import createResumeService from './createResumeService';
import { Card, Image, Select, notification } from 'antd';
import createCoverLetterService from './createCoverLetterService';
import Meta from 'antd/es/card/Meta';

export default function CreateCoverLetter({ onCreated, listResumes }) {
  const [api, contextHolder] = notification.useNotification();
  const dropdownOptions = listResumes.map(resume => ({
    value: resume.id,
    label: resume.resumeName,
  }));
  const openNotification = (placement, message) => {
    api.info({
      message: 'Thong bao',
      description: message,
      placement,
    });
  };
  const [isOpen, setIsOpen] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [formData, setFormData] = useState({
    title: '',
  });

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

  const [cvId, setCvId] = useState();
  const [isFormValid, setIsFormValid] = useState(true);
  const handleChange = value => {
    console.log(`selected ${value}`);
    setCvId(value);
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
    // Here you can perform any actions with the form data, such as sending it to the server
    console.log('Form data submitted:', formData);

    try {
      const submitData = { title: inputValue };
      const result = await createCoverLetterService(cvId, submitData);
      openNotification('bottomRight', `Create: ${result.id}`);
      onCreated();
      closeModal();
    } catch (error) {
      openNotification('bottomRight', `Error: ${error}`);
    }
  };
  return (
    <>
      {contextHolder}
      <div className="inset-0 flex items-center justify-center">
        {/* <Card
          hoverable
          onClick={openModal}
          style={{ width: 240, background: '#fbfbfb' }} // Adjust this value based on your needs
        >
          <div>
            <div style={{ position: 'relative', width: 200, height: 200, alignContent: 'center' }}>
              Create new cover letter
            </div>
            <Meta title="" description="cover letter" />
          </div>
        </Card> */}
        <div hoverable={true} onClick={openModal} class="src-containers-Dashboard--oPXEIf9zEiA=">
          <div id="on-screen-create-new-resume" class="cta-button resumeCta">
            <span class="resumeCta-label">Create new Cover Letter</span>
          </div>
        </div>
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
                <Dialog.Panel className="relative w-full transform rounded-lg bg-white text-left align-middle shadow-sm transition-all max-w-md opacity-100 scale-100">
                  <Dialog.Title
                    as="h2"
                    className="w-full flex leading-7 text-xl font-semibold bg-slate-50 rounded-t-lg text-gray-900 items-center px-6 py-5 border-b border-slate-200"
                  >
                    <div className="grow font-semibold">Create a cover letter</div>
                    <i className="fal fa-times cursor-pointer" aria-hidden="true" />
                  </Dialog.Title>
                  <div className="p-6">
                    <form onSubmit={handleFormSubmit}>
                      <div className="">
                        <label
                          className="!leading-[0px] !mb-3 label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600"
                          htmlFor="resumeName" // Add htmlFor with the correct id
                        >
                          <div className="flex gap-2 items-center">
                            <span>Choose CV</span> *
                          </div>
                          <div id="null-portal-root" />
                        </label>
                        <div className="relative">
                          <Select
                            style={{
                              width: '100%',
                            }}
                            name="cvId"
                            onChange={handleChange}
                            options={dropdownOptions}
                          />
                        </div>
                      </div>
                      <div className="input">
                        <label
                          className="!leading-[15px] !mb-3 label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600"
                          htmlFor="resumeName" // Add htmlFor with the correct id
                        >
                          <div className="flex gap-2 items-center">
                            <span>Cover letter title</span> *
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
                            defaultValue=""
                          />
                        </div>
                      </div>

                      <button
                        href=""
                        disabled={!isFormValid}
                        data-size="default"
                        data-theme="default"
                        data-busy="false"
                        className="form-submission button cta "
                        id="create-resume-form-submitted"
                        type="submit"
                      >
                        Create
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
