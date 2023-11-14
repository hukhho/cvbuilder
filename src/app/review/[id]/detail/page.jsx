'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, ConfigProvider } from 'antd';
import UserLayout from '@/app/components/Layout/UserLayout';
import UserHeader from '@/app/components/UserHeader';
import UserHeaderReview from '@/app/components/UserHeaderReview';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { getResumes } from '@/app/utils/indexService';

import { Typography } from 'antd';
import { StarFilled, UserOutlined } from '@ant-design/icons';
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

  const [experts, setExperts] = useState([]);
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
    <ConfigProvider>
      <UserLayout
        selected={'3'}
        userHeader={<UserHeaderReview initialEnabledCategories={enabledCategories} />}
        content={
          <div className="container mx-auto">
            <div className="!p-0">
              <div style={{ paddingLeft: '20px', background: 'white' }}>
                <div className="flex">
                  <Avatar size={128} style={{}} src="/images/1.jpg" alt="image" />
                  <div style={{ textAlign: 'left', marginTop: '20px', marginLeft: '20px' }}>
                    <Title level={3}>Samaa El-Sayed</Title>
                    <p>UX Specialist at University of Waterloo</p>
                    <p>50,000 VND</p>
                  </div>
                  <Button style={{ width: '200px', marginLeft: '480px', background: 'red' }}>
                    Request Review
                  </Button>
                </div>
                <div className="mt-8" style={{ textAlign: 'left', marginLeft: '20px' }}>
                  <div className="flex">
                    <Title style={{ color: '#4D70EB' }} level={5}>
                      {' '}
                      <span style={{ borderBottom: '2px solid #4D70EB' }}>Overview</span>
                    </Title>
                  </div>
                  <div>
                    <div></div>
                  </div>
                  <div className="flex">
                    <div style={{ textAlign: 'left', width: '50%' }}>
                      <p>
                        Hi, I'm Samaa and I have over 7 years of experience as a UX Specialist,
                        focused on user research, product design and strategy, interaction and
                        visual design. I have a Masters Degree in Digital Experience and Innovation
                        from the University of…
                      </p>
                    </div>
                    <div style={{ marginLeft: '300px' }}>
                      <Title style={{ color: 'black' }} level={5}>
                        {' '}
                        <span style={{}}>Statistic</span>
                      </Title>
                      <div className=''>

                      </div>
                      <div className="flex">
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
                          <p style={{ fontWeight: 'bold' }}>6 years</p>
                          <span>Experience in the field</span>
                        </div>
                      </div>
                      
                    </div>
                  </div>




                  <div className="mt-8">
                    <img src="/images/resume.jpg" alt="image" />
                  </div>
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
                  <div>
                    <div className="flex">
                      <div className="ml-4 flex">
                        <p style={{ fontWeight: 'bold', marginRight: '2px' }}>3.5</p>{' '}
                        <StarFilled style={{ color: '#FFC107' }} />
                      </div>
                      <div className="ml-4 text-gray-500">August 15, 2022</div>
                    </div>

                    <div>
                      <span>
                        I got wonderful advice from Mr. Yu! As I can't get practical advice in
                        school, mentor Yu gave me a lot of valuable advice about how to implement XR
                        and what designers should do in the real-world business environment. I feel
                        super thankful for this meeting, Mr. Yu is extremely knowledgeable about
                        tech and he gives me a lot of practical advice and confirms my future
                        pathway to go. thank you so much!
                      </span>
                      <div className="flex mt-4">
                        <Avatar shape="square" size="large" icon={<UserOutlined />} />
                        <div className="ml-4">
                          <div>Candidate Name</div>
                          <div>
                            <p style={{ color: '#4D70EB' }}> job title - Developer ne</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
