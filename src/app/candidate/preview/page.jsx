/* eslint-disable */

'use client';

import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  ConfigProvider,
  Empty,
  Result,
  Skeleton,
  Typography,
  notification,
} from 'antd';
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
import FinishUpPreviewV2 from '@/app/resume/[id]/finishup/FinishUpPreviewV2';
import Statitics from './Statitics';
import UserCVBuilderLayout from '@/app/components/Layout/UseCVBuilderLayout';
import Link from 'next/link';
import { getExpert } from '@/app/review/new/reviewService';
import { getCandidateConfig } from '../candidateServices';
import CandidateConfigHeader from '@/app/components/CandidateConfigHeader';
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
    'PREVIEW YOUR PROFILE': true,
  });
  const { avatar, email, userRole } = useStore();

  const [expert, setExpert] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState('');

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement, message) => {
    api.info({
      message: 'Notification',
      description: message,
      placement,
    });
  };

  const fetchCandidates = async () => {
    try {
      const fetchedExpert = await getCandidateConfig();

      setExpert(fetchedExpert);
      console.log('fetchCandidates: ', fetchedExpert);
    } catch (error) {
      console.error('There was an error fetching resumes', error);

      if (error.response.data.error) {
        openNotification('bottomRight', `Error: ${error.response.data.error}`);
        +setErrorMessage(error.response.data.error);
      } else if (error.response.data && error.response.status === 400 && error.response.data) {
        openNotification('bottomRight', `Error: ${error.response.data}`);
        setErrorMessage(error.response.data);
      } else {
        openNotification('bottomRight', `Something went wrong!`);
        setErrorMessage('Something went wrong');
      }
    } finally {
      setIsLoading(false);
    }
  };
  const fetchResumes = async () => {
    try {
      const fetchedResumes = await getResumes();

      console.log('fetched ', fetchedResumes);

      setResumes(fetchedResumes);
    } catch (error) {
      console.error('There was an error fetching resumes', error);
    }
  };

  useEffect(() => {
    fetchCandidates();
    fetchResumes();
  }, []);

  const onCreated = async e => {
    // e.preventDefault();
  };

  return (
    <ConfigProvider>
      <UserLayout
        isCollapsed={false}
        avatar={avatar}
        email={email}
        userRole={userRole}
        selected="7"
        userHeader={<CandidateConfigHeader initialEnabledCategories={enabledCategories} />}
        content={
          <div className="container">
            {isLoading && <Skeleton style={{ marginTop: 50 }} />}
            {!isLoading && errorMessage !== '' && (
              <Result
                status="403"
                title="403"
                subTitle={`Sorry, you are not authorized to access this page. ${errorMessage}`}
                extra={
                  <Link href="/" passHref>
                    <button type="button">Back</button>
                  </Link>
                }
              />
            )}
            {!isLoading && !errorMessage && expert && (
              <div className="!p-0 relative">
                <div className="pl-16" style={{ width: 900, paddingLeft: '', background: 'white' }}>
                  <div className="absolute top-10 left-5">
                    <Link href="/review/list/expert" passHref>
                      <button>
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </button>
                      <span className="ml-2">Back</span>
                    </Link>
                  </div>
                  <div className="flex justify-between mt-16 mr-32 p-8">
                    <div className="flex mt-8">
                      <Avatar size={128} style={{}} src={expert?.avatar} alt="image" />
                      <div style={{ textAlign: 'left', marginTop: '20px', marginLeft: '20px' }}>
                        <Title level={3}>{expert?.name}</Title>
                        <p>
                          {expert?.jobTitle} at {expert?.company}
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
                        <div style={{ textAlign: 'left', minHeight: '100px' }}>
                          {' '}
                          {expert?.about ? (
                            <p dangerouslySetInnerHTML={{ __html: expert?.about }} />
                          ) : (
                            <Empty />
                          )}
                        </div>
                        {expert?.cv?.map(cvItem => (
                          <FinishUpPreviewV2 key={cvItem.id} cvId={cvItem.id} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        }
      />
    </ConfigProvider>
  );
};

export default Home;
