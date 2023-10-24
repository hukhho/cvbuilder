/* eslint-disable no-shadow */

import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import DataService from '@/app/utils/dataService';
import { createCoverLetter } from './coverLetterService';
// import { convertToSliderValue, convertToSliderLabel } from './CreativitySlider';

import { Slider, SliderFilledTrack, SliderThumb, SliderTrack, Tooltip } from '@chakra-ui/react';
import './customtext.css';
import './select.css';
import './coverletter.css';

const stylesInput = {
  width: '100%',
  height: '56.19px',
  padding: '17.30px 15.50px 15.89px',
  backgroundColor: 'white',
  borderRadius: '4px',
  border: '2px solid #e5e5e5',
  fontSize: '16px',
  fontWeight: '600',
  fontFamily: 'Source Sans Pro, sans-serif',
};

const CoverLetterContent = ({ cvId, onCreated, data }) => {
  const [content, setContent] = useState();

  return (
    <div className="w-full">
      <div class="relative mt-10 border-2 border-gray-300 rounded-md">
        <textarea
          className="inputEl"
          id="content-section-form-0"
          aria-label="Write a professional **cover letter**"
          rows={20}
          placeholder="As an accomplished Marketing graduate from Wisconsin University with years of strategic marketing and data analysis experience, ..."
          name="content"
          onChange={e => {
            setContent(e.target.value);
          }}
          value={content}
          style={{ background: 'white', height: 545, width: 1000 }}
          // defaultValue={content}
        />
      </div>
    </div>
  );
};

export default CoverLetterContent;
