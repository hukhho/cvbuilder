/* eslint-disable */

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, InputNumber, Space, Switch, Typography } from 'antd';
import moment from 'moment';
import DataService from '@/app/utils/dataService';
import { createExperience, updateExperience } from '@/app/resume/[id]/experience/experienceService';
import './test.css';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import TextArea from 'antd/es/input/TextArea';
import './date.css';
import { format, parse } from 'date-fns';
import './customtext.css';
import { Box } from '@chakra-ui/react';

const stylesInput = {
  width: '769.22px',
  height: '56.19px',
  padding: '17.30px 15.50px 15.89px',
  backgroundColor: 'white',
  borderRadius: '4px',
  border: '2px solid #e5e5e5',
  fontSize: '16px',
  fontWeight: '600',
  fontFamily: 'Source Sans Pro, sans-serif',
};
const stylesInput1 = {
  width: '180.22px',
  height: '55.19px',
  // padding: '-50.30px 0.50px 15.89px',
  backgroundColor: 'white',
  borderRadius: '4px',
  border: '2px solid #e5e5e5',
  fontSize: '16px',
  fontWeight: '600',
  fontFamily: 'Source Sans Pro, sans-serif',
};
const stylesInput4 = {
  width: '769.22px',
  height: '132.19px',
  padding: '10.30px 0.50px 10.89px 10px',
  marginLeft: '0px',
  backgroundColor: 'white',
  borderRadius: '4px',
  border: '2px solid #e5e5e5',
  fontSize: '16px',
  fontWeight: '600',
  fontFamily: 'Source Sans Pro, sans-serif',
  textAlign: 'left', // Set text alignment to left
};
const InvolvementForm = ({ cvId, onCreated, data }) => {
  const dataService = new DataService('involvements', cvId);
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false); // Add this state
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);

  useEffect(() => {
    if (data) {
      setIsEditMode(true); // Set to edit mode if experience prop is provided
      setInputValue(data.description);
      const startDateString = data.duration.split(' - ')[0];
      const endDateString = data.duration.split(' - ')[1];
      console.log('startDateString: ', startDateString);
      console.log('endDateString: ', endDateString);
      if (endDateString === 'Present') {
        setIsCurrentlyWorking(true);
        const parsedStartDate = parse(startDateString, 'MMMM yyyy', new Date());
        setStartDate(parsedStartDate);
        setEndDate(new Date());
      } else {
        setIsCurrentlyWorking(false);
        const parsedStartDate = parse(startDateString, 'MMMM yyyy', new Date());
        const parsedEndDate = parse(endDateString, 'MMMM yyyy', new Date());
        setStartDate(parsedStartDate);
        setEndDate(parsedEndDate);
      }
      form.setFieldsValue(data);
    } else {
      form.resetFields();
      setInputValue('');
      setStartDate('');
      setIsCurrentlyWorking(false);
      setEndDate('');
      setIsEditMode(false); // Set to create mode if experience prop is not provided
    }
  }, [data, form]);

  const handleSubmit = async values => {
    try {
      values.description = inputValue;
      if (isCurrentlyWorking) {
        values.duration = `${format(startDate, 'MMMM yyyy')} - Present`;
      } else {
        values.duration = `${format(startDate, 'MMMM yyyy')} - ${format(endDate, 'MMMM yyyy')}`;
      }
      if (isEditMode) {
        // await updateExperience(cvId, data.id, values);
        await dataService.update(data.id, values);

        setIsEditMode(false);
        form.resetFields();
        setInputValue('');
        setStartDate('');
        setIsCurrentlyWorking(false);
        setEndDate('');
      } else {
        // await createExperience(cvId, values);
        await dataService.create(values);

        form.resetFields();
        setInputValue('');
        setStartDate('');
        setIsCurrentlyWorking(false);
        setEndDate('');
      }
      onCreated();
    } catch (error) {
      console.log('Submit Project Form. Error:', error);
    }
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const input = inputRef.current;
      const cursorPosition = input.selectionStart;

      // Find the current line
      let lineStart = cursorPosition;
      while (lineStart > 0 && inputValue[lineStart - 1] !== '\n') {
        lineStart--;
      }

      // Check if the line already starts with a bullet point
      if (inputValue.slice(lineStart, cursorPosition).trim() !== '•') {
        // If not, add a bullet point and adjust the cursor position
        const newValue = `${inputValue.slice(0, cursorPosition)}\n• ${inputValue.slice(
          cursorPosition,
        )}`;
        setInputValue(newValue);
        input.setSelectionRange(cursorPosition + 3, cursorPosition + 3);
      } else {
        // If it starts with a bullet point, simply move to the new line
        const newValue = `${inputValue.slice(0, cursorPosition)}\n${inputValue.slice(
          cursorPosition,
        )}`;
        setInputValue(newValue);
        input.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
      }
    }
  };
  const handleTextareaInput = event => {
    const textarea = event.target;
    textarea.style.height = 'auto'; // Reset the height to auto to recalculate the scroll height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height
  };
  const handleInputChange = event => {
    const newInputValue = event.target.value;

    const lines = newInputValue.split('\n');
    const formattedLines = lines.map((line, index) => {
      if (index === 0) {
        // Ensure the first line always starts with a bullet point
        return line.startsWith('•') ? line : `• ${line}`;
      }
      return line;
    });
    setInputValue(formattedLines.join('\n'));
  };

  const MyContainer = ({ className, children }) => {
    const handleSwitchChange = checked => {
      setIsCurrentlyWorking(checked);
      if (checked) {
        setEndDate(new Date());
      }
    };

    return (
      <div style={{}}>
        <CalendarContainer className={className}>
          <div style={{ position: 'relative' }}>{children}</div>
          <div>
            <div className="mt-20" style={{ backgroundColor: '#fbfbfb' }}>
              <Switch
                className="mr-5"
                size="small"
                checked={isCurrentlyWorking}
                onChange={handleSwitchChange}
              />
              Currently work here
            </div>
            <div className="mt-5" />
          </div>
        </CalendarContainer>
      </div>
    );
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      style={{
        width: '180.22px',
        height: '55.19px',
        marginLeft: '20px',
        fontSize: '16px',
        fontWeight: '600',
        fontFamily: 'Source Sans Pro, sans-serif',
        textAlign: 'left', // Set text alignment to left
      }}
      onClick={onClick}
      ref={ref}
    >
      Present
    </button>
  ));

  return (
    <div className="" style={{ width: '912.05px' }}>
      <Form onFinish={handleSubmit} form={form} layout="vertical" autoComplete="off">
        <Form.Item
          name="organizationRole"
          label={
            <label style={{}}>
              <span className="custom-text whitespace-nowrap">
                WHAT WAS YOUR <strong>ROLE</strong> AT THE ORGANIZATION?
              </span>
            </label>
          }
        >
          <Input
            style={{}}
            class="inputEl experience-section inputEl st-current"
            id="experience-section-form-1"
            placeholder="Selected Member"
          />
        </Form.Item>
        <Form.Item
          name="organizationName"
          label={
            <label style={{}}>
              <span className="custom-text whitespace-nowrap">
                FOR WHICH <strong>ORGANIZATION</strong> DID YOU WORK?
              </span>
            </label>
          }
        >
          <Input
            style={{}}
            class="inputEl experience-section inputEl st-current"
            id="experience-section-form-1"
            placeholder="Economics Student Association"
          />
        </Form.Item>

        <Space.Compact block>
          <div style={{ width: '50%' }}>
            {' '}
            <Form.Item
              label={
                <label style={{}}>
                  <span className="custom-text whitespace-nowrap">
                    <strong>HOW LONG</strong> WERE YOU WITH THE ORGANIZATION?
                  </span>
                </label>
              }
            >
              <Space align="center">
                <div className="datepicker" style={{ marginLeft: '10px', minWidth: '197px' }}>
                  <DatePicker
                    wrapperClassName=""
                    dateFormat="MMMM yyyy"
                    showMonthYearPicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    placeholderText={format(new Date(), 'MMMM yyyy')}
                  />
                </div>
                <div style={{ marginLeft: -20 }}>-</div>
                <div style={{ minWidth: '197px' }}>
                  <DatePicker
                    dateFormat="MMMM yyyy"
                    selected={isCurrentlyWorking ? new Date() : endDate}
                    showMonthYearPicker
                    calendarContainer={MyContainer}
                    onChange={date => setEndDate(date)}
                    customInput={isCurrentlyWorking ? <ExampleCustomInput /> : null}
                    placeholderText={format(new Date(), 'MMMM yyyy')}
                  />
                </div>
              </Space>
              <Box className="flex datepicker relative"></Box>
            </Form.Item>
          </div>
          <div style={{ width: '50%' }}>
            <Form.Item
              name="location"
              label={
                <label style={{}}>
                  <span className="custom-text whitespace-nowrap">
                    AT WHICH COLLEGE WAS THE ORGANIZATION LOCATED?
                  </span>
                </label>
              }
            >
              <Input
                style={{}}
                class="inputEl experience-section inputEl st-current"
                id="experience-section-form-1"
                placeholder="University of Wisconsin, Madison"
              />{' '}
            </Form.Item>
          </div>
        </Space.Compact>

        <Form.Item
          name="description"
          label={
            <label style={{}}>
              <span className="custom-text whitespace-nowrap">
                <strong>WHAT DID YOU DO</strong> AT THE ORGANIZATION?
              </span>
            </label>
          }
        >
          <textarea
            className="inputEl undefined src-components-Form-Field--Es8ORQL2ofo= "
            id="experience-section-form-4"
            aria-label="**What did you do** at the company?"
            rows={5}
            placeholder="• Organised and implemented Google Analytics data tracking campaigns to maximize the effectiveness of email remarketing initiatives that were deployed using Salesforce's marketing cloud software."
            name="description"
            style={{
              fontWeight: '400',
              background: 'white',
              height: 120,
              height: 'auto',
              overflow: 'hidden',
              resize: 'none',
            }}
            ref={inputRef}
            onKeyPress={handleKeyPress}
            onChange={handleInputChange}
            onInput={handleTextareaInput}
            value={inputValue}
          />
          <Input type="hidden" value={inputValue} />
        </Form.Item>

        <button
          href=""
          data-size="large"
          data-theme="default"
          data-busy="false"
          class="involvement-section button "
          id="involvement-section-save-to-list"
          type="submit"
        >
          Save to Involvement list
        </button>
      </Form>
    </div>
  );
};
export default InvolvementForm;
