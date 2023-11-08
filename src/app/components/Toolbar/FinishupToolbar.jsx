/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import React, { useState } from 'react';
import { Button, Col, Divider, Popover, Row, Select, Slider, Tooltip, Typography } from 'antd';
import './FinishupToolbar.css'; // Create a CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faIndent,
  faMinus,
  faPlus,
  faTextHeight,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';

import ColorButtons from './ColorPicker';
import DynamicColorCircle from '../Templates/templatesStyles/DynamicColorCircle';
import { Modal } from '@chakra-ui/react';

const { Option } = Select;

const fonts = ['Merriweather', 'Source Sans Pro', 'Calibri'];

const papers = ['Letter', 'A4'];

const templateType = {
  1: 'classical',
  2: 'modern',
  3: 'modern-2',
};

const FinishupToolbar = props => {
  const [open, setOpen] = useState(false);

  const {
    toolbarState,
    onToolbarChange,
    handleChangeTemplateSelected,
    handleOpenModal,
    currentTemplate,
  } = props;

  const [showAdjustment, setShowAdjustment] = useState(false);
  const [color, setColor] = useState(toolbarState.fontColor);
  const [fontSize, setFontSize] = useState(parseInt(toolbarState.fontSize.slice(0, -2), 10));

  const [zoomValue, setZoomValue] = useState(
    toolbarState.zoom ? parseInt(toolbarState.zoom.slice(0, -1), 10) : 0,
  );
  
  const [isSliderZoomVisible, setSliderZoomVisible] = useState(false);

  const [lineHeight, setLineHeight] = useState(parseFloat(toolbarState.lineHeight));
  const [isSliderLineHeightVisible, setSliderLineHeightVisible] = useState(false);

  const handleChange = (e, property) => {
    const newValues = { ...toolbarState, [property]: e };
    onToolbarChange(newValues);
  };

  const toggleSliderVisibility = () => {
    setSliderLineHeightVisible(!isSliderLineHeightVisible);
  };

  const handleChangeTemplate = value => {
    handleChangeTemplateSelected(value);
  };

  const renderAdjustment = () => (
    <div className="adjustment bg-neutral-50 width-1000 asolute">
      <Row>
        <Col className="element">
          <Tooltip title="Profile picture">
            <Button size="small" className="ml-1">
              <FontAwesomeIcon icon={faUserCircle} />
            </Button>
          </Tooltip>
        </Col>
        <Divider
          style={{
            height: 'auto',
          }}
          type="vertical"
        />
        <Col className="font-family element">
          <Select
            size="small"
            defaultValue={toolbarState.fontFamily}
            style={{ width: '100%' }}
            onChange={e => handleChange(e, 'fontFamily')}
          >
            {fonts.map((font, index) => (
              <Option key={index} value={font}>
                {font}
              </Option>
            ))}
          </Select>
        </Col>

        <Divider
          style={{
            height: 'auto',
          }}
          type="vertical"
        />
        <Col className="font-size  element">
          <div className="flex items-center">
            <Tooltip title="Decrease font size">
              <Button
                size="small"
                disabled={fontSize < 7}
                type="text"
                onClick={() => {
                  const newFontSize = fontSize - 1;
                  if (newFontSize < 6) return;
                  setFontSize(newFontSize);
                  handleChange(`${newFontSize}pt`, 'fontSize');
                }}
                className="relative flat min-w-[36px] h-[32px] text-[16px] hover:bg-neutral-200/50"
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
            </Tooltip>
            <div className="text-[16px] w-7 text-center">
              <span className="text-[12px]">{fontSize}</span>
            </div>
            <Tooltip title="Increase font size">
              <Button
                size="small"
                disabled={fontSize > 15}
                type="text"
                onClick={() => {
                  const newFontSize = fontSize + 1;
                  if (newFontSize > 16) return;
                  setFontSize(newFontSize);
                  handleChange(`${newFontSize}pt`, 'fontSize');
                }}
                className="relative flat min-w-[36px] h-[32px] text-[16px] hover:bg-neutral-200/50"
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </Tooltip>
          </div>
        </Col>
        <Divider
          style={{
            height: 'auto',
          }}
          type="vertical"
        />

        <Col className="line-height element">
          <Tooltip title="Line Height">
            <Button
              size="small"
              type="text"
              className="flex items-center"
              onClick={toggleSliderVisibility}
            >
              <FontAwesomeIcon icon={faTextHeight} />
              <span className="text-[12px] w-4 inline-block rounded-md ml-2 text-center">
                {lineHeight}
              </span>
            </Button>
          </Tooltip>
          {isSliderLineHeightVisible && (
            <div>
              <Slider
                defaultValue={lineHeight}
                className="absolute top-6 left-0 slider"
                min={1}
                max={3}
                step={0.05}
                onChange={value => {
                  setLineHeight(value);
                  handleChange(value, 'lineHeight');
                }}
                style={{ width: 80 }}
              />
            </div>
          )}
        </Col>
        <Divider
          style={{
            height: 'auto',
          }}
          type="vertical"
        />

        <Col className="paper element">
          <div className="flex items-center">
            <Tooltip placement="top" title="Paper size">
              <Select
                size="small"
                defaultValue={toolbarState.paperSize}
                bordered={false}
                style={{ width: '80px' }}
                onChange={e => handleChange(e, 'paperSize')}
              >
                {papers.map((paper, index) => (
                  <Option key={index} value={paper}>
                    {paper}
                  </Option>
                ))}
              </Select>
            </Tooltip>
          </div>
        </Col>
        <Divider
          style={{
            height: 'auto',
          }}
          type="vertical"
        />
        <Col className="zoom element">
          <Tooltip title="Zoom">
            <div className="flex flex-col">
              <Button
                size="small"
                type="text"
                onClick={() => {
                  setSliderZoomVisible(!isSliderZoomVisible);
                }}
                className="h-[32px] w-full rounded-md disabled:hover:bg-transparent hover:bg-neutral-200/50"
              >
                <span className="text-[12px] w-4 inline-block rounded-md mr-2 text-center">
                  {zoomValue}
                </span>
                <FontAwesomeIcon icon={faChevronDown} />
              </Button>
              {isSliderZoomVisible && (
                <div>
                  <Slider
                    defaultValue={zoomValue}
                    className="absolute top-6 slider"
                    min={50}
                    max={200}
                    step={5}
                    onChange={value => {
                      setZoomValue(value);
                      handleChange(`${value}%`, 'zoom');
                    }}
                    style={{ width: 100 }}
                  >
                    {zoomValue}%
                  </Slider>
                </div>
              )}
            </div>
          </Tooltip>
        </Col>
        <Divider
          style={{
            height: 'auto',
          }}
          type="vertical"
        />

        <Col className="section-divider element">
          <div className="flex items-center">
            <Tooltip placement="top" title="Section Divider">
              <div
                className="mt-0.5 justify-center items-center rounded-full  flex "
                onClick={() => {
                  handleChange(!toolbarState.hasDivider, 'hasDivider');
                }}
                style={{
                  backgroundColor: toolbarState.hasDivider ? 'lightblue' : 'transparent',
                  cursor: 'pointer',
                  height: '20px',
                  width: '20px',
                }}
              >
                <FontAwesomeIcon icon={faMinus} />
              </div>
            </Tooltip>
          </div>
        </Col>
        <Divider
          style={{
            height: 'auto',
          }}
          type="vertical"
        />

        <Col className="indent flex element">
          <Tooltip title="Indent" placement="top">
            <div
              className="justify-center items-center rounded-full flex "
              onClick={() => {
                handleChange(!toolbarState.hasIndent, 'hasIndent');
              }}
              style={{
                margin: 'auto',
                cursor: 'pointer',
                height: '20px',
                width: '20px',
                backgroundColor: toolbarState.hasIndent ? 'lightblue' : '',
              }}
            >
              <FontAwesomeIcon size="sm" icon={faIndent} />
            </div>
          </Tooltip>
        </Col>
        <Divider
          style={{
            height: 'auto',
          }}
          type="vertical"
        />

        <Col
          className="color element flex"
          style={{
            height: '24px',
          }}
        >
          <Popover
            title="Color Picker"
            trigger="click"
            placement="bottomLeft"
            content={
              <ColorButtons
                onChangeColor={value => {
                  setColor(value);
                  handleChange(value, 'fontColor');
                }}
              />
            }
          >
            <div
              style={{ backgroundColor: color, cursor: 'pointer', margin: 'auto' }}
              className="rounded-full w-5 h-5"
            />
          </Popover>
        </Col>
      </Row>
    </div>
  );

  return (
    <>
      <div styles={{ width: '200px'}} className="flex px-4 py-1 toolbar">
        <div className="flex-auto donutContainer mt-4 mb-4 ml-2">
          <svg
            width={52}
            height={52}
            xmlns="https://www.w3.org/2000/svg"
            className="donutContainerSvg"
          >
            <g>
              <title>Resume completion</title>
              <circle r={22} cy={26} cx={26} strokeWidth={8} stroke="#f2f2f2" fill="none" />
              <circle
                id="circle_animation"
                className="donut"
                r={22}
                cy={26}
                cx={26}
                strokeWidth={8}
                stroke="#f2c94b"
                fill="none"
                style={{ strokeDashoffset: '30.36' }}
              />
              <text
                fill="#283e50"
                x="50%"
                y="-24px"
                dominantBaseline="middle"
                textAnchor="middle"
                className="donut-text"
              >
                78
              </text>
            </g>
          </svg>
          <Button onClick={handleOpenModal} className="font-bold ml-10">
            Explore My Rezi score
          </Button>
        </div>

        <div className="flex-auto" >
          <div className="flex text-center">
            {/* <DynamicColorCircle progress={10} />
          <div className="flex items-center ml-2">
            <Button className="font-bold">Explore My Rezi score</Button>
          </div> */}
            <div className="flex ml-auto ">
              <div className="flex items-center ml-2">
                <Button type="text" className="font-bold">
                  Auto-Adjust
                </Button>
              </div>
              <div className="flex items-center ml-2">
                <Button
                  type="text"
                  className="font-bold"
                  onClick={() => {
                    setShowAdjustment(!showAdjustment);
                  }}
                >
                  Adjustments
                  <FontAwesomeIcon className="ml-1" icon={faChevronDown} />
                </Button>
              </div>
              <div className="flex items-center ml-2">
                <Select
                  className="font-bold"
                  size="small"
                  defaultValue={templateType[1]}
                  label="Templates"
                  bordered={false}
                  style={{ width: 120 }}
                  onChange={handleChangeTemplate}
                  options={[
                    { value: templateType[1], label: templateType[1] },
                    { value: templateType[2], label: templateType[2] },
                    { value: templateType[3], label: templateType[3] },
                  ]}
                >
                  Templates
                </Select>
              </div>
              <div className="flex items-center ml-2">
                <Button color="primary" className="font-bold">
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAdjustment && renderAdjustment()}
    </>
  );
};

export default FinishupToolbar;
