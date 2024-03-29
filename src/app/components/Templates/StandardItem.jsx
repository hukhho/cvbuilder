'use client';

import { Editable } from '@chakra-ui/react';
import { Divider, Typography } from 'antd';
import { useRef } from 'react';
import ContentEditable from 'react-contenteditable';
import Highlighter from 'react-highlight-words';
import he from 'he';

const StandardItem = props => {
  const {
    type,
    typeId,
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
    highlightAts = [],
    isDisplay = true,
    isEnableAts = false,
    isEditable = false,
    handleRoleChange,
    handleOrgNameChange,
    handleDescriptionChange,
  } = props;

  let searchWords = [];
  if (highlightAts && highlightAts.length > 0) {
    searchWords = highlightAts.map(at => at?.ats);
  }

  const roleState = useRef(role);
  const orgNameState = useRef(orgName);
  const descriptionState = useRef(description);
  const titlePropsState = useRef(titleProps);

  const handleChange = (evt, targetName) => {
    console.log('handleChange: ', targetName, evt.target.value);

    if (targetName === 'role') {
      orgNameState.current = evt.target.value;
      handleRoleChange(type, typeId, evt.target.value);
    } else if (targetName === 'orgName') {
      orgNameState.current = evt.target.value;
      handleOrgNameChange(type, typeId, evt.target.value);
    } else if (targetName === 'description') {
      const decodedContent = he.decode(evt.target.value);

      descriptionState.current = decodedContent;

      handleDescriptionChange(type, typeId, decodedContent);
    }
  };

  const handleBlur = (evt, targetName) => {
    if (targetName === 'role') {
      console.log('handleBlur: ', roleState?.current);
    }
  };

  console.log('hStandardItem:highlightAts::: ', highlightAts);
  if (!isDisplay) {
    return null;
  }
  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();

      const { current } = descriptionState;
      const cursorPosition = event.target.selectionStart;

      // Find the start of the line
      let lineStart = cursorPosition;
      while (lineStart > 0 && current[lineStart - 1] !== '\n') {
        // eslint-disable-next-line no-plusplus
        lineStart--;
      }

      // Check if the line already starts with a bullet point
      const lineText = current.slice(lineStart, cursorPosition).trim();
      const newLine = lineText === '•' ? '\n' : '\n • ';

      // Use insertHTML to add a new line with a bullet point
      document.execCommand('insertHTML', false, newLine);

      // Ensure the caret is at the correct position
      const newCursorPosition = cursorPosition + newLine.length;
      event.target.setSelectionRange(newCursorPosition, newCursorPosition);

      // Handle any additional changes if needed
      descriptionState.current = event.target.value;
      handleDescriptionChange(type, typeId, event.target.value);
    }
  };

  console.log('isEnableAts', isEnableAts);
  const renderEditableDescription = () => {
    if (isEditable && !isEnableAts) {
      return (
        descriptionState && (
          <ContentEditable
            className="designStudio"
            style={{
              display: 'inline',
              verticalAlign: 'initial',
            }}
            html={descriptionState.current}
            onBlur={e => handleBlur(e, 'description')}
            onChange={e => handleChange(e, 'description')}
            onKeyPress={handleKeyPress} // Add onKeyPress prop
          />
        )
      );
    }
    return searchWords && searchWords.length && isEnableAts > 0 ? (
      <Highlighter
        id="LfWZnVqHS-description"
        highlightClassName="editableContent cursor-text  designStudio"
        searchWords={searchWords} // Use dynamically generated searchWords
        autoEscape
        textToHighlight={description}
      />
    ) : (
      <p
        className="editableContent cursor-text  designStudio "
        id="LfWZnVqHS-description"
        // // contentEditable="true"
      >
        {description}
      </p>
    );
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
            {/* {isEnableAts && searchWords && searchWords.length > 0 ? (
              <Highlighter
                id="XHKKXx5eVL-skill"
                highlightClassName="editableContent cursor-text  designStudio"
                searchWords={searchWords} // Use dynamically generated searchWords
                autoEscape
                textToHighlight={titleProps}
              />
            ) : (
              <p
                className="editableContent cursor-text  designStudio "
                id="XHKKXx5eVL-skill"
                // // contentEditable="true"
              >
                {titleProps}
              </p>
            )} */}
            {}
            {/* {renderEditableDescription(titleProps)} */}
            {/* {titlePropsState && !isEnableAts && (
              <ContentEditable
                className="designStudio"
                style={{
                  display: 'inline',
                  verticalAlign: 'initial',
                }}
                html={titlePropsState.current}
                onBlur={e => handleBlur(e, 'description')}
                onChange={e => handleChange(e, 'description')}
              />
            )} */}
            {isEnableAts && searchWords && searchWords.length > 0 ? (
              <Highlighter
                id="XHKKXx5eVL-skill"
                highlightClassName="editableContent cursor-text  designStudio"
                searchWords={searchWords} // Use dynamically generated searchWords
                autoEscape
                textToHighlight={titleProps}
              />
            ) : (
              <ContentEditable
                className="designStudio"
                style={{
                  display: 'inline',
                  verticalAlign: 'initial',
                }}
                html={titlePropsState?.current}
                onBlur={e => handleBlur(e, 'description')}
                onChange={e => handleChange(e, 'description')}
              />
            )}
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
                {/* {description} */}
                {/* {searchWords && searchWords.length > 0 ? (
                  <Highlighter
                    id="LfWZnVqHS-description"
                    highlightClassName="editableContent cursor-text  designStudio"
                    searchWords={searchWords} // Use dynamically generated searchWords
                    autoEscape
                    textToHighlight={description}
                  />
                ) : (
                  <p
                    className="editableContent cursor-text  designStudio "
                    id="LfWZnVqHS-description"
                    // // contentEditable="true"
                  >
                    {description}
                  </p>
                )} */}
                {renderEditableDescription()}
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
                    {/* {searchWords && searchWords.length > 0 ? (
                      <Highlighter
                        id="LfWZnVqHS-description"
                        highlightClassName="editableContent cursor-text  designStudio"
                        searchWords={searchWords} // Use dynamically generated searchWords
                        autoEscape
                        textToHighlight={description}
                      />
                    ) : (
                      <p
                        className="editableContent cursor-text  designStudio "
                        id="LfWZnVqHS-description"
                        // // contentEditable="true"
                      >
                        {description}
                      </p>
                    )} */}

                    {renderEditableDescription()}
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
                {/* {searchWords && searchWords.length > 0 ? (
                  <Highlighter
                    id="LfWZnVqHS-description"
                    highlightClassName="editableContent cursor-text  designStudio"
                    searchWords={searchWords} // Use dynamically generated searchWords
                    autoEscape
                    textToHighlight={description}
                  />
                ) : (
                  <p
                    className="editableContent cursor-text  designStudio "
                    id="LfWZnVqHS-description"
                    // // contentEditable="true"
                  >
                    {description}
                  </p>
                )} */}
                {renderEditableDescription()}
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
                    <div className="">
                      {role && (
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
                      )}

                      <div className="flex gap-2 justify-between font-semibold">
                        <div>
                          {orgName && (
                            <span
                              className="before:first:hidden before:content-['•_'] before:mr-0.5 font-semibold"
                              style={{ fontSize: '0.85em' }}
                            >
                              <p
                                className="editableContent cursor-text mr-1 whitespace-pre-wrap designStudio "
                                style={{
                                  display: 'inline',
                                  verticalAlign: 'initial',
                                }}
                              >
                                {orgName}
                              </p>
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
                              >
                                {location}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {description && (
                      <div
                        className="text-[0.85em] relative whitespace-pre-line "
                        style={{
                          fontSize: '0.85em',
                          fontWeight: 100,
                        }}
                      >
                        {/* {descriptionState && (
                          <ContentEditable
                            className="designStudio"
                            style={{
                              display: 'inline',
                              verticalAlign: 'initial',
                            }}
                            html={descriptionState.current}
                            onBlur={e => handleBlur(e, 'description')}
                            onChange={e => handleChange(e, 'description')}
                          />
                        )} */}

                        {renderEditableDescription()}
                        {/* <p
                          dangerouslySetInnerHTML={{
                            __html: description,
                          }}
                        /> */}
                      </div>
                    )}
                  </li>
                </ul>
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
                  {role && (
                    <span className="text-[#2e3d50] text-[9pt] leading-normal inline whitespace-pre-wrap font-bold before:first:hidden before:content-['|_'] before:mr-[2px] before:inline">
                      <span
                        className="editableContent cursor-text whitespace-pre-wrap mr-[3px] designStudio "
                        id="smpl029042021-role"
                        style={{ display: 'inline', verticalAlign: 'baseline' }}
                      >
                        {role}
                      </span>
                    </span>
                  )}

                  {orgName && (
                    <span className="text-[#2e3d50] text-[9pt] leading-normal inline whitespace-pre-wrap font-bold before:first:hidden before:content-['|_'] before:mr-[2px] before:inline">
                      <span
                        className="editableContent cursor-text whitespace-pre-wrap mr-[3px] designStudio "
                        id="smpl029042021-company"
                        style={{ display: 'inline', verticalAlign: 'baseline' }}
                      >
                        {orgName}
                      </span>
                    </span>
                  )}
                  {location && (
                    <span className="text-[#2e3d50] text-[9pt] leading-normal inline whitespace-pre-wrap font-bold before:first:hidden before:content-['|_'] before:mr-[2px] before:inline">
                      <span
                        className="editableContent cursor-text whitespace-pre-wrap mr-[3px] designStudio "
                        id="smpl029042021-location"
                        style={{ display: 'inline', verticalAlign: 'baseline' }}
                      >
                        {location}
                      </span>
                    </span>
                  )}
                  {duration && (
                    <span className="text-[#2e3d50] text-[9pt] leading-normal inline whitespace-pre-wrap font-bold before:first:hidden before:content-['|_'] before:mr-[2px] before:inline">
                      <span
                        className="editableContent cursor-text whitespace-pre-wrap mr-[3px] designStudio "
                        id="smpl029042021-duration"
                        style={{ display: 'inline', verticalAlign: 'baseline' }}
                      >
                        {duration}
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
                  {/* {searchWords && searchWords.length > 0 ? (
                    <Highlighter
                      id="LfWZnVqHS-description"
                      highlightClassName="editableContent cursor-text  designStudio"
                      searchWords={searchWords} // Use dynamically generated searchWords
                      autoEscape
                      textToHighlight={description}
                    />
                  ) : (
                    <p
                      className="editableContent cursor-text  designStudio "
                      id="LfWZnVqHS-description"
                    >
                      {description}
                    </p>
                  )} */}
                  {renderEditableDescription()}
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
                {/* {searchWords && searchWords.length > 0 ? (
                  <Highlighter
                    id="LfWZnVqHS-description"
                    highlightClassName="editableContent cursor-text  designStudio"
                    searchWords={searchWords} // Use dynamically generated searchWords
                    autoEscape
                    textToHighlight={description}
                  />
                ) : (
                  <p
                    className="editableContent cursor-text  designStudio "
                    id="LfWZnVqHS-description"
                    // // contentEditable="true"
                  >
                    {description}
                  </p>
                )} */}
                {renderEditableDescription()}
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
