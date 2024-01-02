/* eslint-disable no-shadow */

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import './CVTemplates.scss';
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import SortableItem from '../SortableList/SortableItem';

import './fonts.css';
import './styles.moduel.css';
import './editable.moduel.css';
import './alpha.css';
import './beta.css';
import './omega.css';
import './template.css';

import { NextPageContext } from 'next';
import DesignStudioBreakPage from './templatesStyles/DesignStudioBreakPage';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { Button, Card, Divider, Input, Popover, Tooltip } from 'antd';
import { Box, ChakraProvider, VStack } from '@chakra-ui/react';
import { CommentOutlined } from '@ant-design/icons';

const CVLayoutReviewerView = ({
  children,
  onSectionsOrderChange,
  layoutStyles,
  stars,
  isDnd = false,
}) => {
  const { zoom, paperSize, hasIndent, hasDivider, ...restLayoutStyles } = layoutStyles;

  // Define font styles for different fonts
  let fontStyles = {};

  if (layoutStyles.fontFamily === 'Merriweather') {
    fontStyles = {
      fontFamily: 'Merriweather, serif',
    };
  } else if (layoutStyles.fontFamily === 'Source Sans Pro') {
    fontStyles = {
      fontFamily: 'Source Sans Pro, sans-serif',
    };
  } else {
    fontStyles = {
      fontFamily: 'Calibri, serif',
    };
  }

  const CvStyles = {
    ...restLayoutStyles,
    color: layoutStyles.fontColor,
    width: layoutStyles.paperSize === 'A4' ? '210mm' : '8.5in',
    // fontFamily: `${layoutStyles.fontFamily}, serif`,
    ...fontStyles, // Merge font styles with other styles
  };
  console.log('CvStyles', CvStyles);

  useEffect(() => {
    const resumeId = document.getElementById('resume');
    resumeId?.style.setProperty('--text-indent', hasIndent ? '1em' : '0em');
  }, [hasIndent]);

  // useEffect(() => {
  //   WebFont.load({
  //     google: {
  //       families: ['Source Sans Pro'],
  //     },
  //   });
  // }, []);

  const [components, setComponents] = useState(children);

  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(MouseSensor),
    useSensor(TouchSensor),
  );

  const handleDragStart = useCallback(event => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback(
    event => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        const oldIndex = components.indexOf(active.id);
        const newIndex = components.indexOf(over.id);
        const newComponents = arrayMove(components, oldIndex, newIndex);
        setComponents([...newComponents]);
        onSectionsOrderChange(newComponents);
      }

      setActiveId(null);
    },
    [components],
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  const cvHeightSize = layoutStyles.paperSize === 'A4' ? '297mm' : '11in';
  const cvWidthSize = layoutStyles.paperSize === 'A4' ? '210mm' : '8.5in';

  // const cvWidthSize = layoutStyles.paperSize === 'A4' ? '210mm' : '8.5in';
  const stylesTransform = {
    // transform: `scale(${layoutStyles.zoom})`,
    transform: 'scale(1)',
    transformOrigin: 'left top',
  };

  // const elementRef = useRef(null); // Reference to the HTML element to be converted

  // const [tooltip, setTooltip] = useState(null);
  // const [currentText, setCurrentText] = useState(null);
  // const [textareaState, setTextareaState] = useState('');
  // const [isLnPayPending, setIsLnPayPending] = useState(false);
  // const [isShowComment, setIsShowComment] = useState(false);

  // function handleMouseUp(event, key) {
  //   const selection = window.getSelection();
  //   console.log('key: ', key);
  //   if (selection && selection.toString()) {
  //     const range = selection.getRangeAt(0);
  //     const rect = range.getBoundingClientRect();

  //     const x = rect.left + window.scrollX + rect.width / 2;
  //     const y = rect.top + window.scrollY;

  //     setCurrentText(selection.toString());
  //     setTooltip({ x, y, text: selection.toString(), key });
  //     setIsShowComment(true);
  //   }
  // }
  // function closeComment() {
  //   setCurrentText(null);
  //   setTooltip(null);
  //   setIsShowComment(false);
  // }
  // // function handleMouseDown(event) {
  // //   const isTooltipClicked = event.target.closest('.bg-modal');
  // //   const isInputClicked = event.target.closest('input');
  // //   console.log("isTooltipClicked", isTooltipClicked);
  // //   if (!isTooltipClicked && !isInputClicked) {
  // //     setCurrentText(null);
  // //     setTooltip(null);
  // //   }
  // // }
  // useEffect(() => {
  //   if (isLnPayPending) {
  //     return;
  //   }

  //   document.addEventListener('mouseup', handleMouseUp);
  //   // document.addEventListener('mousedown', handleMouseDown);
  //   return () => {
  //     document.removeEventListener('mouseup', handleMouseUp);
  //     // document.removeEventListener('mousedown');
  //   };
  // }, [tooltip, isLnPayPending]);

  return (
    <>
      {/* <Box
        top={tooltip?.y}
        left={tooltip?.x}
        display={tooltip?.text ? 'block' : 'none'}
        position="absolute"
        zIndex={100}
      >
        {
          <>
            <VStack gap={1} bgColor="bg-modal" borderRadius="lg">
              <Box layerStyle="cardLg" p={3}>
                <Card
                  styles={{ background: 'white', borderRadius: 'lg', witdh: '5px', height: '5px' }}
                >
                  <CommentOutlined /> Comment123
                  <Input></Input>
                  <div className="mt-4">
                    <Button>Submit</Button>
                    <Button onClick={closeComment} className="ml-4">
                      Close
                    </Button>
                  </div>
                </Card>
              </Box>
            </VStack>
          </>
        }
      </Box> */}
      <div className="preview card">
        <div
          className="bg-gray-100 rounded-md p-4 text-[#2e3d50]"
          id="resume-preview"
          style={stylesTransform}
        >
          <div
            style={{
              backgroundColor: 'rgb(255, 255, 255)',
              minHeight: cvHeightSize,
              paddingBottom: '1.3cm',
            }}
          >
            <div
              id="resume"
              className="relative bg-white transition-colors resume alpha"
              data-type="designStudio"
              data-format="letter"
              data-template="standard"
              style={{
                ...fontStyles,
                fontSize: CvStyles.fontSize,
                lineHeight: CvStyles.lineHeight,
                width: cvWidthSize,
                transform: 'initial',
                transformOrigin: 'initial',
                // fontFamily: 'Merriweather, serif',
                padding: '1.3cm 0cm 0cm',
                borderColor: 'rgb(0, 0, 0)',
                textAlign: 'left',
              }}
            >
              <div
                className="design-studio-break-page"
                style={{
                  top: 'calc(10.4882in)',
                  fontFamily: '"Source Sans Pro", sans-serif',
                  lineHeight: 20,
                }}
              >
                <div />
                {/* Break */}
              </div>
              <div id="sortable-area" className="relative z-50 mb-[10px] transition-all">
                {/* {components.map((child, index) => (
                      <div key={child.key || index}>
                        {child.props.canBeDrag === false ? ( // Check if the section can be dragged
                          <div key={child.key || index}>
                            {child}
                            {layoutStyles.hasDivider && (
                              <div style={{ padding: '0cm 1.4cm', margin: '10px 0px' }}>
                                <hr />
                              </div>
                            )}
                          </div> // Render without drag if canBeDrag is false
                        ) : (
                          <div key={child.key || index}>
                            <SortableItem key={child.key || index}>{child}</SortableItem>
                            {index < components.length - 1 && layoutStyles.hasDivider && (
                              <div style={{ padding: '0cm 1.4cm', margin: '10px 0px' }}>
                                <hr />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))} */}
                {components.map((child, index) => (
                  <div key={child.key || index}>
                    {
                      // Check if the section can be dragged
                      <div key={child.key || index}>
                        {child}
                        {layoutStyles.hasDivider && (
                          <div style={{ padding: '0cm 1.4cm', margin: '10px 0px' }}>
                            <hr />
                          </div>
                        )}
                      </div> // Render without drag if canBeDrag is false
                    }
                  </div>
                ))}
                {/* <DndContext
                  sensors={sensors}
                  onDragCancel={handleDragCancel}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext items={components} strategy={verticalListSortingStrategy}>
                    {components.map((child, index) => (
                      <div key={child.key || index}>
                        {child.props.canBeDrag === false ? ( // Check if the section can be dragged
                          <div key={child.key || index}>
                            {child}
                            {layoutStyles.hasDivider && (
                              <div style={{ padding: '0cm 1.4cm', margin: '10px 0px' }}>
                                <hr />
                              </div>
                            )}
                          </div> // Render without drag if canBeDrag is false
                        ) : (
                          <div key={child.key || index}>
                            <SortableItem key={child.key || index}>{child}</SortableItem>
                            {index < components.length - 1 && layoutStyles.hasDivider && (
                              <div style={{ padding: '0cm 1.4cm', margin: '10px 0px' }}>
                                <hr />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </SortableContext>
                </DndContext> */}

                <div id="DndDescribedBy-1" style={{ display: 'none' }}>
                  To pick up a draggable item, press the space bar. While dragging, use the arrow
                  keys to move the item. Press space again to drop the item in its new position, or
                  press escape to cancel.
                </div>
                <div
                  id="DndLiveRegion-4"
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
          </div>
        </div>
      </div>
    </>
  );
};

export default CVLayoutReviewerView;
