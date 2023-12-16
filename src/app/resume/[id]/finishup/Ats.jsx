'use client';

import React, { useEffect, useState } from 'react';
import { getAts } from './finishUpService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle, faWarning } from '@fortawesome/free-solid-svg-icons';
import JobModal from '@/app/components/Modal/JobModal';
import JobModalCreate from '@/app/components/Modal/JobModalCreate';
import useStore from '@/store/store';

const Ats = ({ cvId, onGen }) => {
  const [data, setData] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [isFetched, setIsFetched] = useState(false);
  function filterPass(filterData) {
    return filterData?.filter(content => content?.status === 'Pass');
  }

  const fetchData = async () => {
    try {
      console.log('cvId: ', cvId);
      const result = await getAts(cvId);
      setData(result.ats);
      console.log('Ats:data: ', result);
      setTitle(result.title);
      setDescription(result.description);
      setIsFetched(true);
    } catch (error) {
      setIsFetched(true);
      console.error('Error fetching FinishUp data:', error);
    }
  };
  useEffect(() => {
    fetchData();
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
    setData(result.ats);
    setTitle(result.title);
    setDescription(result.description);
    setIsFetched(true);
    // const passed = filterPass(data.ats);
    // console.log(':passed: ', passed);

    // setAts(passed);
  };

  const onCreated = () => {
    fetchData();
  };

  const passedData = filterPass(data);

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
              <button className="button cta mb-8" onClick={handleCLick}>
                GENERATE
              </button>
              Want to improve your chances of getting this role? Consider adding the following
              keywords to your resume:
            </span>
            <div className="mt-4">
              <div>
                {data?.map((content, index) => {
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
              />
            )}
          </div>
          {!(isFetched && (title === undefined || title === null)) && (
            <JobModal cvId={cvId} onCreated={onCreated} title={title} description={description} />
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
