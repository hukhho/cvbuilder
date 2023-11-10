'use client';

import React, { useEffect, useState } from 'react';
import { Card, ConfigProvider } from 'antd';
import UserLayout from '@/app/components/Layout/UserLayout';
import UserHeader from '@/app/components/UserHeader';
import UserHeaderReview from '@/app/components/UserHeaderReview';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { getResumes } from '@/app/utils/indexService';

import { Typography } from 'antd';
const { Title } = Typography;

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
                  <div className="">
                    <Card style={{ width: 300 }}>
                      <img
                        style={{
                          width: '279.50px',
                          height: '267px',
                          borderRadius: '8px',
                        }}
                        className="w-[279.50px] h-[267px] relative rounded-lg"
                        src="/images/1.jpg"
                        alt="image"
                      />
                      <div>
                        
                        <Title style={{ textAlign: 'left'}} level={5}>Thong Nguyen</Title>
                        <div>
                        <p>Product Manager at FPT</p>
                        <p>$ 50,000 VND</p>
                        </div>
                      
                      </div>
                      <div>
                        <div>
                        Experience 
                        <span>6 years</span>
                        </div>
                        <div>
                        Number of reviews 
                        <span>5</span>
                        </div>

                      </div>
                    </Card>
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
