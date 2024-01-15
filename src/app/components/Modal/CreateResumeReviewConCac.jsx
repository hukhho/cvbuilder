/* eslint-disable */

import { Dialog, Switch, Transition } from '@headlessui/react';
import { Fragment, use, useEffect, useState } from 'react';
import './setting.css';
import './input.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import createResumeService from './createResumeService';
import { Input, Radio, Space, notification } from 'antd';
import { getFinishUp } from '@/app/resume/[id]/finishup/finishUpService';
import useStore from '@/store/store';

export default function CreateResumeReviewConCac({
  isOpen,
  setIsOpen,
  onCreated,
  onConfirm,
  cvId = null,
}) {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message) => {
    api.info({
      message: 'Notification',
      description: message,
      placement,
    });
  };
  // const [isOpen, setIsOpen] = useState(isOpenInit);
  const [enabled, setEnabled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [formData, setFormData] = useState({
    resumeName: '',
    jobTitle: '',
    companyName: '',
    jobDescription: '',
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setInputValue(value);
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

  // const handleFormSubmit = async event => {
  //   event.preventDefault();
  //   // Here you can perform any actions with the form data, such as sending it to the server
  //   console.log('Form data submitted:', formData);

  //   try {
  //     const result = await createResumeService(formData);
  //     // openNotification('bottomRight', `Create: ${result.id}`);
  //     notification.success({
  //       message: 'Created',
  //     });
  //     onCreated(result);
  //     closeModal();
  //   } catch (error) {
  //     console.log(error);
  //     notification.error({
  //       message: error?.response?.data || 'Something went wrong',
  //     });
  //   }
  // };

  const [value, setValue] = useState(1);
  const onChange = e => {
    setValue(e.target.value);
  };
  

  const { resumes, refreshResumes, finishUpData, refreshFinishUpData } = useStore();
  let isMounted = true;
  useEffect(() => {
    isMounted = true;
    if (!isMounted) {
      return;
    }
    const findResumeId = finishUpData.find(resume => resume.id == parseInt(cvId, 10));
    console.log('findResumeId: ', findResumeId);
    if (resumes.length === 0) {
      refreshResumes();

      // for (let i = 0; i < resumes.length; i++) {
      //   if (resumes[i].id == cvId) {
      //     refreshFinishUpData(cvId);
      //   }
      // }
    }
    return () => {
      isMounted = false;
    };
  }, []); // Dependency array should include cvId.
  const resumeName = resumes?.find(resume => resume?.id == cvId)?.resumeName;

  const handleFormSubmit = async () => {
    if (value === 2) {
      try {
        const result = await createResumeService(formData);
        // openNotification('bottomRight', `Create: ${result.id}`);
        notification.success({
          message: 'Created',
        });
        onCreated(result);
        closeModal();
      } catch (error) {
        console.log(error);
        notification.error({
          message: error?.response?.data || 'Something went wrong',
        });

        console.log('radio checked: ', value, cvId, inputValue);
      }
    } else if (value === 1) {
      try {
        onConfirm();
        closeModal();
      } catch (error) {
        console.log(error);
        notification.error({
          message: error?.response?.data || 'Something went wrong',
        });
      }
    }
  };

  // const confirmFinish = async () => {
  //   try {
  //     setIsOpen(true);
  //   } catch (error) {
  //     notification.error({
  //       message: `Finish create new resume. Error: ${error?.response?.data}`,
  //     });
  //     console.log('error: ', error);
  //   }
  // };
  // const showPromiseConfirm = () => {
  //   confirm({
  //     title: 'Do you want to create a new or overwrite to old resume with this data?',
  //     icon: <ExclamationCircleFilled />,
  //     content: 'When clicked the OK button, this will process with this data.',
  //     async onOk() {
  //       await confirmFinishNew();
  //     },
  //     onCancel() {},
  //   });
  // };

  return (
    <>
      {contextHolder}
      <div className="inset-0 flex items-center justify-center">
        {/* <button
          style={{ width: '208px' }}
          href=""
          data-size="default"
          data-theme="default"
          data-busy="false"
          className="cta-button button cta "
          id="navi-create-new-resume"
          onClick={openModal}
        >
          <i className="fad fa-file-plus" aria-hidden="true" />
          <span>Create new resume from exist data</span>
        </button> */}
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
                    <div className="grow font-semibold">Save CV</div>
                    <i className="fal fa-times cursor-pointer" aria-hidden="true" />

                  </Dialog.Title>
                  <span className='mt-6 ml-6 mb-10 text-sm text-gray-500'>Save the expert response to the cv</span>

                  <div className="p-6">

                    <Radio.Group onChange={onChange} value={value}>
                      <div direction="vertical">
                        <Radio value={1}>
                          Save to old Resume
                          <input
                            name="resumeName"
                            className="inputEl new-resume-form"
                            id="resumeName"
                            required="true"
                            disabled
                            aria-label="Resume name"
                            defaultValue={resumeName}
                          />
                        </Radio>

                        <Radio className="mt-10" value={2}>
                          Save as a new resume
                          <form>
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
                                  id="resumeName"
                                  required="true"
                                  placeholder='Ex: "Resume for Software Engineer"'
                                  onChange={handleInputChange}
                                  aria-label="Resume name"
                                  defaultValue=""
                                />
                              </div>
                            </div>
                          </form>
                        </Radio>
                      </div>
                    </Radio.Group>

                    <button
                      href=""
                      onClick={handleFormSubmit}
                      data-size="default"
                      data-theme="default"
                      data-busy="false"
                      className="form-submission button cta "
                      id="create-resume-form-submitted"
                      type="submit"
                    >
                      Save
                    </button>
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
