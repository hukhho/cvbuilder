import React, { useEffect, useState } from 'react';
import { getAts } from './finishUpService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import JobModal from '@/app/components/Modal/JobModal';
import JobModalCreate from '@/app/components/Modal/JobModalCreate';

const Ats = ({ cvId }) => {
  const [data, setData] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [isFetched, setIsFetched] = useState(false);

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
    const result = [
      { id: 1, reply: 'Mock 1' },
      { id: 2, reply: 'Mock 2' },
      { id: 3, reply: 'Mock 3' },
      { id: 4, reply: 'Mock 4' },
      { id: 5, reply: 'Mock 5' },
    ];
    setData(result);
  };

  const onCreated = () => {
    fetchData();
  };

  return (
    <div style={{ color: 'black', textAlign: 'left' }}>
      <div className="keyword-card card share-card ">
        <div className="keyword-wrapper">
          <div className="keyword-side">
            <h4>
              <span className="uppercase" style={{ color: 'black' }}>
                AI Keyword Targeting
              </span>
              <sup aria-hidden="true" style={{ paddingLeft: 4, color: 'rgb(204, 204, 204)' }}>
                v2
              </sup>
            </h4>
          </div>
          <div style={{}} className="keyword-list">
            <span className="keyword-infos">
              Want to improve your chances of getting this role? Consider adding the following
              keywords to your resume:
            </span>
            <div>
              <div>
                {data?.map((content, index) => {
                  return (
                    <div key={index} className="bold">
                      <span>
                        {content.ats}
                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 ml-4" />
                      </span>
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
