import React, { useEffect, useState } from 'react';
import { getReview } from './finishUpService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { notification, Spin } from 'antd';
import Link from 'next/link';

const ExpertReviewCard = () => {
  return (
    <div style={{ color: 'black', textAlign: 'left' }}>
      <div className="keyword-card card share-card ">
        <div className="keyword-wrapper">
          <div className="keyword-side">
            <h4>Expert Review</h4>
          </div>
          <div style={{}} className="keyword-list">
            <span className="keyword-infos">
              We'll correct all formatting, content, and grammar errors directly in your resume
            </span>
          </div>

          <Link href="/review/list/expert" passHref>
            <button data-size="default" data-theme="default" data-busy="false" className=" button ">
              Ask for Expert Review
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExpertReviewCard;
