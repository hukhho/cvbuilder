/* eslint-disable */

import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import './preview.css';
import getCoverLetter from './getCoverLetter';
import { Button, Card, Popover, Tooltip } from 'antd';
import { Box, ChakraProvider, VStack } from '@chakra-ui/react';
import { CommentOutlined } from '@ant-design/icons';
import ContentEditable from 'react-contenteditable';
import * as htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';

const CoverLetterCard = React.forwardRef(({ coverLetterId }, ref) => {
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
  const handleLineHeightChange = event => {
    setLineHeight(event.target.value);
  };

  const handleFontSizeChange = event => {
    setFontSize(event.target.value);
  };

  const handleZoomChange = event => {
    setZoom(event.target.value);
  };

  const divStyle = {
    transformOrigin: 'top left',
    transform: `scale(0.2)`,
  };
  async function fetchData() {
    try {
      const content2 = await getCoverLetter(coverLetterId);
      setContent({
        name: content2.user.name,
        address: content2.user.address,
        phone: content2.user.phone,
        email: content2.user.email,
        company: content2.user.company,
        content: content2.description,
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
      <div className="sample-generator-wrapper" style={{ userSelect: 'none', pointerEvents: 'none' }}>
        <div className="config" data-active="" />
        <div className="wrapper-cover-letter" style={divStyle} ref={captureRef}>
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
                        <span className="editableContent cursor-text" id="cl-name-name">
                          {content?.name}
                        </span>
                      </h1>
                      <div className="contact">
                        <span
                          className="editableContent cursor-text contact-item"
                          id="cl-address-address"
                        >
                          {content?.address}
                        </span>
                        <span
                          className="editableContent cursor-text contact-item"
                          id="cl-phone-phone"
                        >
                          {content?.phone}
                        </span>
                        <span
                          className="editableContent cursor-text contact-item"
                          id="cl-email-email"
                        >
                          {content?.email}
                        </span>
                      </div>
                      <div className="intro">
                        <span
                          className="contact-item"
                          id="cl-intro-date"

                          // defaultValue={content.introDate}
                        >
                          {content?.introDate}
                        </span>
                        <span
                          className="editableContent cursor-text contact-item"
                          id="cl-company-company"
                          dangerouslySetInnerHTML={{ __html: content.company }}
                        />
                      </div>
                      <div className="item">
                        <p>
                          {/* <ContentEditable
                            html={content?.content} // innerHTML of the editable div
                            disabled={false} // use true to disable editing
                            tagName="article" // Use a custom HTML tag (uses a div by default)
                          /> */}

                          <span style={{ overflow: 'auto' }} className="" id="cl-content-content">
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

export default CoverLetterCard;
