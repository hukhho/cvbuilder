import React, { useEffect, useState } from 'react';
import { getReview } from './finishUpService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { notification, Spin } from 'antd';

const AiFeedback = ({ cvId }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      console.log('cvId: ', cvId);
      const result = await getReview(cvId);
      // const result = [
      //   { id: 1, reply: 'Mock 1' },
      //   { id: 2, reply: 'Mock 2' },
      //   { id: 3, reply: 'Mock 3' },
      //   { id: 4, reply: 'Mock 4' },
      //   { id: 5, reply: 'Mock 5' },
      // ];

      setData(result);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      openNotification('bottomRight', error?.message);

      console.error('Error fetching FinishUp data:', error);
    }
  };
  useEffect(() => {
    // fetchData();
  }, []);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message) => {
    api.info({
      message: 'Notification',
      description: message,
      placement,
    });
  };
  const handleCLick = () => {
    // const result = [
    //   { id: 1, reply: 'Mock 1' },
    //   { id: 2, reply: 'Mock 2' },
    //   { id: 3, reply: 'Mock 3' },
    //   { id: 4, reply: 'Mock 4' },
    //   { id: 5, reply: 'Mock 5' },
    // ];
    // setData(result);
    fetchData();
    openNotification('bottomRight', 'Wait some second');
    setData();
  };
  return (
    <div style={{ color: 'black', textAlign: 'left' }}>
      {contextHolder}

      <div className="keyword-card card share-card ">
        <div className="keyword-wrapper">
          <div className="keyword-side">
            <h4>
              AI Feedback CV
              <sup aria-hidden="true" style={{ paddingLeft: 4, color: 'rgb(204, 204, 204)' }}>
                Beta
              </sup>
            </h4>
          </div>
          <div style={{}} className="keyword-list">
            <span className="keyword-infos">
              We will help you give a overall feedback for your CV:
            </span>
            <div>
              <div>
                {/* {data?.map((content, index) => {
                  return (
                    <div key={index} className="bold">
                      <span>
                        {content.reply}{' '}
                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 ml-4" />
                      </span>
                    </div>
                  );
                })} */}
                {data?.reply}
              </div>
            </div>
          </div>

          <button
            style={{ visibility: isLoading ? 'hidden' : 'visible' }}
            disabled={isLoading}
            className="keyword-button button"
            onClick={handleCLick}
          >
            Feedback CV
          </button>

          {isLoading && (
            <Spin tip="AI is writing" className="mb-8" size="small">
              <div className="content" />
            </Spin>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiFeedback;
