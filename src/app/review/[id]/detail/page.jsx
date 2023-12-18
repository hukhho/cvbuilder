/* eslint-disable */

'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, ConfigProvider, Empty, Typography } from 'antd';
import UserLayout from '@/app/components/Layout/UserLayout';
import UserHeader from '@/app/components/UserHeader';
import UserHeaderReview from '@/app/components/UserHeaderReview';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackward,
  faBackwardStep,
  faCheck,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { getResumes } from '@/app/utils/indexService';

import { StarFilled, UserOutlined } from '@ant-design/icons';
import { getExpert } from '../../new/reviewService';
import ReviewNewModal from '../../new/ReviewNewModal';
import FinishUpPreviewV2 from '@/app/resume/[id]/finishup/FinishUpPreviewV2';
import Statitics from './Statitics';
import UserCVBuilderLayout from '@/app/components/Layout/UseCVBuilderLayout';
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
const Home = ({ params }) => {
  const [enabledCategories, setEnabledCategories] = useState({
    'REVIEW OPTIONS': true,
  });
  const { avatar, email, userRole } = useStore();

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

  // const lowestPriceData = expert?.price?.[0]?.price ?? null;
  // const biggestPriceData = expert?.price?.[2]?.price ?? null;

  const sortedPrices = expert?.price?.slice().sort((a, b) => a.price - b.price) ?? [];

  const lowestPriceData = sortedPrices[0]?.price ?? null;
  const biggestPriceData = sortedPrices[sortedPrices.length - 1]?.price ?? null;

  return (
    <ConfigProvider>
      <UserLayout
        selected="4"
        isCollapsed={false}
        avatar={avatar}
        email={email}
        userRole={userRole}
        userHeader={<UserHeaderReview initialEnabledCategories={enabledCategories} />}
        content={
          <div className="container">
            <div className="!p-0 relative">
              <div className="pl-16" style={{ paddingLeft: '', background: 'white' }}>
                <div className="absolute top-10 left-5">
                  <Link href="/review/list/expert" passHref>
                    <button>
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <span className="ml-2">Back</span>
                  </Link>
                </div>
                <div className="absolute top-10 right-5" style={{ textAlign: 'left' }}>
                  <ReviewNewModal onCreated={onCreated} resumes={resumes} expert={expert} />
                  <Statitics expert={expert} />
                </div>
                <div className="flex justify-between mt-16 mr-32 p-8">
                  <div className="flex mt-8">
                    <Avatar size={128} style={{}} src={expert?.avatar} alt="image" />
                    <div style={{ textAlign: 'left', marginTop: '20px', marginLeft: '20px' }}>
                      <Title level={3}>{expert?.name}</Title>
                      <p>
                        {expert?.title} at {expert?.company}
                      </p>
                      {/* <p>

                        From {lowestPriceData}.000 to {biggestPriceData}.000 VND / request
                      </p> */}
                      <p>
                        {lowestPriceData && biggestPriceData && lowestPriceData === biggestPriceData
                          ? `${lowestPriceData} VND / request`
                          : `From ${lowestPriceData} to ${biggestPriceData} VND / request`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8" style={{ textAlign: 'left', marginLeft: '20px' }}>
                  <div className="flex">
                    <Title style={{ color: '#4D70EB' }} level={5}>
                      <span style={{ borderBottom: '2px solid #4D70EB' }}>Overview</span>
                    </Title>
                    <div></div>
                  </div>
                  <div>
                    <div />
                  </div>
                  <div className="flex justify-between	">
                    <div style={{ textAlign: 'left', width: '900px' }}>
                      <div style={{ textAlign: 'left', minHeight: '200px' }}>
                        {' '}
                        {expert?.description ? (
                          <p dangerouslySetInnerHTML={{ __html: expert?.description }} />
                        ) : (
                          <Empty />
                        )}
                      </div>
                      {expert?.cvId > 0 && <FinishUpPreviewV2 cvId={expert.cvId} />}
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
                  style={{
                    paddingLeft: '20px',
                    paddingBottom: '20px',
                    paddingTop: '20px',
                    background: 'white',
                    textAlign: 'left',
                  }}
                >
                  <div>
                    <Title style={{ color: '#4D70EB' }} level={5}>
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
