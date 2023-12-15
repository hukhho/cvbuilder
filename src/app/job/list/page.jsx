'use client';

import React, { useEffect, useState } from 'react';
import { Col, ConfigProvider, Input, Row, Select, Typography } from 'antd';
import UserLayout from '@/app/components/Layout/UserLayout';
import UserHeaderJob from '@/app/components/UserHeaderJob';
import Image from 'next/image';
import JobCard from './JobCard';
import { getJobList } from '../jobServices';

const { Title } = Typography;

const Home = () => {
  const [enabledCategories, setEnabledCategories] = useState({
    OPPORTUNITIES: true,
  });

  const [locationOptions, setLocationOptions] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleChange = value => {
    setSelectedLocations(value);
    console.log('setSelectedLocations: ', value);

    // Filter data based on selected locations or show all jobs if no locations selected
    const filteredJobs = data.filter(job => value.length === 0 || value.includes(job.location));

    // Log the filtered jobs (you can update this to set the filtered data to another state)
    console.log('Filtered jobs:', filteredJobs);

    // Set the filtered data to state
    setFilteredData(filteredJobs);
  };

  const fetchData = async () => {
    try {
      const fetchedDataFromAPI = await getJobList();
      setData(fetchedDataFromAPI);
      console.log('JobList', fetchedDataFromAPI);

      // Extract unique locations from job data
      const uniqueLocations = Array.from(new Set(fetchedDataFromAPI.map(job => job.location)));
      // Generate options for Select based on unique locations
      const locationOptionsTemp = uniqueLocations.map(location => ({
        label: location,
        value: location,
      }));
      setLocationOptions(locationOptionsTemp);
      setFilteredData(fetchedDataFromAPI);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    console.log('useEffect');
    fetchData();
  }, []);

  return (
    <ConfigProvider>
      <UserLayout
        selected="3"
        userHeader={<UserHeaderJob initialEnabledCategories={enabledCategories} />}
        content={
          <div className="container">
            <div className="!p-0 mb-5 mt-0 ">
              <div style={{ textAlign: 'left' }} />
              <div className="flex mt-16">
                <div style={{ width: 500 }}>
                  <Input placeholder="Search by title or company" />
                </div>
                <div style={{ width: 200 }} className="ml-8">
                  <Select
                    mode="multiple"
                    allowClear
                    style={{
                      width: '100%',
                    }}
                    placeholder="All Location"
                    value={selectedLocations}
                    onChange={handleChange}
                    options={locationOptions}
                  />
                </div>
              </div>
              <div>
                <div className="flex mt-8">
                  <Title level={3}>Browse Jobs</Title>
                </div>
                <div className="mt-8">
                  <Row gutter={[16, 48]}>
                    {filteredData.map((job, index) => (
                      <Col key={index} span={12}>
                        <JobCard job={job} jobTitle={job.title} />
                      </Col>
                    ))}
                  </Row>
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
