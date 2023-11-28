/* eslint-disable import/no-unresolved */

'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button, Card, ConfigProvider, Divider } from 'antd';
import UserCVBuilderHeader from '@/app/components/UserCVBuilderHeader';
import UserCVBuilderLayout from '@/app/components/Layout/UseCVBuilderLayout';
import UserCoverLetterBuilderHeader from '@/app/components/UserCoverLetterBuilderHeader';

import ExperienceForm from '@/app/components/Form/ExperienceForm';
import CVLayout from '@/app/components/Templates/CVLayout';
import InformationSection from '@/app/components/Templates/SectionComponents/InformationSection';
import SummarySection from '@/app/components/Templates/SectionComponents/SummarySection';
import ExperiencesSection from '@/app/components/Templates/SectionComponents/ExperiencesSection';
import EducationsSection from '@/app/components/Templates/SectionComponents/EducationsSection';
import SkillsSection from '@/app/components/Templates/SectionComponents/SkillsSection';
import FinishupToolbar from '@/app/components/Toolbar/FinishupToolbar';
import CoverLetterPreview from './CoverLetterPreview';

export default function FinishUp({ params }) {
  const [lineHeight, setLineHeight] = useState(1.55);
  const [fontSize, setFontSize] = useState(9);
  const [zoom, setZoom] = useState(100);

  const [enabledCategories, setEnabledCategories] = useState({
    'FINISH UP': true,
  });

  const cvId = params.id;

  const handleLineHeightChange = event => {
    setLineHeight(event.target.value);
  };

  const handleFontSizeChange = event => {
    setFontSize(event.target.value);
  };

  const handleZoomChange = event => {
    setZoom(event.target.value);
  };

  const cvLayoutRef = useRef(null);

  const handleDownloadButtonClick = () => {
    if (cvLayoutRef.current) {
      cvLayoutRef.current.CaptureScreenshot();
    }
  };

  return (
    <main>
      <ConfigProvider>
        <UserCVBuilderLayout
          userHeader={
            <UserCoverLetterBuilderHeader
              coverLetterId={cvId}
              initialEnabledCategories={enabledCategories}
            />
          }
          content={
            <div className="flex mt-8">
              <div className="mr-2 flex flex-col" style={{}}>
                <div style={{ marginBottom: '12px' }} className="adjustment">
                  <div
                    style={{
                      width: '200px',
                      height: '120px',
                    }}
                  />
                </div>

                <div className="">
                  <CoverLetterPreview ref={cvLayoutRef} coverLetterId={params.id} />
                </div>
              </div>

              <div className="flex flex-col items-start">
                <div className="h-1/3">
                  <p>
                    {/* <Image
                      src="https://embed-ssl.wistia.com/deliveries/8dad09e9908219fa4e652dd01ca44c9e.jpg?image_play_button_size=2x&amp;image_crop_resized=960x540&amp;image_play_button=1&amp;image_play_button_color=ebeaede0"
                      width={320}
                      height={182}
                      alt="Video"
                    /> */}
                  </p>
                </div>
                <div className="h-1/3 ">
                  {/* <h1>REZI EXPERT REVIEW</h1>
                  <p>
                    We'll correct all formatting, content, and grammar errors directly in your
                    resume
                  </p> */}
                </div>
              </div>
            </div>
          }
        />
      </ConfigProvider>
    </main>
  );
}
