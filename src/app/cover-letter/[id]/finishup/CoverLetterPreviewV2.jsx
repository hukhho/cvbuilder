/* eslint-disable */

import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import './preview.css';
import './preview1.css';

import getCoverLetter from './getCoverLetter';
import { Button, Card, Col, InputNumber, Popover, Row, Slider, Tooltip } from 'antd';
import { Box, ChakraProvider, VStack } from '@chakra-ui/react';
import { CommentOutlined } from '@ant-design/icons';
import ContentEditable from 'react-contenteditable';
import * as htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';
import { getCoverLetterHistory } from '../../coverLetterService';

const CoverLetterPreviewV2 = React.forwardRef(({ coverLetterId }, ref) => {
  const [lineHeight, setLineHeight] = useState(1.55);
  const [fontSize, setFontSize] = useState(9);
  const [zoom, setZoom] = useState(100);
  const [content, setContent] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    introDate: '',
    company: '',
    addressto: '',
    content: '',
  });

  const handleLineHeightChange = value => {
    if (isNaN(value)) {
      return;
    }
    setLineHeight(value);
  };

  const handleFontSizeChange = value => {
    if (isNaN(value)) {
      return;
    }
    setFontSize(value);
  };

  const handleZoomChange = value => {
    if (isNaN(value)) {
      return;
    }
    setZoom(value);
  };

  const divStyle = {
    transformOrigin: 'top left',
    transform: `scale(${zoom / 100})`,
    marginLeft: '-13px',
  };

  // Define the content for editable elements using dangerouslySetInnerHTML
  // const content = {
  //   name: 'Charles Bloomberg',
  //   address: 'q9',
  //   phone: '0387788906',
  //   email: 'hunglinode008@protonmail.com',
  //   introDate: 'April 20, 2023',
  //   company: 'hung',
  //   addressto: 'Dear Google',
  //   content: 'cccccccccccccccccccc',
  // };

  // const content2 = await getCoverLetter(1, 1);
  // const content = {
  //   name: content2.user.name,
  //   address: content2.user.address,
  //   phone: content2.user.phone,
  //   email: content2.user.email,
  //   introDate: 'April 20, 2023',
  //   company: content2.user.company,
  //   addressto: 'Dear Google',
  //   content: content2.description,
  // };
  async function fetchData() {
    try {
      const content2 = await getCoverLetterHistory(coverLetterId);
      setContent({
        name: content2?.user?.name,
        address: content2?.user?.address,
        phone: content2?.user?.phone,
        email: content2?.user?.email,
        company: content2?.user?.company,
        content: content2?.description,
      });
    } catch (error) {
      // Handle any errors that occur during the data fetch
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    if (!content.content) {
      fetchData();
    }
  }, [content]);

  const captureRef = useRef();
  const CaptureScreenshot = () => {
    console.log('cap');
    try {
      htmlToImage
        .toCanvas(captureRef.current, { quality: 1, pixelRatio: 10 })
        .then(function (canvas) {
          const imgData = canvas.toDataURL('image/jpeg');

          // Adjust the width and height for A4 size (210mm x 297mm)
          const pdfWidth = 210;
          const pdfHeight = 297;

          const pdf = new jsPDF('p', 'mm', [pdfWidth, pdfHeight]);
          pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`${new Date().toISOString()}.pdf`);
        });
    } catch (error) {
      console.log('Error', error);
    }
  };
  const handleDownloadButtonClick = () => {
    CaptureScreenshot();
  };

  return (
    <>
      <div className="sample-generator-wrapper">
        

        <div>
          <button
            style={{
              width: '60px',
              height: '30px',
              marginTop: '10px',
              marginBottom: '10px',
            }}
            className="button"
            type=""
            onClick={() => handleDownloadButtonClick()}
          >
            Download
          </button>
        


        </div>
        <div className="config" data-active="" />
        {/* <div className="break-page">
          Break
          <div />
        </div> */}
        <div></div>
        <div className="wrapper-cover-letter"  style={divStyle} ref={captureRef}>
          <div className="cover-preview-wrapper">
            <div className="preview">
              <div className="inner">
                <div className="resume">
                  <div className="" template="omega-template" id="resumeWrapper">
                    <article
                      className="omegacover"
                      data-icons="true"
                      style={{ fontSize: `${fontSize}pt`, lineHeight: `${lineHeight}em` }}
                    >
                      <h1 className="name">
                        <span
                          className="editableContent cursor-text"
                          id="cl-name-name"
                          contentEditable="true"
                        >
                          {content?.name}
                        </span>
                      </h1>
                      <div className="contact">
                        <span
                          className="editableContent cursor-text contact-item"
                          id="cl-address-address"
                          contentEditable="true"
                        >
                          {content?.address}
                        </span>
                        <span
                          className="editableContent cursor-text contact-item"
                          id="cl-phone-phone"
                          contentEditable="true"
                        >
                          {content?.phone}
                        </span>
                        <span
                          className="editableContent cursor-text contact-item"
                          id="cl-email-email"
                          contentEditable="true"
                        >
                          {content?.email}
                        </span>
                      </div>
                      <div className="intro">
                        <span
                          className="contact-item"
                          id="cl-intro-date"
                          contentEditable="true"

                          // defaultValue={content.introDate}
                        >
                          {content?.introDate}
                        </span>
                        <span
                          className="editableContent cursor-text contact-item"
                          id="cl-company-company"
                          contentEditable="true"
                          dangerouslySetInnerHTML={{ __html: content?.company }}
                        />
                      </div>
                      <div className="item">
                        <p>
                          {/* <ContentEditable
                            html={content?.content} // innerHTML of the editable div
                            disabled={false} // use true to disable editing
                            tagName="article" // Use a custom HTML tag (uses a div by default)
                          /> */}

                          <span
                            style={{ overflow: 'auto' }}
                            className=""
                            id="cl-content-content"
                            contentEditable="true"
                          >
                            {content?.content}
                          </span>
                        </p>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="compiler-aside" />
        </div>
      </div>
    </>
  );
});

export default CoverLetterPreviewV2;
