import React, { useEffect, useState } from 'react';
import { getReview } from './finishUpService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { notification, Spin } from 'antd';
import Link from 'next/link';
import VideoComponentV2 from '@/app/components/VideoComponentV2';

const VideoCard = () => {
  return (
    <div style={{ paddingLeft: '14px', paddingRight: '14px' }}>
      <VideoComponentV2 />
    </div>
  );
};

export default VideoCard;
