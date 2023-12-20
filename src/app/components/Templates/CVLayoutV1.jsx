/* eslint-disable */

'use client';

import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
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
import { Divider } from 'antd';

import './fonts.css';
import './styles.moduel.css';
import './editable.moduel.css';
import './alpha.css';
import './beta.css';
import './omega.css';
import './template.css';

import { NextPageContext } from 'next';
// import DesignStudioBreakPage from './templatesStyles/DesignStudioBreakPage';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CVLayoutV1 = React.forwardRef(
  ({ children, onSectionsOrderChange, layoutStyles, stars }, ref) => {
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
    // const cvWidthSize = layoutStyles.paperSize === 'A4' ? '210mm' : '8.5in';

    // const cvWidthSize = layoutStyles.paperSize === 'A4' ? '210mm' : '8.5in';
    const stylesTransform = {
      transform: `scale(${layoutStyles.zoom})`,
      transformOrigin: 'left top',
    };


    return (
      <div className="preview card">
        <div className="flex bg-gray-100 rounded-md p-4 m-auto" id="resume-preview">
          <div
            className="design-studio-break-page"
            style={{
              top: 'calc(10.4882in)',
              fontFamily: '"Source Sans Pro", sans-serif',
              zIndex: 99,
            }}
          >
            <div />
            {/* Break */}
          </div>
          <div
            ref={captureRef}
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
                // lineHeight: CvStyles.lineHeight,
                // width: cvWidthSize,
                // fontFamily: 'Merriweather, serif',
                padding: '1.3cm 0cm 0cm',
                borderColor: 'rgb(0, 0, 0)',
                textAlign: 'left',
              }}
            >
              <div id="sortable-area" className="relative z-50 mb-[10px] transition-all">
                <DndContext
                  sensors={sensors}
                  onDragCancel={handleDragCancel}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext items={components} strategy={verticalListSortingStrategy}>
                    {components.map((child, index) => (
                      <div key={index}>
                        {child.props.canBeDrag === false ? ( // Check if the section can be dragged
                          <div key={index}>
                            {React.cloneElement(child, {
                              layoutStyles,
                            })}
                            {layoutStyles.hasDivider && (
                              <div
                                style={{ color: 'red', padding: '0cm 1.4cm', margin: '10px 0px' }}
                              >
                                <hr />
                              </div>
                            )}
                          </div> // Render without drag if canBeDrag is false
                        ) : (
                          <div key={index}>
                            <SortableItem key={index}>
                              {React.cloneElement(child, {
                                layoutStyles,
                              })}
                            </SortableItem>
                            {index < components.length - 1 && layoutStyles.hasDivider && (
                              <div
                                style={{ color: 'blue', padding: '0cm 1.4cm', margin: '10px 0px' }}
                              >
                                <hr />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </SortableContext>
                </DndContext>

             
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default CVLayoutV1;