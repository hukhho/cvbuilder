'use client';

import React, { useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import UserLayout from '@/app/components/Layout/UserLayout';
import UserHeader from '@/app/components/UserHeader';
import UserHeaderReview from '@/app/components/UserHeaderReview';

import './card.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { getExperts, createReview } from './reviewService';
import { getResumes } from '@/app/utils/indexService';

const Home = () => {
  const [enabledCategories, setEnabledCategories] = useState({
    'REVIEW OPTIONS': true,
  });

  const [experts, setExperts] = useState([]);
  const [resumes, setResumes] = useState([]);
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
  const fetchExperts = async () => {
    try {
      // Simulate fetching resumes (replace with your actual fetch logic)
      const fetchedExperts = await getExperts();
      const fetchedResumes = await getResumes(1);

      // const similatorFetch =
      setExperts(fetchedExperts);
      setResumes(fetchedResumes);
    } catch (error) {
      console.error('There was an error fetching resumes', error);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Add your form submission logic here, e.g., sending data to a server
    // You can access form input values and other data from your state
    // For now, you can simply log a message to the console.
    // Extract data from form inputs
    const formData = new FormData(e.target);

    const resumeId = formData.get('resumeId');
    const expertId = formData.get('expertId');
    const receivedDate = formData.get('receivedDate');
    const experienceLevel = formData.get('experienceLevel');
    const note = formData.get('note');

    // Construct the data object to send to the server
    const data = {
      receivedDate,
      note,
    };

    const result = await createReview(resumeId, expertId, data);

    console.log('Form submitted! Data:', data);
  };

  return (
    <body className="pro-ui">
      <main>
        <ConfigProvider>
          <UserLayout
            selected={'3'}
            userHeader={<UserHeaderReview initialEnabledCategories={enabledCategories} />}
            content={
              <div className="container mx-auto px-4 py-6">
                <div className="!p-0 mb-5 mt-9 card">
                  <div className="flex ">
                    <div className="bg-rezi-blue text-white p-9 rounded-l-lg w-[30%]">
                      <h5 className="uppercase mb-1 text-xs text-yellow-400">Your Selection</h5>
                      <div>
                        <h1 className="text-4xl">
                          $8 <sup className="text-sm align-top top-0">total</sup>
                        </h1>
                        <span className="text-xs mt-1 mb-6 leading-4 block">
                          Select your resume,&nbsp;5 days (November 16th 2023), Student
                        </span>
                      </div>
                      <ul className="mb-6">
                        <li className="text-xs mb-2 py-0.5 min-w-[200px]">
                          <FontAwesomeIcon icon={faCheck} className="mr-1 text-[#48c9b0]" />
                          Rezi Score 90 or above
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
                        <a
                          href="https://www.rezi.ai/rezi-docs/rezi-expert-review-explained"
                          target="_blank"
                          style={{ color: 'white' }}
                        >
                          Frequent Questions &amp; Answers{' '}
                          <i className="fad fa-chevron-right" aria-hidden="true" />
                        </a>
                      </span>
                    </div>
                    <div className="p-9 w-[70%]" style={{ color: 'black' }}>
                      <h2>Rezi Resume Review</h2>
                      <p>
                        A Rezi expert can help you polish your resume into exactly what recruiters
                        are looking for. We'll correct all formatting, content, and grammar errors
                        directly in your resume.
                      </p>
                      <div>
                        <form onSubmit={handleSubmit}>
                          {' '}
                          {/* Add onSubmit event handler to the form */}
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
                                {resumes.map((resume, index) => (
                                  <option value={resume.id} key={index}>
                                    {resume.resumeName}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="mb-4 relative w-full mt-2">
                            <div className="flex justify-between">
                              <label
                                tabIndex={0}
                                role="group"
                                className="mb-3 uppercase flex items-center text-xs leading-[15px] text-[#565656] font-normal"
                              >
                                <span>Select Expert For Review</span> *
                              </label>
                            </div>
                            <div className="relative">
                              <select
                                name="expertId"
                                className="border-2 border-grey-50 border-solid py-3 rounded m0 text-[1rem] leading-[1.5rem] w-full min-h-[38px] w-full font-semibold transition-colors text-[#b5b9bf] border-grey-50 hover:border-grey-300"
                                style={{ fontWeight: 600 }}
                              >
                                <option value="placeholder" disabled="">
                                  Expert Name
                                </option>

                                {experts.map((expert, index) => (
                                  <option value={expert.id} key={index}>
                                    {expert.name}
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
                                    <option value="placeholder" disabled="">
                                      4 days
                                    </option>
                                    {options.map(option => (
                                      <option key={option.value} value={option.value}>
                                        {option.label}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="mb-4 relative w-[calc(50%_-_1em)]">
                              <div className="flex justify-between">
                                <label
                                  tabIndex={0}
                                  role="group"
                                  className="mb-3 uppercase flex items-center text-xs leading-[15px] text-[#565656] font-normal"
                                >
                                  <span>Experience level</span> *
                                </label>
                              </div>
                              <div className="relative">
                                <select
                                  className="border-2 border-grey-50 border-solid py-3 rounded m0 text-[1rem] leading-[1.5rem] w-full min-h-[38px] w-full font-semibold transition-colors text-grey-900 border-grey-50 hover:border-grey-300"
                                  style={{ fontWeight: 600 }}
                                >
                                  <option value="placeholder" disabled="">
                                    4 days
                                  </option>
                                  <option value="student">Student</option>
                                  <option value="entry-level">Entry Level</option>
                                  <option value="experienced">Experienced</option>
                                </select>
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
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
        </ConfigProvider>
      </main>
    </body>
  );
};

export default Home;
