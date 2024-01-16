/* eslint-disable */

import useStore from '@/store/store';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Divider, Typography } from 'antd';
import { useRef } from 'react';
import ContentEditable from 'react-contenteditable';
import Highlighter from 'react-highlight-words';

const SummarySection = ({
  summary,
  templateType,
  layoutStyles,
  highlightAts,
  onComment,
  onDeleteComment,
  isShowCommentBox = true,
}) => {
  let searchWords = [];
  if (highlightAts && highlightAts.length > 0) {
    // Extract 'ats' values from the highlightAts array
    searchWords = highlightAts.map(at => at?.ats);
  }
  // const descriptionState = useRef(summary);

  // const handleChange = (evt, targetName) => {
  //   console.log('handleChange: ', evt.target.value);
  //   if (targetName === 'description') {
  //     descriptionState.current = evt.target.value;
  //     handleDescriptionChange(type, typeId, evt.target.value);
  //   }
  // };

 
  const type = 'summary';
  const dataId = 'summary';
  function generateRandomId() {
    return `type-${type}-dataId-${dataId}`;
  }

  const randomId = generateRandomId();

  const renderComments = () => {
    console.log('renderComments: ', summary);

    // Extracting comments from the description using a regular expression
    const commentRegex = /<comment[^>]*>([\s\S]*?)<\/comment>/g;
    const comments = [];
    let match;

    while ((match = commentRegex.exec(summary))) {
      const commentContent = match[0].trim();
      if (commentContent) {
        comments.push(commentContent);
      }
    }

    console.log('comments: ', comments);

    if (comments.length === 0) {
      return null;
    }

    // Extracting comments from the description using a regular expression

    // const comments = description.match(/<comment(.*?)<\/comment>/s);
    if (!comments || isShowCommentBox === false) {
      return null;
    }

    return comments.map((comment, index) => {
      const commentId = comment.match(/id="(.*?)"/)[1];
      console.log('commentId:', commentId);
      // Parse comment content using regular expression
      const contentMatch = comment.match(/content="(.*?)"/);
      const content = contentMatch ? contentMatch[1] : '';

      return (
        <Card key={commentId} className="comment-bubble" style={{ '--comment-index': index }}>
          {content}
          <button
            className="ml-4"
            onClick={() => onDeleteComment(commentId, type, randomId, dataId)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </Card>
      );
    });
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
          {searchWords && searchWords.length > 0 ? (
            <Highlighter
              id="summary-summary"
              highlightClassName="editableContent cursor-text  designStudio"
              searchWords={searchWords} // Use dynamically generated searchWords
              autoEscape={true}
              textToHighlight={summary}
            />
          ) : (
            // <p className="editableContent cursor-text  designStudio " id="summary-summary">
            //   {summary}
            // </p>
            <>
              {' '}
              <p
                className="editableContent cursor-text designStudio"
                id={randomId}
                onMouseUp={event => onComment(event, type, randomId, dataId)}
                dangerouslySetInnerHTML={{ __html: summary }}
              />
              {renderComments()}
            </>
          )}
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
          Summary
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
          <p className="editableContent ghost-hightlight w-full designStudio "></p>
        </div>

        {/* <ContentEditable
          className="editableContent cursor-text  designStudio "
          id="summary-summary"
          html={summaryState.current}
          onBlur={e => handleBlur(e, 'summary')}
          onChange={e => handleChange(e, 'summary')}
        /> */}
        {searchWords && searchWords.length > 0 ? (
          <Highlighter
            id="summary-summary"
            highlightClassName="editableContent cursor-text  designStudio"
            searchWords={searchWords} // Use dynamically generated searchWords
            autoEscape={true}
            textToHighlight={summary}
          />
        ) : (
          // <p className="editableContent cursor-text  designStudio " id="summary-summary">
          //   {summary}
          // </p>
          <>
          {' '}
          <p
            className="editableContent cursor-text designStudio"
            id={randomId}
            onMouseUp={event => onComment(event, type, randomId, dataId)}
            dangerouslySetInnerHTML={{ __html: summary }}
          />
          {renderComments()}
        </>
        )}
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
            {searchWords && searchWords.length > 0 ? (
              <Highlighter
                id="summary-summary"
                highlightClassName="editableContent cursor-text  designStudio"
                searchWords={searchWords} // Use dynamically generated searchWords
                autoEscape={true}
                textToHighlight={summary}
              />
            ) : (
              // <p className="editableContent cursor-text  designStudio " id="summary-summary">
              //   {summary}
              // </p>
              <>
              {' '}
              <p
                className="editableContent cursor-text designStudio"
                id={randomId}
                onMouseUp={event => onComment(event, type, randomId, dataId)}
                dangerouslySetInnerHTML={{ __html: summary }}
              />
              {renderComments()}
            </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarySection;
