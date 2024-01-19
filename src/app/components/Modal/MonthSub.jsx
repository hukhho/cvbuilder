/* eslint-disable */

import { Dialog, Switch, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import './setting.css';
import './input.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import createResumeService from './createResumeService';
import { notification } from 'antd';
import { depositMoney } from '@/app/candidate/candidateServices';
import { subMonth } from '@/app/hr/hrServices';

export default function MonthSub({ money, onCreated }) {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message) => {
    api.info({
      message: 'Notification',
      description: message,
      placement,
    });
  };
  const [isOpen, setIsOpen] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [formData, setFormData] = useState({
    expenditure: money,
  });
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  const handleInputChange = event => {
    setInputValue(event.target.value);
    const { id, value } = event.target;
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

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      // formData.expenditure = Math.floor(formData.expenditure / 1);
      const submitForm = { expenditure: money }

      const result = await subMonth(submitForm);
      notification.info({
        message: 'Payment'
      });
      // openNotification('bottomRight', `Create: ${result.id}`);
      // onCreated();
      console.log('result: ', result);
      const newTab = window.open(result, '_blank');
      closeModal();
    } catch (error) {
      notification.error({
        message: error?.response?.data || 'Error'
      });
      // openNotification('bottomRight', `Error: ${error}`);
    }
  };
  return (
    <>
      {contextHolder}
      <div className="inset-0 flex items-center justify-center">
        <button
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
          <span>Subscription vip</span>
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
                <Dialog.Panel className="relative w-full transform rounded-lg bg-white text-left align-middle shadow-sm transition-all max-w-md opacity-100 scale-100">
                  <Dialog.Title
                    as="h2"
                    className="w-full flex leading-7 text-xl font-semibold bg-slate-50 rounded-t-lg text-gray-900 items-center px-6 py-5 border-b border-slate-200"
                  >
                    <div className="grow font-semibold">Extend subscription</div>
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
                            <span>Money (vnđ) </span> *
                          </div>
                          <div id="null-portal-root" />
                        </label>
                        <div className="relative">
                          <input
                            name="expenditure"
                            type="number"
                            className="inputEl new-resume-form"
                            id="expenditure"
                            required="true"
                            disabled={true}
                            onChange={handleInputChange}
                            aria-label="Deposit money"
                            min={money}
                            defaultValue={money}
                          />
                        </div>
                      </div>

                      <button
                        href=""
                        data-size="default"
                        data-theme="default"
                        data-busy="false"
                        className="form-submission button cta "
                        id="create-resume-form-submitted"
                        type="submit"
                      >
                        Submit now
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
