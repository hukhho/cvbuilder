/* eslint-disable */
'use client';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Divider, Typography } from 'antd';
import { useRef } from 'react';
import ContentEditable from 'react-contenteditable';

const StandardItemV2 = props => {
  const {
    onComment,
    onDeleteComment,
    dataId,
    type,
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
    handleRoleChange,
    handleOrgNameChange,
    handleDescriptionChange,
  } = props;
  const roleState = useRef(role);
  const orgNameState = useRef(orgName);
  const descriptionState = useRef(description);

  const handleChange = (evt, targetName) => {
    console.log('handleChange: ', evt.target.value);
    if (targetName === 'role') {
      orgNameState.current = evt.target.value;
      handleRoleChange(type, typeId, evt.target.value);
    } else if (targetName === 'orgName') {
      orgNameState.current = evt.target.value;
      handleOrgNameChange(type, typeId, evt.target.value);
    } else if (targetName === 'description') {
      descriptionState.current = evt.target.value;
      handleDescriptionChange(type, typeId, evt.target.value);
    }
  };

  const handleBlur = (evt, targetName) => {
    if (targetName === 'role') {
      console.log('handleBlur: ', roleState.current);
    }
  };

  function generateRandomId() {
    return `type-${type}-dataId-${dataId}`;
  }

  const randomId = generateRandomId();

  const renderComments = () => {
    console.log('renderComments: ', description);
    // Extracting comments from the description using a regular expression
    const comments = description.match(/<comment.*?<\/comment>/g);

    if (!comments) {
      return null;
    }

    return comments.map((comment, index) => {
      const commentId = comment.match(/id="(.*?)"/)[1];
      console.log("commentId:", commentId)
      // Parse comment content using regular expression
      const contentMatch = comment.match(/content="(.*?)"/);
      const content = contentMatch ? contentMatch[1] : '';

      return (
        <Card key={commentId} className="comment-bubble" style={{ '--comment-index': index }}>
          {content}
          <button className='ml-4' onClick={() => onDeleteComment(commentId, type, randomId, dataId)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </Card>
      );
    });
  };
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
              // // contentEditable="true"
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
                        // // contentEditable="true"
                      >
                        {role}
                      </span>
                    </div>
                  </span>
                </div>
                <div className="flex gap-2 justify-between font-semibold">
                  <div style={{ color: 'rgb(46, 61, 80)' }}>
                    {firstItem && (
                      <span
                        className="before:first:hidden before:content-['•_'] before:mr-0.5 font-normal"
                        style={{ fontSize: '0.85em' }}
                      >
                        <span
                          className="editableContent cursor-text mr-1 whitespace-pre-wrap designStudio "
                          id="LfWZnVqHS-minor"
                          // // contentEditable="true"
                          style={{ display: 'inline', verticalAlign: 'initial' }}
                        >
                          {firstItem}
                        </span>
                      </span>
                    )}
                    {secondItem && (
                      <span
                        className="before:first:hidden before:content-['•_'] before:mr-0.5 font-normal"
                        style={{ fontSize: '0.85em' }}
                      >
                        <span
                          className="editableContent cursor-text mr-1 whitespace-pre-wrap designStudio "
                          id="LfWZnVqHS-institution"
                          // // contentEditable="true"
                          style={{ display: 'inline', verticalAlign: 'initial' }}
                        >
                          {secondItem}
                        </span>
                      </span>
                    )}
                    {threeItem && (
                      <span
                        className="before:first:hidden before:content-['•_'] before:mr-0.5 font-normal"
                        style={{ fontSize: '0.85em' }}
                      >
                        <span
                          className="editableContent cursor-text mr-1 whitespace-pre-wrap designStudio "
                          id="LfWZnVqHS-location"
                          // // contentEditable="true"
                          style={{ display: 'inline', verticalAlign: 'initial' }}
                        >
                          {threeItem}
                        </span>
                      </span>
                    )}
                    {fourItem && (
                      <span
                        className="before:first:hidden before:content-['•_'] before:mr-0.5 font-normal"
                        style={{ fontSize: '0.85em' }}
                      >
                        <span
                          className="editableContent cursor-text mr-1 whitespace-pre-wrap designStudio "
                          id="LfWZnVqHS-date"
                          // // contentEditable="true"
                          style={{ display: 'inline', verticalAlign: 'initial' }}
                        >
                          {fourItem}
                        </span>
                      </span>
                    )}
                    {fiveItem && (
                      <span
                        className="before:first:hidden before:content-['•_'] before:mr-0.5 font-normal"
                        style={{ fontSize: '0.85em' }}
                      >
                        <span
                          className="editableContent cursor-text mr-1 whitespace-pre-wrap designStudio "
                          id="LfWZnVqHS-gpa"
                          // // contentEditable="true"
                          style={{ display: 'inline', verticalAlign: 'initial' }}
                        >
                          {fiveItem}
                        </span>
                      </span>
                    )}
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
                  // // contentEditable="true"
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
                        // // contentEditable="true"
                        style={{ display: 'inline', verticalAlign: 'baseline' }}
                      >
                        {role}
                      </span>
                    </span>
                    {firstItem && (
                      <span className="text-[#2e3d50] text-[9pt] leading-normal inline whitespace-pre-wrap font-bold before:first:hidden before:content-['|_'] before:mr-[2px] before:inline">
                        <span
                          className="editableContent cursor-text whitespace-pre-wrap mr-[3px] designStudio "
                          id="smpl029042021-company"
                          // // contentEditable="true"
                          style={{ display: 'inline', verticalAlign: 'baseline' }}
                        >
                          {firstItem}
                        </span>
                      </span>
                    )}
                    {secondItem && (
                      <span className="text-[#2e3d50] text-[9pt] leading-normal inline whitespace-pre-wrap font-bold before:first:hidden before:content-['|_'] before:mr-[2px] before:inline">
                        <span
                          className="editableContent cursor-text whitespace-pre-wrap mr-[3px] designStudio "
                          id="smpl029042021-location"
                          // // contentEditable="true"
                          style={{ display: 'inline', verticalAlign: 'baseline' }}
                        >
                          {secondItem}
                        </span>
                      </span>
                    )}
                    {threeItem && (
                      <span className="text-[#2e3d50] text-[9pt] leading-normal inline whitespace-pre-wrap font-bold before:first:hidden before:content-['|_'] before:mr-[2px] before:inline">
                        <span
                          className="editableContent cursor-text whitespace-pre-wrap mr-[3px] designStudio "
                          id="smpl029042021-duration"
                          // // contentEditable="true"
                          style={{ display: 'inline', verticalAlign: 'baseline' }}
                        >
                          {threeItem}
                        </span>
                      </span>
                    )}
                    {fourItem && (
                      <span className="text-[#2e3d50] text-[9pt] leading-normal inline whitespace-pre-wrap font-bold before:first:hidden before:content-['|_'] before:mr-[2px] before:inline">
                        <span
                          className="editableContent cursor-text whitespace-pre-wrap mr-[3px] designStudio "
                          id="smpl029042021-duration"
                          // // contentEditable="true"
                          style={{ display: 'inline', verticalAlign: 'baseline' }}
                        >
                          {fourItem}
                        </span>
                      </span>
                    )}
                    {fiveItem && (
                      <span className="text-[#2e3d50] text-[9pt] leading-normal inline whitespace-pre-wrap font-bold before:first:hidden before:content-['|_'] before:mr-[2px] before:inline">
                        <span
                          className="editableContent cursor-text whitespace-pre-wrap mr-[3px] designStudio "
                          id="smpl029042021-duration"
                          // // contentEditable="true"
                          style={{ display: 'inline', verticalAlign: 'baseline' }}
                        >
                          {fiveItem}
                        </span>
                      </span>
                    )}
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
                      // // contentEditable="true"
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
                {firstItem && (
                  <span
                    className="inline text-[1em] whitespace-pre-wrap font-semibold before:first:hidden before:absolute before:content-['|_']"
                    style={{ color: 'rgb(77, 112, 235)' }}
                  >
                    <span
                      className="editableContent cursor-text mr-1.5 ml-0 designStudio "
                      id="ncQ-wVn_6-role"
                      // // contentEditable="true"
                      style={{ display: 'inline' }}
                    >
                      {firstItem}
                    </span>
                  </span>
                )}
                {secondItem && (
                  <span
                    className="inline text-[1em] whitespace-pre-wrap font-semibold before:first:hidden before:absolute before:content-['|_']"
                    style={{ color: 'rgb(46, 61, 80)' }}
                  >
                    <span
                      className="editableContent cursor-text mr-1.5 ml-2 designStudio "
                      id="ncQ-wVn_6-company"
                      // // contentEditable="true"
                      style={{ display: 'inline' }}
                    >
                      {secondItem}
                    </span>
                  </span>
                )}

                <div>
                  {threeItem && (
                    <span
                      className="text-[1em] inline whitespace-pre-wrap [&:not(:last-child)]:after:content-[','] [&:not(:last-child)]:after:mr-0.5"
                      style={{ color: 'rgb(153, 153, 153)' }}
                    >
                      <span
                        className="editableContent cursor-text  designStudio "
                        id="ncQ-wVn_6-duration"
                        // // contentEditable="true"
                        style={{ display: 'inline' }}
                      >
                        {threeItem}
                      </span>
                    </span>
                  )}
                  {fourItem && (
                    <span
                      className="text-[1em] inline whitespace-pre-wrap [&:not(:last-child)]:after:content-[','] [&:not(:last-child)]:after:mr-0.5"
                      style={{ color: 'rgb(153, 153, 153)' }}
                    >
                      <span
                        className="editableContent cursor-text  designStudio "
                        id="ncQ-wVn_6-location"
                        // // contentEditable="true"
                        style={{ display: 'inline' }}
                      >
                        {fourItem}
                      </span>
                    </span>
                  )}
                  {fiveItem && (
                    <span
                      className="text-[1em] inline whitespace-pre-wrap [&:not(:last-child)]:after:content-[','] [&:not(:last-child)]:after:mr-0.5"
                      style={{ color: 'rgb(153, 153, 153)' }}
                    >
                      <span
                        className="editableContent cursor-text  designStudio "
                        id="ncQ-wVn_6-location"
                        // // contentEditable="true"
                        style={{ display: 'inline' }}
                      >
                        {fiveItem}
                      </span>
                    </span>
                  )}
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
                  // // contentEditable="true"
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
                          {roleState && (
                            <div
                              className="inline-block font-semibold text-[1em] before:first:hidden before:absolute before:content-[',_']"
                              style={{ color: 'rgb(0, 0, 0)' }}
                            >
                              <ContentEditable
                                className="editableContent cursor-text text-[1em]  ml-0 designStudio "
                                html={roleState.current}
                                onBlur={e => handleBlur(e, 'role')}
                                onChange={e => handleChange(e, 'role')}
                              />
                            </div>
                          )}
                        </span>
                      </div>
                      <div className="flex gap-2 justify-between font-semibold">
                        <div>
                          {orgNameState && (
                            <span
                              className="before:first:hidden before:content-['•_'] before:mr-0.5 font-semibold"
                              style={{ fontSize: '0.85em' }}
                            >
                              <ContentEditable
                                className="editableContent cursor-text mr-1 whitespace-pre-wrap designStudio "
                                style={{
                                  display: 'inline',
                                  verticalAlign: 'initial',
                                }}
                                html={orgNameState.current}
                                onBlur={e => handleBlur(e, 'orgName')}
                                onChange={e => handleChange(e, 'orgName')}
                              />
                            </span>
                          )}
                        </div>
                        <div>
                          {duration && (
                            <div
                              className="inline-block before:first:hidden before:absolute"
                              style={{ fontSize: '0.85em' }}
                            >
                              <span
                                className="editableContent cursor-text ml-0 designStudio "
                                id="smpl125032021-duration"
                                // contentEditable="true"
                              >
                                {duration}
                              </span>
                            </div>
                          )}
                          {location && (
                            <div
                              className="inline-block before:first:hidden before:absolute before:content-[',_']"
                              style={{ fontSize: '0.85em' }}
                            >
                              <span
                                className="editableContent cursor-text ml-2 designStudio "
                                id="smpl125032021-location"
                                // contentEditable="true"
                              >
                                {location}
                              </span>
                            </div>
                          )}
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
                      <p
                        className="editableContent cursor-text designStudio"
                        id={randomId}
                        onMouseUp={event => onComment(event, type, randomId, dataId)}
                        dangerouslySetInnerHTML={{ __html: description }}
                      />
                      {renderComments()}
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
                      // contentEditable="true"
                      style={{ display: 'inline', verticalAlign: 'baseline' }}
                    >
                      {role}
                    </span>
                  </span>
                  <span className="text-[#2e3d50] text-[9pt] leading-normal inline whitespace-pre-wrap font-bold before:first:hidden before:content-['|_'] before:mr-[2px] before:inline">
                    <span
                      className="editableContent cursor-text whitespace-pre-wrap mr-[3px] designStudio "
                      id="smpl029042021-company"
                      // contentEditable="true"
                      style={{ display: 'inline', verticalAlign: 'baseline' }}
                    >
                      {orgName}
                    </span>
                  </span>
                  <span className="text-[#2e3d50] text-[9pt] leading-normal inline whitespace-pre-wrap font-bold before:first:hidden before:content-['|_'] before:mr-[2px] before:inline">
                    <span
                      className="editableContent cursor-text whitespace-pre-wrap mr-[3px] designStudio "
                      id="smpl029042021-location"
                      // contentEditable="true"
                      style={{ display: 'inline', verticalAlign: 'baseline' }}
                    >
                      {location}
                    </span>
                  </span>
                  <span className="text-[#2e3d50] text-[9pt] leading-normal inline whitespace-pre-wrap font-bold before:first:hidden before:content-['|_'] before:mr-[2px] before:inline">
                    <span
                      className="editableContent cursor-text whitespace-pre-wrap mr-[3px] designStudio "
                      id="smpl029042021-duration"
                      // contentEditable="true"
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
                    // contentEditable="true"
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
                    // contentEditable="true"
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
                    // contentEditable="true"
                    style={{ display: 'inline' }}
                  >
                    {orgName}
                  </span>
                </span>
                <div>
                  {duration && (
                    <span
                      className="text-[1em] inline whitespace-pre-wrap [&:not(:last-child)]:after:content-[','] [&:not(:last-child)]:after:mr-0.5"
                      style={{ color: 'rgb(153, 153, 153)' }}
                    >
                      <span
                        className="editableContent cursor-text  designStudio "
                        id="smpl125032021-duration"
                        // contentEditable="true"
                        style={{ display: 'inline' }}
                      >
                        {duration}
                      </span>
                    </span>
                  )}
                  {location && (
                    <span
                      className="text-[1em] inline whitespace-pre-wrap [&:not(:last-child)]:after:content-[','] [&:not(:last-child)]:after:mr-0.5"
                      style={{ color: 'rgb(153, 153, 153)' }}
                    >
                      <span
                        className="editableContent cursor-text  designStudio "
                        id="smpl125032021-location"
                        // contentEditable="true"
                        style={{ display: 'inline' }}
                      >
                        {location}
                      </span>
                    </span>
                  )}
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
                  // contentEditable="true"
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

export default StandardItemV2;
