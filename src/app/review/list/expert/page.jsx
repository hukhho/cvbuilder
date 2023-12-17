/* eslint-disable */

'use client';

import React, { useEffect, useState } from 'react';
import { Card, ConfigProvider, Typography } from 'antd';
import UserLayout from '@/app/components/Layout/UserLayout';
import UserHeader from '@/app/components/UserHeader';
import UserHeaderReview from '@/app/components/UserHeaderReview';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { getResumes } from '@/app/utils/indexService';

import { StarFilled } from '@ant-design/icons';
import { getExperts, searchExperts } from '../../new/reviewService';
import Search from 'antd/es/input/Search';
import Link from 'next/link';
import useStore from '@/store/store';

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
const Home = () => {
  const [enabledCategories, setEnabledCategories] = useState({
    'REVIEW OPTIONS': true,
  });
  const { avatar, email, userRole } = useStore();

  const [experts, setExperts] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [options, setOptions] = useState([]);
  const [expertsMock, setExpertsMock] = useState([]);

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
      const fetchedResumes = await getResumes();
      console.log('fetchedExperts: ', fetchedExperts);
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

  const [searchValue, setSearchValue] = useState('');

  const onSearch = async (value, _e, info) => {
    try {
      const result = await searchExperts(value);
      setExperts(result);
      setSearchValue(value);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <ConfigProvider>
      <UserLayout
        isCollapsed={false}
        avatar={avatar}
        email={email}
        userRole={userRole}
        selected="4"
        userHeader={<UserHeaderReview initialEnabledCategories={enabledCategories} />}
        content={
          <div className="container">
            <div className="!p-0" style={{ width: 1000 }}>
              <div className="mt-16">
                <Search
                  placeholder="Search by name, title or company"
                  size="large"
                  defaultValue={searchValue}
                  onSearch={onSearch}
                />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-16 mb-16">
                {experts?.map(expert => (
                  <Link href={`/review/${expert?.id}/detail`}>
                    <Card key={expert?.id} style={{ width: 297, borderRadius: '8px' }}>
                      <img
                        style={{
                          width: '279.50px',
                          height: '267px',
                          borderRadius: '8px',
                        }}
                        className="w-[279.50px] h-[267px] relative rounded-lg"
                        src={expert?.avatar}
                        alt="avatar"
                      />
                      <div>
                        <div className="flex mt-2">
                          <Title style={{ textAlign: 'left' }} level={5}>
                            <span>{expert?.name}</span>
                          </Title>
                          {/* <div className="ml-4">
                            {expert?.star} <StarFilled style={{ color: '#FFC107' }} />
                          </div> */}
                          <div className="ml-4">
                            {expert?.star > 0 && (
                              <>
                                {expert?.star} <StarFilled style={{ color: '#FFC107' }} />
                              </>
                            )}
                          </div>
                        </div>
                        <div style={{ textAlign: 'left' }}>
                          <div className="flex">
                            <svg
                              width="18"
                              height="16"
                              viewBox="0 0 18 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.333 4.6665H3.66633C2.92996 4.6665 2.33301 5.26345 2.33301 5.99983V12.6665C2.33301 13.4029 2.92996 13.9998 3.66633 13.9998H14.333C15.0694 13.9998 15.6664 13.4029 15.6664 12.6665V5.99983C15.6664 5.26345 15.0694 4.6665 14.333 4.6665Z"
                                stroke="#384853"
                                stroke-width="1.41176"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M11.6664 14V3.33334C11.6664 2.97971 11.5259 2.64057 11.2758 2.39052C11.0257 2.14048 10.6866 2 10.333 2H7.66634C7.31272 2 6.97358 2.14048 6.72353 2.39052C6.47348 2.64057 6.33301 2.97971 6.33301 3.33334V14"
                                stroke="#384853"
                                stroke-width="1.41176"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            <p className="ml-2">
                              {expert?.jobTitle} at {expert?.company}
                            </p>
                          </div>
                          <div className="flex mt-4">
                            <svg
                              width="19"
                              height="19"
                              viewBox="0 0 19 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.5 0.791504V18.2082"
                                stroke="#384853"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M13.4583 3.9585H7.52083C6.78596 3.9585 6.08119 4.25042 5.56156 4.77005C5.04193 5.28969 4.75 5.99446 4.75 6.72933C4.75 7.4642 5.04193 8.16897 5.56156 8.6886C6.08119 9.20824 6.78596 9.50016 7.52083 9.50016H11.4792C12.214 9.50016 12.9188 9.79209 13.4384 10.3117C13.9581 10.8314 14.25 11.5361 14.25 12.271C14.25 13.0059 13.9581 13.7106 13.4384 14.2303C12.9188 14.7499 12.214 15.0418 11.4792 15.0418H4.75"
                                stroke="#384853"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            <p className="ml-2"> {expert?.price} VNĐ</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="flex"
                        style={{
                          marginTop: '20px',
                          textAlign: 'left',
                          background: '#F0F0F0',
                          borderRadius: '8px',
                          padding: '10px',
                        }}
                      >
                        <div className="w-1/2">
                          <div className="text-gray-500">Experience</div>
                          <div style={{ fontWeight: 'bold' }}>{expert?.experience} years</div>
                        </div>

                        <div className="w-1/2">
                          <div className="text-gray-500">Number of review</div>
                          <div style={{ fontWeight: 'bold' }}>{expert?.numberReview}</div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
            {/* 
            <div style={{ width: '100%', background: '#' }}>
              <button
                href=""
                data-size="default"
                data-theme="default"
                data-busy="false"
                className=" button "
              >
                GET MORE EXPERT
              </button>
            </div> */}
          </div>
        }
      />
    </ConfigProvider>
  );
};

export default Home;
