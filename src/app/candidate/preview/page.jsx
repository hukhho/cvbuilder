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
  const fetchCandidates = async () => {
    try {
      const fetchedExpert = await getCandidateConfig();

      setExpert(fetchedExpert);
      console.log('fetchCandidates: ', fetchedExpert);
    } catch (error) {
      console.error('There was an error fetching resumes', error);
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

                  {/* <div className="mt-8">
                    <img src="/images/resume.jpg" alt="image" />
                  </div> */}
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
