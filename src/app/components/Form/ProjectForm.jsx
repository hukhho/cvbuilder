/* eslint-disable */

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, InputNumber, Space, Switch, Typography, notification } from 'antd';
import moment from 'moment';
import DataService from '@/app/utils/dataService';
import { createExperience, updateExperience } from '@/app/resume/[id]/experience/experienceService';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import TextArea from 'antd/es/input/TextArea';
import { format, parse, startOfMonth } from 'date-fns';
import './customtext.css';
import { Box } from '@chakra-ui/react';

const ProjectForm = ({ cvId, onCreated, data }) => {
  const dataService = new DataService('projects', cvId);
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false); // Add this state
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState(data?.description ? data.description : '');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);
  const minStartDate = startOfMonth(new Date());

  const [isSubmiting, setIsSubmiting] = useState(false);

  const resizeTextArea = () => {
    inputRef.current.style.height = 'auto';
    inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
  };

  useEffect(resizeTextArea, [inputValue]);
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
    setIsSubmiting(true);

    try {
      values.description = inputValue;
      if (endDate < startDate) {
        notification.error({
          message: `Error: End date must be after start date`,
        });
        return;
      }
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
      notification.error({
        message: `Error: ${error}`,
      });
      console.log('Submit Project Form. Error:', error);
    } finally {
      setIsSubmiting(false);
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
              Currently work here {isCurrentlyWorking ? 'Yes' : 'No'}
            </div>
            <div className="mt-5" />
          </div>
        </CalendarContainer>
      </div>
    );
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <input className="inputEl" onClick={onClick} ref={ref} value="Present"></input>
  ));

  return (
    <div className=" " style={{ width: '100%' }}>
      <Form
        onFinish={handleSubmit}
        form={form}
        layout="vertical"
        autoComplete="off"
        requiredMark={false}
      >
        <Form.Item style={{ display: 'none' }} name="theOrder">
          <Input hidden />
        </Form.Item>
        <Form.Item style={{ display: 'none' }} name="isDisplay">
          <Input hidden />
        </Form.Item>
        <Form.Item style={{ display: 'none' }} name="status">
          <Input hidden />
        </Form.Item>
        <Form.Item
          name="title"
          rules={[{ required: true }]}
          label={
            <label style={{}}>
              <span className="custom-text whitespace-nowrap">
                GIVE YOUR PROJECT A <strong>TITLE</strong> *
              </span>
            </label>
          }
        >
          <Input
            style={{}}
            className="inputEl experience-section inputEl st-current"
            id="project-section-form-0"
            placeholder="Volunteer"
          />
        </Form.Item>
        <Form.Item
          name="organization"
          label={
            <label style={{}}>
              <span className="custom-text whitespace-nowrap">
                IN WHICH <strong>ORGANIZATION</strong> DID YOU DO YOUR PROJECT?
              </span>
            </label>
          }
        >
          <Input
            style={{}}
            className="inputEl experience-section inputEl st-current"
            id="project-section-form-1"
            placeholder="Habitat for Humanity"
          />
        </Form.Item>
        <Form.Item name="startDate" hidden>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name="endDate" hidden>
          <Input type="hidden" />
        </Form.Item>

        <Space.Compact block>
          <div style={{ width: '50%', textAlign: 'start', marginRight: '10px' }}>
            <Form.Item
              label={
                <label style={{}}>
                  <span className="custom-text whitespace-nowrap">
                    <strong>WHEN</strong> DID YOU DO YOUR PROJECT?
                  </span>
                </label>
              }
            >
              <Space align="start">
                <div className="relative datepicker" style={{}}>
                  <div className="" style={{ marginLeft: '0' }}>
                    <DatePicker
                      wrapperClassName=""
                      dateFormat="MMMM yyyy"
                      showMonthYearPicker
                      selected={startDate}
                      onChange={date => setStartDate(date)}
                      placeholderText={format(new Date(), 'MMMM yyyy')}
                      maxDate={endDate || minStartDate}
                    />
                  </div>
                  <div style={{ marginTop: '13px', marginLeft: '6px', marginRight: '6px' }}>-</div>
                  <div style={{}}>
                    <DatePicker
                      dateFormat="MMMM yyyy"
                      selected={isCurrentlyWorking ? new Date() : endDate}
                      showMonthYearPicker
                      calendarContainer={MyContainer}
                      onChange={date => setEndDate(date)}
                      customInput={isCurrentlyWorking ? <ExampleCustomInput /> : null}
                      placeholderText={format(new Date(), 'MMMM yyyy')}
                      disabled={!startDate} // Disable if start date is not selected
                      minDate={startDate || minStartDate}
                      maxDate={minStartDate}
                    />
                  </div>
                </div>
              </Space>
            </Form.Item>
          </div>
          <div style={{ width: '50%' }}>
            <Form.Item
              name="projectUrl"
              label={
                <label style={{}}>
                  <span className="custom-text whitespace-nowrap">
                    PROJECT <strong>URL</strong>
                  </span>
                </label>
              }
            >
              <Input
                style={{}}
                className="inputEl experience-section inputEl st-current"
                id="experience-section-form-1"
                placeholder="https://cvbuilder.ai"
              />
            </Form.Item>
          </div>
        </Space.Compact>

        <Form.Item
          name="description"
          label={
            <label style={{}}>
              <span className="custom-text whitespace-nowrap">
                NOW DESCRIBE WHAT <strong>YOU DID</strong>
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
            value={inputValue}
          />
          <Input type="hidden" value={inputValue} />

          {/* <Input
            style={stylesInput}
            placeholder="•Volunteerd to help renovate a house and managed a team of 6."
          /> */}
        </Form.Item>
        <button
          href=""
          data-size="large"
          data-theme="default"
          data-busy="false"
          className="projects-section button "
          id="projects-section-save-to-list"
          type="submit"
          disabled={isSubmiting}
        >
          Save to Project list
        </button>
      </Form>
    </div>
  );
};
export default ProjectForm;
