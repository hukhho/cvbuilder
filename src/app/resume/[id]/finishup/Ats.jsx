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

const Ats = ({
  cvId,
  dataAts,
  setDataAts,
  onGen,
  onDisableHightlight,
  isCreatedAts,
  setIsCreatedAts,
}) => {
  console.log('dataAts:', dataAts);
  const [title, setTitle] = useState(dataAts?.title);
  const [description, setDescription] = useState(dataAts?.description);
  const [isFetched, setIsFetched] = useState(false);

  function filterPass(filterData) {
    return filterData?.filter(content => content?.status === 'Pass');
  }

  const fetchData = async () => {
    try {
      console.log('cvId: ', cvId);
      const result = await getAts(cvId);

      setDataAts(result);
      console.log('Ats:data: ', result);
      if (result?.title && result?.description) {
        setTitle(result.title);
        setDescription(result.description);
        setIsCreatedAts(true);
      }
      // setTitle(result.title);
      // setDescription(result.description);

      const passed = filterPass(result.ats);
      console.log(':passed: ', passed);

      onGen(passed);
    } catch (error) {
      console.error('Error fetching FinishUp data:', error);
    } finally {
      setIsFetched(true);
    }
  };

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
    if (dataAts === undefined || dataAts === null) {
      fetchData();
      fetchExperiences();
    }
  }, []);

  const handleCLick = () => {
    const result = {
      title: 'Associate Product Manager',
      description:
        'Gather, analyze and create high-level requirements\nParticipate in the product prototyping process, interface mock-up, wireframe, and GUI creation in an Agile environment\nAnalyze market trends and perform competitor analysis\nShare the business value to the development team, so they understand the intent behind the new feature, release, or product\nWork with the assigned Product Managers to define the product roadmap and vision\nPrioritize features by ranking them against the strategic goals and initiatives to make sure the delivery of the product, including managing dependencies in and across releases to complete release phases and milestones\nCoordinating all of the activities required to bring the product to market. This involves bridging gaps between different functions within the company and aligning all of the teams involved (e.g: Marketing, Sales & Sucess, Customer Support, others)\nDetermine which ideas should be promoted into features to push the product strategy forward\nEnsure that feedback and requests are seamlessly integrated into the product planning and development processes\nAt least 1 year of experience in Product Owner, IT Business Analyst, Product Executive or similar roles\nPossess Agile and Scrum practices\nGood presentation and stakeholder management\nAdvanced English and aptitude for learning and understanding new and emerging technologies\nBe familiar with requirement specification techniques: user story, modeling, prototyping.\nPossess great knowledge about requirement elicitation/management\nGood organizational, analytical, as well as oral, and written communication skills',
      ats: [
        {
          ats: 'Product Owner',
          status: 'Pass',
        },
        {
          ats: 'Product Manager',
          status: 'Pass',
        },
        {
          ats: 'Analyze',
          status: 'Pass',
        },
        {
          ats: 'High-level requirements',
          status: 'Warning',
        },
        {
          ats: 'Product prototyping',
          status: 'Warning',
        },
        {
          ats: 'Agile environment',
          status: 'Warning',
        },
        {
          ats: 'Market trends',
          status: 'Warning',
        },
        {
          ats: 'Competitor analysis',
          status: 'Warning',
        },
        {
          ats: 'Business value',
          status: 'Warning',
        },
        {
          ats: 'Product roadmap',
          status: 'Warning',
        },
        {
          ats: 'Vision',
          status: 'Warning',
        },
        {
          ats: 'Prioritize features',
          status: 'Warning',
        },
        {
          ats: 'Strategic goals',
          status: 'Warning',
        },
        {
          ats: 'Dependencies',
          status: 'Warning',
        },
        {
          ats: 'Product strategy',
          status: 'Warning',
        },
        {
          ats: 'Requirement specification techniques',
          status: 'Warning',
        },
      ],
    };
    setDataAts(result);

    // setTitle(result.title);
    // setDescription(result.description);
    setIsFetched(true);

    const passed = filterPass(result.ats);
    console.log(':passed: ', passed);
    onGen(passed);

    // setAts(passed);
  };

  const handleCLickDisableHighLight = () => {
    onDisableHightlight();
  };

  const onCreated = () => {
    fetchData();
  };

  const passedData = filterPass(dataAts?.ats);

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
              <button className="button cta mb-8" onClick={handleCLickDisableHighLight}>
                DISABLE HIGHLIGHT
              </button>
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
            {isFetched && (title === undefined || title === null) && (
              <JobModalCreate
                cvId={cvId}
                onCreated={onCreated}
                title={title}
                description={description}
                options={options}
              />
            )}
          </div>
          {!(isFetched && (title === undefined || title === null)) && (
            <JobModalUpdate
              cvId={cvId}
              options={options}
              onCreated={onCreated}
              title={title}
              description={description}
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
