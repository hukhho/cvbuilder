/* eslint-disable */

'use client';

import React, { useEffect, useState } from 'react';
import { getAts } from './finishUpService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle, faWarning } from '@fortawesome/free-solid-svg-icons';
import JobModal from '@/app/components/Modal/JobModal';
import JobModalCreate from '@/app/components/Modal/JobModalCreate';
import useStore from '@/store/store';
import { getAllExperiences } from '../experience/experienceService';
import { getJobLists } from '@/app/utils/indexService';
import { ExportOutlined, EyeOutlined } from '@ant-design/icons';
import Link from 'next/link';
import JobModalUpdate from '@/app/components/Modal/JobModalUpdate';
import { Switch } from 'antd';

const Ats = ({
  cvId,
  dataAts,
  isCreatedAts,
  onCreatedAts,
  isAtsEnabled,
  handleChangeAtsEnabled,
}) => {
  console.log('dataAts:', dataAts);
  const [title, setTitle] = useState(dataAts?.title);
  const [description, setDescription] = useState(dataAts?.description);
  const [isFetched, setIsFetched] = useState(false);

  function filterPass(filterData) {
    return filterData?.filter(content => content?.status === 'Pass');
  }

  // const fetchData = async () => {
  //   try {
  //     console.log('cvId: ', cvId);
  //     const result = await getAts(cvId);

  //     setDataAts(result);
  //     console.log('Ats:data: ', result);
  //     if (result?.title && result?.description) {
  //       setTitle(result.title);
  //       setDescription(result.description);
  //       setIsCreatedAts(true);
  //     }
  //     // setTitle(result.title);
  //     // setDescription(result.description);

  //     const passed = filterPass(result.ats);
  //     console.log(':passed: ', passed);

  //     onGen(passed);
  //   } catch (error) {
  //     console.error('Error fetching FinishUp data:', error);
  //   } finally {
  //     setIsFetched(true);
  //   }
  // };

  const [experiences, setExperiences] = useState([]);

  const fetchExperiences = async () => {
    try {
      const data = await getJobLists();
      console.log('data getAllExperiences ', data);

      setExperiences(data);
    } catch (error) {
      console.error('There was an error fetching the experiences', error);
    }
  };

  const handleLabelClick = (e, value) => {
    // Handle the label click to select the option
    e.stopPropagation(); // Prevents the click from reaching the outer div
    // Your logic to handle the label click (e.g., set the selected value)
  };

  const handleLinkClick = (e, link) => {
    // Handle the link click to open the link
    e.stopPropagation(); // Prevents the click from reaching the outer div
    window.open(link, '_blank');
  };
  const options = experiences.map(item => ({
    value: item?.id,
    label: (
      <div className="relative">
        <span style={{ marginRight: '20px' }}>{`${item?.title} at ${item?.companyName}`}</span>
        <a
          className="absolute"
          style={{ right: '8px' }}
          onClick={e => handleLinkClick(e, `/job/${item?.id}`)}
        >
          <ExportOutlined />
        </a>
      </div>
    ),
    title: item?.title,
    description: item?.description,
    company: item?.companyName,
  }));

  useEffect(() => {
    console.log('~page Ats.jsx');
    // fetchData();
    fetchExperiences();
  }, []);

  const passedData = filterPass(dataAts?.ats);

  const onChange = checked => {
    console.log(`switch to ${checked}`);
    handleChangeAtsEnabled(checked);
  };

  return (
    <div style={{ color: 'black', textAlign: 'left' }}>
      <div className="keyword-card card share-card ">
        <div className="keyword-wrapper">
          <div className="keyword-side">
            <h4>
              AI Keyword Targeting
              <sup aria-hidden="true" style={{ paddingLeft: 4, color: 'rgb(204, 204, 204)' }}>
                v2
              </sup>
            </h4>
          </div>
          <div style={{}} className="keyword-list">
            <span className="keyword-infos">
              <div className="font-bold mb-4">
                {passedData?.length > 0 && (
                  <div className="flex mt-4 mb-4 space-x-4">
                    <Switch
                      style={{ width: 50 }}
                      className="mr-4"
                      value={isAtsEnabled}
                      defaultChecked={isAtsEnabled}
                      onChange={onChange}
                    />
                    {isAtsEnabled ? <div>enable</div> : <div>disable</div>}
                    <span className="mt-4">Disable Highlight</span>
                  </div>
                )}
                {passedData?.map((content, index) => {
                  return (
                    <div key={index}>
                      {content?.ats}{' '}
                      <FontAwesomeIcon icon={faCheckCircle} className="text-teal-500 ml-4" />
                    </div>
                  );
                })}
              </div>
              {/* <button className="button cta mb-8" onClick={handleCLick}>
                GENERATE
              </button> */}

              <div className="mt-4">
                Want to improve your chances of getting this role? Consider adding the following
                keywords to your resume:
              </div>
            </span>
            <div className="mt-4">
              <div>
                {dataAts?.ats?.map((content, index) => {
                  return (
                    <div key={index}>
                      {content.status === 'Warning' && (
                        <div className="flex justify-between">
                          <div>
                            <span className="font-bold">{content.ats}</span>
                          </div>
                          <div>
                            <FontAwesomeIcon icon={faCircle} style={{ color: '#e2e8ec' }} />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            {/* {!isCreatedAts && 'Create'}
            {isCreatedAts && 'Update'} */}
            
            {(!isCreatedAts) && (
              <JobModalCreate
                cvId={cvId}
                onCreated={onCreatedAts}
                title={title}
                description={description}
                options={options}
              />
            )}
          </div>
          {( isCreatedAts) && (
            <JobModalUpdate
              cvId={cvId}
              options={options}
              onCreated={onCreatedAts}
              title={dataAts?.title}
              description={dataAts?.description}
            />
          )}
          {/* <button className="keyword-button button" onClick={handleCLick}>
            Update job description
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Ats;
