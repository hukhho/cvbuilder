'use client';

import { Divider, Typography } from 'antd';

const StandardItem = props => {
  const {
    role,
    orgName,
    duration,
    description,
    location,
    templateType,
    titleProps,
    isThreeLine,
    firstItem,
    secondItem,
    threeItem,
    fourItem,
    fiveItem,
  } = props;
  console.log('StandardItem::: ', props);
  const renderTitle = () => {
    if (titleProps) {
      return (
        <div
          className="XHKKXx5eVL relative group "
          style={{ paddingLeft: '1.4cm', paddingRight: '1.4cm' }}
        >
          <i
            className="fas fa-sort absolute left-[20px] null top-1 text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 cursor-grab z-50 "
            aria-hidden="true"
          />
          <div
            className="relative whitespace-pre-line"
            style={{ fontWeight: 700, fontSize: '0.85em' }}
          >
            <div className="relative">
              {/* <p className="editableContent ghost-hightlight w-full designStudio ">
              <span>
                <span className="">{titleProps}</span>
              </span>
            </p> */}
            </div>
            <p
              className="editableContent cursor-text  designStudio  "
              id="XHKKXx5eVL-skill"
              contentEditable="true"
            >
              {titleProps}
            </p>
          </div>
        </div>
      );
    }
    if (isThreeLine === true) {
      switch (templateType) {
        case 'classical':
          return (
            <div
              className="LfWZnVqHS leading-snug relative group "
              style={{ paddingLeft: '1.4cm', paddingRight: '1.4cm' }}
            >
              <div className="">
                <div className="flex gap-2">
                  <span className="text-[#1E2245]" style={{ color: 'rgb(30, 34, 69)' }}>
                    <div
                      className="inline-block font-semibold text-[1em] before:first:hidden before:absolute before:content-[',_']"
                      style={{ color: 'rgb(30, 34, 69)' }}
                    >
                      <span
                        className="editableContent cursor-text text-[1em] leading-snug ml-0 designStudio "
                        id="LfWZnVqHS-qualification"
                        contentEditable="true"
                      >
                        {role}
                      </span>
                    </div>
                  </span>
                </div>
                <div className="flex gap-2 justify-between font-semibold">
                  <div style={{ color: 'rgb(46, 61, 80)' }}>
                    <span
                      className="before:first:hidden before:content-['•_'] before:mr-0.5 font-normal"
                      style={{ fontSize: '0.85em' }}
                    >
                      <span
                        className="editableContent cursor-text mr-1 whitespace-pre-wrap designStudio "
                        id="LfWZnVqHS-minor"
                        contentEditable="true"
                        style={{ display: 'inline', verticalAlign: 'initial' }}
                      >
                        {firstItem}
                      </span>
                    </span>
                    <span
                      className="before:first:hidden before:content-['•_'] before:mr-0.5 font-normal"
                      style={{ fontSize: '0.85em' }}
                    >
                      <span
                        className="editableContent cursor-text mr-1 whitespace-pre-wrap designStudio "
                        id="LfWZnVqHS-institution"
                        contentEditable="true"
                        style={{ display: 'inline', verticalAlign: 'initial' }}
                      >
                        {secondItem}
                      </span>
                    </span>
                    <span
                      className="before:first:hidden before:content-['•_'] before:mr-0.5 font-normal"
                      style={{ fontSize: '0.85em' }}
                    >
                      <span
                        className="editableContent cursor-text mr-1 whitespace-pre-wrap designStudio "
                        id="LfWZnVqHS-location"
                        contentEditable="true"
                        style={{ display: 'inline', verticalAlign: 'initial' }}
                      >
                        {threeItem}
                      </span>
                    </span>
                    <span
                      className="before:first:hidden before:content-['•_'] before:mr-0.5 font-normal"
                      style={{ fontSize: '0.85em' }}
                    >
                      <span
                        className="editableContent cursor-text mr-1 whitespace-pre-wrap designStudio "
                        id="LfWZnVqHS-date"
                        contentEditable="true"
                        style={{ display: 'inline', verticalAlign: 'initial' }}
                      >
                        {fourItem}
                      </span>
                    </span>
                    <span
                      className="before:first:hidden before:content-['•_'] before:mr-0.5 font-normal"
                      style={{ fontSize: '0.85em' }}
                    >
                      <span
                        className="editableContent cursor-text mr-1 whitespace-pre-wrap designStudio "
                        id="LfWZnVqHS-gpa"
                        contentEditable="true"
                        style={{ display: 'inline', verticalAlign: 'initial' }}
                      >
                        {fiveItem}
                      </span>
                    </span>
                  </div>
                  <div style={{ color: 'rgb(46, 61, 80)' }} />
                </div>
              </div>
              <div
                className="relative whitespace-pre-line "
                style={{
                  color: 'rgb(46, 61, 80)',
                  lineHeight: '1.6em',
                  fontSize: '0.85em',
                  fontWeight: 100,
                }}
              >
                <p
                  className="editableContent cursor-text  designStudio "
                  id="LfWZnVqHS-description"
                  contentEditable="true"
                >
                  {description}
                </p>
              </div>
            </div>
          );
        case 'modern':
          return (
            <div>
              <div>
                <div
                  className="smpl029042021 leading-snug relative group "
                  style={{ paddingLeft: '1.4cm', paddingRight: '1.4cm', marginBottom: 8 }}
                >
                  <i
                    className="fas fa-sort absolute left-[20px] null top-1 text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 cursor-grab z-50 "
                    aria-hidden="true"
                  />
                  <div className="">
                    <span className="text-[#2e3d50] text-[9pt] leading-normal inline whitespace-pre-wrap font-bold before:first:hidden before:content-['|_'] before:mr-[2px] before:inline">
                      <span
                        className="editableContent cursor-text whitespace-pre-wrap mr-[3px] designStudio "
                        id="smpl029042021-role"
                        contentEditable="true"
                        style={{ display: 'inline', verticalAlign: 'baseline' }}
                      >
                        {role}
                      </span>
                    </span>
                    <span className="text-[#2e3d50] text-[9pt] leading-normal inline whitespace-pre-wrap font-bold before:first:hidden before:content-['|_'] before:mr-[2px] before:inline">
                      <span
                        className="editableContent cursor-text whitespace-pre-wrap mr-[3px] designStudio "
                        id="smpl029042021-company"
                        contentEditable="true"
                        style={{ display: 'inline', verticalAlign: 'baseline' }}
                      >
                        {firstItem}
                      </span>
                    </span>
                    <span className="text-[#2e3d50] text-[9pt] leading-normal inline whitespace-pre-wrap font-bold before:first:hidden before:content-['|_'] before:mr-[2px] before:inline">
                      <span
                        className="editableContent cursor-text whitespace-pre-wrap mr-[3px] designStudio "
                        id="smpl029042021-location"
                        contentEditable="true"
                        style={{ display: 'inline', verticalAlign: 'baseline' }}
                      >
                        {secondItem}
                      </span>
                    </span>
                    <span className="text-[#2e3d50] text-[9pt] leading-normal inline whitespace-pre-wrap font-bold before:first:hidden before:content-['|_'] before:mr-[2px] before:inline">
                      <span
                        className="editableContent cursor-text whitespace-pre-wrap mr-[3px] designStudio "
                        id="smpl029042021-duration"
                        contentEditable="true"
                        style={{ display: 'inline', verticalAlign: 'baseline' }}
                      >
                        {threeItem}
                      </span>
                    </span>
                    <span className="text-[#2e3d50] text-[9pt] leading-normal inline whitespace-pre-wrap font-bold before:first:hidden before:content-['|_'] before:mr-[2px] before:inline">
                      <span
                        className="editableContent cursor-text whitespace-pre-wrap mr-[3px] designStudio "
                        id="smpl029042021-duration"
                        contentEditable="true"
                        style={{ display: 'inline', verticalAlign: 'baseline' }}
                      >
                        {fourItem}
                      </span>
                    </span>
                    <span className="text-[#2e3d50] text-[9pt] leading-normal inline whitespace-pre-wrap font-bold before:first:hidden before:content-['|_'] before:mr-[2px] before:inline">
                      <span
                        className="editableContent cursor-text whitespace-pre-wrap mr-[3px] designStudio "
                        id="smpl029042021-duration"
                        contentEditable="true"
                        style={{ display: 'inline', verticalAlign: 'baseline' }}
                      >
                        {fiveItem}
                      </span>
                    </span>
                  </div>
                  <div
                    className="text-[0.85em] relative whitespace-pre-line "
                    style={{
                      color: 'rgb(46, 61, 80)',
                      lineHeight: '1.6em',
                      fontSize: '0.85em',
                      fontWeight: 400,
                    }}
                  >
                    <p
                      className="editableContent cursor-text  designStudio "
                      id="smpl029042021-description"
                      contentEditable="true"
                    >
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        case 'modern-2':
          return (
            <div
              className="ncQ-wVn_6 leading-snug relative group "
              style={{ paddingLeft: '1.4cm', paddingRight: '1.4cm', marginBottom: 11 }}
            >
              <i
                className="fas fa-sort absolute left-[20px] null top-1 text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 cursor-grab z-50 "
                aria-hidden="true"
              />
              <div className="">
                <span
                  className="inline text-[1em] whitespace-pre-wrap font-semibold before:first:hidden before:absolute before:content-['|_']"
                  style={{ color: 'rgb(77, 112, 235)' }}
                >
                  <span
                    className="editableContent cursor-text mr-1.5 ml-0 designStudio "
                    id="ncQ-wVn_6-role"
                    contentEditable="true"
                    style={{ display: 'inline' }}
                  >
                    {firstItem}
                  </span>
                </span>
                <span
                  className="inline text-[1em] whitespace-pre-wrap font-semibold before:first:hidden before:absolute before:content-['|_']"
                  style={{ color: 'rgb(46, 61, 80)' }}
                >
                  <span
                    className="editableContent cursor-text mr-1.5 ml-2 designStudio "
                    id="ncQ-wVn_6-company"
                    contentEditable="true"
                    style={{ display: 'inline' }}
                  >
                    {secondItem}
                  </span>
                </span>
                <div>
                  <span
                    className="text-[1em] inline whitespace-pre-wrap [&:not(:last-child)]:after:content-[','] [&:not(:last-child)]:after:mr-0.5"
                    style={{ color: 'rgb(153, 153, 153)' }}
                  >
                    <span
                      className="editableContent cursor-text  designStudio "
                      id="ncQ-wVn_6-duration"
                      contentEditable="true"
                      style={{ display: 'inline' }}
                    >
                      {threeItem}
                    </span>
                  </span>
                  <span
                    className="text-[1em] inline whitespace-pre-wrap [&:not(:last-child)]:after:content-[','] [&:not(:last-child)]:after:mr-0.5"
                    style={{ color: 'rgb(153, 153, 153)' }}
                  >
                    <span
                      className="editableContent cursor-text  designStudio "
                      id="ncQ-wVn_6-location"
                      contentEditable="true"
                      style={{ display: 'inline' }}
                    >
                      {fourItem}
                    </span>
                  </span>
                  <span
                    className="text-[1em] inline whitespace-pre-wrap [&:not(:last-child)]:after:content-[','] [&:not(:last-child)]:after:mr-0.5"
                    style={{ color: 'rgb(153, 153, 153)' }}
                  >
                    <span
                      className="editableContent cursor-text  designStudio "
                      id="ncQ-wVn_6-location"
                      contentEditable="true"
                      style={{ display: 'inline' }}
                    >
                      {fiveItem}
                    </span>
                  </span>
                </div>
              </div>
              <div
                className="text-[0.85em] relative whitespace-pre-line "
                style={{
                  color: 'rgb(46, 61, 80)',
                  lineHeight: '1.6em',
                  fontSize: '0.85em',
                  fontWeight: 400,
                }}
              >
                <div className="relative">
                  {/* <p className="editableContent ghost-hightlight w-full designStudio ">
                    <span>
                      <span className="">{</span>
                    </span>
                  </p> */}
                </div>
                <p
                  className="editableContent cursor-text  designStudio "
                  id="ncQ-wVn_6-description"
                  contentEditable="true"
                >
                  {description}
                </p>
              </div>
            </div>
          );
        default:
          return null;
      }
    } else {
      switch (templateType) {
        case 'classical':
          return (
            <div className="relative group">
              <div className="flex flex-col">
                <ul className="sortable-container">
                  <li
                    className="smpl125032021 relative group"
                    style={{
                      paddingLeft: '1.4cm',
                      paddingRight: '1.4cm',
                      marginBottom: 11,
                    }}
                  >
                    <i
                      className="fas fa-sort absolute left-[20px] null top-1 text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 cursor-grab z-50 "
                      aria-hidden="true"
                    />
                    <div className="">
                      <div className="flex gap-2">
                        <span className="text-[#000000]" style={{ color: 'rgb(0, 0, 0)' }}>
                          <div
                            className="inline-block font-semibold text-[1em] before:first:hidden before:absolute before:content-[',_']"
                            style={{ color: 'rgb(0, 0, 0)' }}
                          >
                            <span
                              className="editableContent cursor-text text-[1em]  ml-0 designStudio "
                              id="smpl125032021-role"
                              contentEditable="true"
                            >
                              {role}
                            </span>
                          </div>
                        </span>
                      </div>
                      <div className="flex gap-2 justify-between font-semibold">
                        <div>
                          <span
                            className="before:first:hidden before:content-['•_'] before:mr-0.5 font-semibold"
                            style={{ fontSize: '0.85em' }}
                          >
                            <span
                              className="editableContent cursor-text mr-1 whitespace-pre-wrap designStudio "
                              id="smpl125032021-company"
                              contentEditable="true"
                              style={{
                                display: 'inline',
                                verticalAlign: 'initial',
                              }}
                            >
                              {orgName}
                            </span>
                          </span>
                        </div>
                        <div>
                          <div
                            className="inline-block before:first:hidden before:absolute"
                            style={{ fontSize: '0.85em' }}
                          >
                            <span
                              className="editableContent cursor-text ml-0 designStudio "
                              id="smpl125032021-duration"
                              contentEditable="true"
                            >
                              {duration}
                            </span>
                          </div>
                          <div
                            className="inline-block before:first:hidden before:absolute before:content-[',_']"
                            style={{ fontSize: '0.85em' }}
                          >
                            <span
                              className="editableContent cursor-text ml-2 designStudio "
                              id="smpl125032021-location"
                              contentEditable="true"
                            >
                              {location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="text-[0.85em] relative whitespace-pre-line "
                      style={{
                        fontSize: '0.85em',
                        fontWeight: 100,
                      }}
                    >
                      {/* <div className="relative">
                        <p className="editableContent ghost-hightlight w-full designStudio ">
                          <span>
                            <span className="">{description}</span>
                          </span>
                        </p>
                      </div> */}
                      <p
                        className="editableContent cursor-text  designStudio "
                        id="smpl125032021-description"
                        contentEditable="true"
                      >
                        {description}
                      </p>
                    </div>
                  </li>
                </ul>
                <div id="DndDescribedBy-2" style={{ display: 'none' }}>
                  To pick up a draggable item, press the space bar. While dragging, use the arrow
                  keys to move the item. Press space again to drop the item in its new position, or
                  press escape to cancel.
                </div>
                <div
                  id="DndLiveRegion-1"
                  role="status"
                  aria-live="assertive"
                  aria-atomic="true"
                  style={{
                    position: 'fixed',
                    width: 1,
                    height: 1,
                    margin: '-1px',
                    border: 0,
                    padding: 0,
                    overflow: 'hidden',
                    clip: 'rect(0px, 0px, 0px, 0px)',
                    clipPath: 'inset(100%)',
                    whiteSpace: 'nowrap',
                  }}
                />
              </div>
            </div>
          );
        case 'modern':
          return (
            <div>
              <div
                className="smpl029042021 leading-snug relative group "
                style={{ paddingLeft: '1.4cm', paddingRight: '1.4cm', marginBottom: 8 }}
              >
                <i
                  className="fas fa-sort absolute left-[20px] null top-1 text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 cursor-grab z-50 "
                  aria-hidden="true"
                />
                <div className="">
                  <span className="text-[#2e3d50] text-[9pt] leading-normal inline whitespace-pre-wrap font-bold before:first:hidden before:content-['|_'] before:mr-[2px] before:inline">
                    <span
                      className="editableContent cursor-text whitespace-pre-wrap mr-[3px] designStudio "
                      id="smpl029042021-role"
                      contentEditable="true"
                      style={{ display: 'inline', verticalAlign: 'baseline' }}
                    >
                      {role}
                    </span>
                  </span>
                  <span className="text-[#2e3d50] text-[9pt] leading-normal inline whitespace-pre-wrap font-bold before:first:hidden before:content-['|_'] before:mr-[2px] before:inline">
                    <span
                      className="editableContent cursor-text whitespace-pre-wrap mr-[3px] designStudio "
                      id="smpl029042021-company"
                      contentEditable="true"
                      style={{ display: 'inline', verticalAlign: 'baseline' }}
                    >
                      {orgName}
                    </span>
                  </span>
                  <span className="text-[#2e3d50] text-[9pt] leading-normal inline whitespace-pre-wrap font-bold before:first:hidden before:content-['|_'] before:mr-[2px] before:inline">
                    <span
                      className="editableContent cursor-text whitespace-pre-wrap mr-[3px] designStudio "
                      id="smpl029042021-location"
                      contentEditable="true"
                      style={{ display: 'inline', verticalAlign: 'baseline' }}
                    >
                      {location}
                    </span>
                  </span>
                  <span className="text-[#2e3d50] text-[9pt] leading-normal inline whitespace-pre-wrap font-bold before:first:hidden before:content-['|_'] before:mr-[2px] before:inline">
                    <span
                      className="editableContent cursor-text whitespace-pre-wrap mr-[3px] designStudio "
                      id="smpl029042021-duration"
                      contentEditable="true"
                      style={{ display: 'inline', verticalAlign: 'baseline' }}
                    >
                      {duration}
                    </span>
                  </span>
                </div>
                <div
                  className="text-[0.85em] relative whitespace-pre-line "
                  style={{
                    color: 'rgb(46, 61, 80)',
                    lineHeight: '1.6em',
                    fontSize: '0.85em',
                    fontWeight: 400,
                  }}
                >
                  <p
                    className="editableContent cursor-text  designStudio "
                    id="smpl029042021-description"
                    contentEditable="true"
                  >
                    {description}
                  </p>
                </div>
              </div>
            </div>
          );
        case 'modern-2':
          return (
            <div
              className="smpl125032021 leading-snug relative group "
              style={{ paddingLeft: '1.4cm', paddingRight: '1.4cm' }}
            >
              <i
                className="fas fa-sort absolute left-[20px] null top-1 text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 cursor-grab z-50 "
                aria-hidden="true"
              />
              <div className="">
                <span
                  className="inline text-[1em] whitespace-pre-wrap font-semibold before:first:hidden before:absolute before:content-['|_']"
                  style={{ color: 'rgb(77, 112, 235)' }}
                >
                  <span
                    className="editableContent cursor-text mr-1.5 ml-0 designStudio "
                    id="smpl125032021-role"
                    contentEditable="true"
                    style={{ display: 'inline' }}
                  >
                    {role}
                  </span>
                </span>
                <span
                  className="inline text-[1em] whitespace-pre-wrap font-semibold before:first:hidden before:absolute before:content-['|_']"
                  style={{ color: 'rgb(46, 61, 80)' }}
                >
                  <span
                    className="editableContent cursor-text mr-1.5 ml-2 designStudio "
                    id="smpl125032021-company"
                    contentEditable="true"
                    style={{ display: 'inline' }}
                  >
                    {orgName}
                  </span>
                </span>
                <div>
                  <span
                    className="text-[1em] inline whitespace-pre-wrap [&:not(:last-child)]:after:content-[','] [&:not(:last-child)]:after:mr-0.5"
                    style={{ color: 'rgb(153, 153, 153)' }}
                  >
                    <span
                      className="editableContent cursor-text  designStudio "
                      id="smpl125032021-duration"
                      contentEditable="true"
                      style={{ display: 'inline' }}
                    >
                      {duration}
                    </span>
                  </span>
                  <span
                    className="text-[1em] inline whitespace-pre-wrap [&:not(:last-child)]:after:content-[','] [&:not(:last-child)]:after:mr-0.5"
                    style={{ color: 'rgb(153, 153, 153)' }}
                  >
                    <span
                      className="editableContent cursor-text  designStudio "
                      id="smpl125032021-location"
                      contentEditable="true"
                      style={{ display: 'inline' }}
                    >
                      {location}
                    </span>
                  </span>
                </div>
              </div>
              <div
                className="text-[0.85em] relative whitespace-pre-line "
                style={{
                  color: 'rgb(46, 61, 80)',
                  lineHeight: '1.6em',
                  fontSize: '0.85em',
                  fontWeight: 400,
                }}
              >
                {/* <div className="relative">
                  <p className="editableContent ghost-hightlight w-full designStudio ">
                    <span>
                      <span className="">• cc</span>
                    </span>
                  </p>
                </div> */}
                <p
                  className="editableContent cursor-text  designStudio "
                  id="smpl125032021-description"
                  contentEditable="true"
                >
                  {description}
                </p>
              </div>
            </div>
          );
        default:
          return null;
      }
    }
  };

  return <>{renderTitle()} </>;
};

export default StandardItem;
