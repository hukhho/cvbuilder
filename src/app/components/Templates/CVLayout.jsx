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
import './lambda.css';
import './template.css';

import { NextPageContext } from 'next';
// import DesignStudioBreakPage from './templatesStyles/DesignStudioBreakPage';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as htmlToImage from 'html-to-image';

const CVLayout = React.forwardRef(
  (
    { children, onSectionsOrderChange, layoutStyles, templateType, stars, isShowBreak = false },
    ref,
  ) => {
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

    const elementRef = useRef(null); // Reference to the HTML element to be converted
    const captureOptions = {
      scale: 10, // Increase the scale for higher resolution
      useCORS: true, // Enable Cross-Origin Resource Sharing if needed
      logging: true, // Enable logging for debugging (optional)
    };
    // const CaptureScreenshot = () => {
    //   html2canvas(captureRef.current, captureOptions).then(canvas => {
    //     console.log('canvas', canvas);
    //     // Iterate through each element in the captured content
    //     canvas.childNodes.forEach(element => {
    //       // Apply sectionHeader styles
    //       if (element.classList.contains('section-header')) {
    //         Object.assign(element.style, sectionHeader);
    //       }
    //     });

    //     const imgData = canvas.toDataURL('image/jpeg');
    //     const pdf = new jsPDF('p', 'mm', [canvas.width / 10, canvas.height / 10]); // Adjust PDF size accordingly
    //     pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width / 10, canvas.height / 10);
    //     pdf.save(`${new Date().toISOString()}.pdf`);
    //   });
    // };
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
    useImperativeHandle(ref, () => ({
      CaptureScreenshot,
    }));
    const isClassicalTemplate = templateType === 'classical';
    const templateName =
      templateType === 'classical' ? 'omega' : templateType === 'modern' ? 'beta' : 'lambda';
    return (
      <div className="">
        <div
          className="bg-gray-100 rounded-md p-4 select-none text-[#2e3d50]"
          id="resume-preview"
          style={stylesTransform}
        >
          {isShowBreak && (
            <div
              className="design-studio-break-page"
              style={{
                top: 'calc(10.4882in)',
                fontFamily: 'Merriweather, serif',
                lineHeight: '20px',
                zIndex: 99,
              }}
            >
              <div></div>
              Break
            </div>
          )}

          <div
            ref={captureRef}
            style={{
              backgroundColor: 'rgb(255, 255, 255)',
              minHeight: '11in',
              paddingBottom: '1.3cm',
            }}
          >
            <div
              id="resume"
              className={
                `relative bg-white transition-colors resume ` +
                `${templateName} ` +
                `${templateName === 'beta' ? 'border-t-[12px] border-solid box-border' : ''} `
              }
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
                // borderColor: 'rgb(0, 0, 0)',
                borderColor: 'rgb(60, 120, 216)',
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
                            })}{' '}
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
                            <SortableItem key={index}>{child}</SortableItem>
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

export default CVLayout;
