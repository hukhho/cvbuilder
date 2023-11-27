/* eslint-disable */

'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, ConfigProvider, Empty, Typography } from 'antd';
import UserLayout from '@/app/components/Layout/UserLayout';
import UserHeader from '@/app/components/UserHeader';
import UserHeaderReview from '@/app/components/UserHeaderReview';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { getResumes } from '@/app/utils/indexService';

import { StarFilled, UserOutlined } from '@ant-design/icons';
import { getExpert } from '../../new/reviewService';
import ReviewNewModal from '../../new/ReviewNewModal';

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
const Home = ({ params }) => {
  const [enabledCategories, setEnabledCategories] = useState({
    'REVIEW OPTIONS': true,
  });

  const [experts, setExperts] = useState([]);
  const [expert, setExpert] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [options, setOptions] = useState([]);
  const [expertsMock, setExpertsMock] = useState(generateMockExperts());

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
      const fetchedExpert = await getExpert(params.id);

      setExpert(fetchedExpert);
      console.log('fetchedExpert: ', fetchedExpert);

      // setResumes(fetchedResumes);
    } catch (error) {
      console.error('There was an error fetching resumes', error);
    }
  };
  const fetchResumes = async () => {
    try {
      // Simulate fetching resumes (replace with your actual fetch logic)
      const fetchedResumes = await getResumes();

      setExpert(fetchedResumes);
      console.log('fetched ', fetchedResumes);

      setResumes(fetchedResumes);
    } catch (error) {
      console.error('There was an error fetching resumes', error);
    }
  };

  useEffect(() => {
    fetchExperts();
    fetchResumes();
  }, []);

  const onCreated = async e => {
    // e.preventDefault();
  };

  return (
    <ConfigProvider>
      <UserLayout
        selected="3"
        userHeader={<UserHeaderReview initialEnabledCategories={enabledCategories} />}
        content={
          <div className="container mx-auto">
            <div className="!p-0">
              <div style={{ paddingLeft: '', background: 'white' }}>
                <div className="flex justify-between	mt-16 mr-32">
                  <div className="flex">
                    <Avatar size={128} style={{}} src={expert?.avatar} alt="image" />
                    <div style={{ textAlign: 'left', marginTop: '20px', marginLeft: '20px' }}>
                      <Title level={3}>{expert?.name}</Title>
                      <p>
                        {expert?.title} at {expert?.company}
                      </p>
                      <p>{expert?.price} VND / request</p>
                    </div>
                  </div>

                  <ReviewNewModal onCreated={onCreated} resumes={resumes} expert={expert} />
                  {/* <button className="button" style={{ width: '200px', height: '40px' }}>
                    Request Review
                  </button> */}
                </div>
                <div className="mt-8" style={{ textAlign: 'left', marginLeft: '20px' }}>
                  <div className="flex">
                    <Title style={{ color: '#4D70EB' }} level={5}>
                      {' '}
                      <span style={{ borderBottom: '2px solid #4D70EB' }}>Overview</span>
                    </Title>
                  </div>
                  <div>
                    <div />
                  </div>
                  <div className="flex justify-between	">
                    <div style={{ textAlign: 'left', width: '900px' }}>
                      {expert?.description ? (
                        <p dangerouslySetInnerHTML={{ __html: expert?.description }} />
                      ) : (
                        <Empty />
                      )}
                    </div>
                    <div style={{ width: '350' }}>
                      <Title style={{ color: 'black' }} level={4}>
                        <span style={{}}>Statistic</span>
                      </Title>
                      <div className="grid grid-rows-2 grid-flow-col gap-4">
                        <div className="flex" style={{ width: 200 }}>
                          <div>
                            <svg
                              width="54"
                              height="44"
                              viewBox="0 0 54 44"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect width="44" height="44" rx="8" fill="#E6F4F9" />
                              <path
                                d="M25.2311 12.7176C27.306 11.5765 29.6383 10.9851 32.0062 10.9998C32.5561 11.0032 33 11.4499 33 11.9998C33 14.8101 32.2117 19.7075 27.1477 23.4164C27.2329 23.774 27.3298 24.2446 27.3968 24.7647C27.47 25.3321 27.5111 25.9852 27.4514 26.6279C27.3924 27.2619 27.2288 27.9597 26.8321 28.5547L26.8312 28.556C26.1523 29.5709 24.8718 30.1594 23.9773 30.4838C23.4966 30.6582 23.0525 30.7818 22.7294 30.862C22.4858 30.9224 22.3071 30.9591 22.2261 30.9749C21.9179 31.0335 21.6038 30.9719 21.3592 30.7677C21.1316 30.5777 21 30.2965 21 30V25.414L18.586 23H14C13.7035 23 13.4223 22.8685 13.2323 22.6409C13.0423 22.4133 12.9631 22.1131 13.0161 21.8214C13.0498 21.6365 13.0928 21.453 13.138 21.2707C13.2182 20.9475 13.3418 20.5035 13.5162 20.0228C13.8406 19.1283 14.4291 17.8478 15.444 17.1688L15.4453 17.168C16.0403 16.7713 16.7381 16.6076 17.3721 16.5487C18.0148 16.4889 18.6679 16.5301 19.2353 16.6032C19.7608 16.6709 20.2359 16.7692 20.5948 16.8551C21.8057 15.1461 23.3899 13.7303 25.2311 12.7176Z"
                                fill="#17C2FF"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M16.0031 24.9883C15.2199 24.9641 14.4554 25.2299 13.8562 25.7346C13.3294 26.1774 12.9426 26.7872 12.6561 27.3738C12.3639 27.9719 12.1419 28.6175 11.976 29.1973C11.8093 29.7804 11.6933 30.3181 11.6191 30.7092C11.5818 30.9055 11.5547 31.0666 11.5367 31.1801C11.5269 31.2417 11.5178 31.3035 11.5091 31.3653L11.5088 31.3669C11.4675 31.6758 11.5725 31.9866 11.7929 32.2069C12.0132 32.4273 12.3245 32.5322 12.6333 32.4909C12.6955 32.4821 12.7577 32.4729 12.8197 32.4631C12.9332 32.4451 13.0943 32.418 13.2906 32.3807C13.6817 32.3065 14.2194 32.1905 14.8025 32.0238C15.3823 31.8579 16.0279 31.6359 16.626 31.3437C17.2124 31.0573 17.822 30.6707 18.2647 30.1442C19.2857 28.935 19.301 27.0516 18.1126 25.8782L18.1004 25.8664C17.5334 25.3253 16.7865 25.0126 16.0031 24.9883Z"
                                fill="#17C2FF"
                              />
                            </svg>
                          </div>
                          <div className="">
                            <p style={{ fontWeight: 'bold' }}>{expert?.experience} years</p>
                            <span>Experience in the field</span>
                          </div>
                        </div>
                        <div className="flex" style={{ width: 220 }}>
                          <div>
                            <svg
                              width="54"
                              height="44"
                              viewBox="0 0 54 44"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect width="44" height="44" rx="8" fill="#E6F4F9" />
                              <path
                                d="M22 13L24.781 18.5952L31 19.4979L26.5 23.8507L27.562 30L22 27.0952L16.438 30L17.5 23.8507L13 19.4979L19.219 18.5952L22 13Z"
                                fill="#FFC200"
                                stroke="#FFC200"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                          <div className="">
                            <p style={{ fontWeight: 'bold' }}>{expert?.star} stars</p>
                            <span>4 reviews from candidate</span>
                          </div>
                        </div>{' '}
                        <div className="flex" style={{ width: 200 }}>
                          <div>
                            <svg
                              width="54"
                              height="44"
                              viewBox="0 0 54 44"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                y="-1"
                                width="44"
                                height="44"
                                rx="8"
                                fill="#FF5A5F"
                                fill-opacity="0.1"
                              />
                              <path
                                d="M15.5 11C15.5 10.4477 15.0523 10 14.5 10C13.9477 10 13.5 10.4477 13.5 11V12.5H12C11.4477 12.5 11 12.9477 11 13.5C11 14.0523 11.4477 14.5 12 14.5H13.5V16C13.5 16.5523 13.9477 17 14.5 17C15.0523 17 15.5 16.5523 15.5 16V14.5H17C17.5523 14.5 18 14.0523 18 13.5C18 12.9477 17.5523 12.5 17 12.5H15.5V11Z"
                                fill="#FF5A5F"
                              />
                              <path
                                d="M15.5 26C15.5 25.4477 15.0523 25 14.5 25C13.9477 25 13.5 25.4477 13.5 26V27.5H12C11.4477 27.5 11 27.9477 11 28.5C11 29.0523 11.4477 29.5 12 29.5H13.5V31C13.5 31.5523 13.9477 32 14.5 32C15.0523 32 15.5 31.5523 15.5 31V29.5H17C17.5523 29.5 18 29.0523 18 28.5C18 27.9477 17.5523 27.5 17 27.5H15.5V26Z"
                                fill="#FF5A5F"
                              />
                              <path
                                d="M23.9333 11.641C23.7848 11.2548 23.4138 11 23 11C22.5862 11 22.2152 11.2548 22.0667 11.641L20.3325 16.1499C20.0321 16.9309 19.9377 17.156 19.8085 17.3376C19.679 17.5198 19.5198 17.679 19.3376 17.8085C19.156 17.9377 18.9309 18.0321 18.1499 18.3325L13.641 20.0667C13.2548 20.2152 13 20.5862 13 21C13 21.4138 13.2548 21.7848 13.641 21.9333L18.1499 23.6675C18.9309 23.9679 19.156 24.0623 19.3376 24.1914C19.5198 24.321 19.679 24.4802 19.8085 24.6624C19.9377 24.844 20.0321 25.0691 20.3325 25.8501L22.0667 30.359C22.2152 30.7452 22.5862 31 23 31C23.4138 31 23.7848 30.7452 23.9333 30.359L25.6675 25.8501C25.9679 25.0691 26.0623 24.844 26.1914 24.6624C26.321 24.4802 26.4802 24.321 26.6624 24.1914C26.844 24.0623 27.0691 23.9679 27.8501 23.6675L32.359 21.9333C32.7452 21.7848 33 21.4138 33 21C33 20.5862 32.7452 20.2152 32.359 20.0667L27.8501 18.3325C27.0691 18.0321 26.844 17.9377 26.6624 17.8085C26.4802 17.679 26.321 17.5198 26.1914 17.3376C26.0623 17.156 25.9679 16.9309 25.6675 16.1499L23.9333 11.641Z"
                                fill="#FF5A5F"
                              />
                            </svg>
                          </div>
                          <div className="">
                            <p style={{ fontWeight: 'bold' }}>{expert?.numberReview}</p>
                            <span>Review completed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="mt-8">
                    <img src="/images/resume.jpg" alt="image" />
                  </div> */}
                </div>
              </div>

              <div>
                <div
                  className="mt-8 bg-white"
                  style={{ paddingLeft: '20px', background: 'white', textAlign: 'left' }}
                >
                  <div>
                    <Title style={{ color: '#4D70EB' }} level={5}>
                      {' '}
                      <span style={{ borderBottom: '2px solid #4D70EB' }}>Reviews</span>
                    </Title>
                  </div>
                  {expert?.comments &&
                    expert?.comments?.map((comment, index) => {
                      return (
                        <div className="mt-4" key={index}>
                          <div className="flex">
                            <div className="ml-4 flex">
                              <p style={{ fontWeight: 'bold', marginRight: '2px' }}>
                                {comment?.score}
                              </p>{' '}
                              <StarFilled style={{ color: '#FFC107' }} />
                            </div>
                            <div className="ml-4 text-gray-500">{comment?.dateComment}</div>
                          </div>

                          <div>
                            {comment?.comment ? (
                              <span dangerouslySetInnerHTML={{ __html: comment?.comment }} />
                            ) : (
                              <Empty />
                            )}

                            <div className="flex mt-4">
                              <Avatar shape="square" size="large" src={comment?.avatar} />
                              <div className="ml-4">
                                <div>{comment?.name}</div>
                                <div>
                                  {/* <p style={{ color: '#4D70EB' }}> job title - Developer ne</p> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        }
      />
    </ConfigProvider>
  );
};

export default Home;
