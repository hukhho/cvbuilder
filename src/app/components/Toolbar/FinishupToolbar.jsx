/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import React, { useState } from 'react';
import {
  Button,
  Col,
  Divider,
  InputNumber,
  Menu,
  Popover,
  Row,
  Select,
  Slider,
  Tooltip,
  Typography,
} from 'antd';
import './FinishupToolbar.css'; // Create a CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDownUpAcrossLine,
  faChevronDown,
  faIndent,
  faMagnifyingGlass,
  faMinus,
  faPlus,
  faTextHeight,
} from '@fortawesome/free-solid-svg-icons';
import { DownOutlined } from '@ant-design/icons';
import ColorButtons from './ColorPicker';

const { Option } = Select;
const { Title } = Typography;

const fonts = ['Merriweather', 'Source Sans Pro', 'Calibi'];

const papers = ['Letter', 'A4'];

const FinishupToolbar = props => {
  const { toolbarState, onToolbarChange } = props;

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

  return (
    <div className="toolbar">
      <Row style={{ margin: 'auto' }}>
        <Col className="font-family element">
          <Select
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
                disabled={fontSize < 7}
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
                disabled={fontSize > 15}
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
            <Button className="flex" onClick={toggleSliderVisibility}>
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
                className="absolute top-6 left-0"
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
                defaultValue={toolbarState.paperSize}
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
                    className="absolute top-6"
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
                className="w-6 h-6 mt-1 justify-center items-center rounded-full  flex "
                onClick={() => {
                  handleChange(!toolbarState.hasDivider, 'hasDivider');
                }}
                style={{
                  backgroundColor: toolbarState.hasDivider ? 'lightblue' : 'transparent',
                  cursor: 'pointer',
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
              className="w-6 h-6 justify-center items-center rounded-full  flex "
              onClick={() => {
                handleChange(!toolbarState.hasIndent, 'hasIndent');
              }}
              style={{
                margin: 'auto',
                cursor: 'pointer',
                backgroundColor: toolbarState.hasIndent ? 'lightblue' : '',
              }}
            >
              <FontAwesomeIcon icon={faIndent} />
            </div>
          </Tooltip>
        </Col>
        <Divider
          style={{
            height: 'auto',
          }}
          type="vertical"
        />

        <Col className="color element flex">
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
              className="rounded-full w-5 h-[20px]"
            />
          </Popover>
        </Col>
      </Row>
    </div>
  );
};

export default FinishupToolbar;
