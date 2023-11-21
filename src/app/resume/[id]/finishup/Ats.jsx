import React, { useEffect, useState } from 'react';
import { getAts } from './finishUpService';

const Ats = ({ cvId }) => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('cvId: ', cvId);
        const result = await getAts(cvId);
        setData(result);
      } catch (error) {
        console.error('Error fetching FinishUp data:', error);
      }
    };
    fetchData();
  }, []);

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
                <span>
                  {data} <i className="fas fa-times" aria-hidden="true" />
                </span>
                <span>
                  <i className="fas fa-circle" aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>
          <button className="keyword-button button">Update job description</button>
        </div>
      </div>
    </div>
  );
};

export default Ats;
