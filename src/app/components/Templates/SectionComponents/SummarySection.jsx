/* eslint-disable */

import { Divider, Typography } from 'antd';
import { useRef } from 'react';
import ContentEditable from 'react-contenteditable';

const SummarySection = ({ summary, templateType, handleSummaryChange, layoutStyles }) => {
  const summaryState = useRef(summary);

  const handleChange = (evt, targetName) => {
    console.log('handleChange: ', evt.target.value);
    if (targetName === 'summary') {
      summaryState.current = evt.target.value;
      handleSummaryChange(evt.target.value);
    }
  };

  const handleBlur = (evt, targetName) => {
    if (targetName === 'summary') {
      console.log('handleBlur: ', summaryState.current);
    }
  };
  if (templateType === 'modern') {
    return (
      <>
        <div className="uppercase false " style={{ fontWeight: 600, padding: '0cm 1.4cm' }}>
          <span
            className="editableContent cursor-text  designStudio "
            id="summary-heading"
            style={{ color: 'rgb(46, 61, 80)', fontSize: '1.15em', display: 'block' }}
          >
            Summary
          </span>
        </div>

        <div
          className="relative whitespace-pre-line cursor-text focus:outline-none"
          style={{
            color: 'rgb(46, 61, 80)',
            fontWeight: 400,
            fontSize: '0.85em',
            lineHeight: '1.6em',
            padding: '0cm 1.4cm',
          }}
        >
          <ContentEditable
            className="editableContent cursor-text  designStudio "
            id="summary-summary"
            html={summaryState.current}
            onBlur={e => handleBlur(e, 'summary')}
            onChange={e => handleChange(e, 'summary')}
          />
        </div>
      </>
    );
  } else if (templateType === 'modern-2') {
    <div>
      <div className="uppercase false   " style={{ fontWeight: 600, padding: '0cm 1.4cm' }}>
        <span
          className="editableContent cursor-text  designStudio "
          id="summary-heading"
          tabIndex={0}
          contentEditable="true"
          style={{ color: 'rgb(46, 61, 80)', fontSize: '1.15em', display: 'block' }}
        >
          Summary {templateType}
        </span>
      </div>
      <div
        className="relative whitespace-pre-line cursor-text focus:outline-none"
        style={{
          color: 'red',
          fontWeight: 600,
          // fontSize: '0.85em',
          lineHeight: '1.6em',
          padding: '0cm 1.4cm',
        }}
      >
        <div className="relative">
          <p className="editableContent ghost-hightlight w-full designStudio ">
          
          </p>
        </div>
        <ContentEditable
              className="editableContent cursor-text  designStudio "
              id="summary-summary"
              html={summaryState.current}
              onBlur={e => handleBlur(e, 'summary')}
              onChange={e => handleChange(e, 'summary')}
            />
      </div>
    </div>;
  }
  return (
    <div className="experience leading-snug relative group ">
      <div
        className="uppercase mb-[4px]   "
        style={{
          fontWeight: 600,
          padding: '0cm 1.4cm',
          lineHeight: '1.35em',
        }}
      >
        <span
          className="editableContent cursor-text designStudio"
          id="experience-heading"
          style={{
            color: 'rgb(46, 61, 80)',
            fontSize: '1.15em',
            display: 'block',
          }}
        >
          Summary
        </span>
        <hr className="border-0 border-b-[1px] border-black mt-[1px]"></hr>
      </div>
      <div>
        <div
          className="relative whitespace-pre-line cursor-text focus:outline-none"
          style={{
            color: 'rgb(46, 61, 80)',
            fontWeight: 400,
            fontSize: '0.85em',
            lineHeight: '1.6em',
            padding: '0cm 1.4cm',
          }}
        >
          <div className="relative">
            <ContentEditable
              className="editableContent cursor-text  designStudio "
              id="summary-summary"
              html={summaryState.current}
              onBlur={e => handleBlur(e, 'summary')}
              onChange={e => handleChange(e, 'summary')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarySection;
