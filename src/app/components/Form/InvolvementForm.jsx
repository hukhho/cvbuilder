import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, InputNumber, Switch, Typography } from 'antd';
import moment from 'moment';
import DataService from '@/app/utils/dataService';
import { createExperience, updateExperience } from '@/app/resume/[id]/experience/experienceService';
import './test.css';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import TextArea from 'antd/es/input/TextArea';
import './date.css';
import { format, parse } from 'date-fns';
import './customtext.css';

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
    <div className="w-2/3 ">
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
          <Input style={stylesInput} placeholder="Selected Member" />
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
          <Input style={stylesInput} placeholder="Economics Student Association" />
        </Form.Item>

        <div style={{}} className="flex justify-between">
          <Form.Item
            label={
              <label style={{}}>
                <span className="custom-text whitespace-nowrap">
                  <strong>WHEN</strong> DID YOU DO YOUR PROJECT?
                </span>
              </label>
            }
          >
            <div className="flex">
              <div style={stylesInput1}>
                <DatePicker
                  wrapperClassName=""
                  dateFormat="MMMM yyyy"
                  showMonthYearPicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  placeholderText={format(new Date(), 'MMMM yyyy')}
                />
              </div>
              <div
                style={{
                  width: '18px',
                  height: '55px',
                }}
                class="flex items-center justify-center bold"
              >
                -
              </div>

              <div style={stylesInput1}>
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
            </div>
          </Form.Item>

          <Form.Item
            name="college"
            label={
              <label style={{}}>
                <span className="custom-text whitespace-nowrap">
                  AT <strong>WHICH COLLEGE</strong> WAS THE ORGANIZATION LOCATED?
                </span>
              </label>
            }
          >
            <Input
              style={{
                marginLeft: '10px',
                padding: '17.30px 15.50px 15.89px',
                backgroundColor: 'white',
                borderRadius: '4px',
                border: '2px solid #e5e5e5',
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: 'Source Sans Pro, sans-serif',
              }}
              placeholder="University of Wisconsin, Madison"
            />
          </Form.Item>
        </div>

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
            className="inputEl text-area"
            style={stylesInput4}
            placeholder="• Participated in forums and discussions presented by key economic thinkers and companies associated with the university."
            ref={inputRef}
            onKeyPress={handleKeyPress}
            onChange={handleInputChange}
            value={inputValue}
            contentEditable="true"
          />
          <Input type="hidden" value={inputValue} />
         
        </Form.Item>
       
        <Button 
          htmlType="submit"
          className="form-button w-full w-[769.22px] h-[47.86px] pl-[313.83px] pr-[315.39px] pt-[17.26px] pb-[17.60px] bg-indigo-500 rounded-md justify-center items-center inline-flex hover:text-white"
          style={{
            width: '769.22px',
            height: '47.86px',
            backgroundColor: 'rgb(77, 112, 235)',
            color: 'white',
          }}
        >
          <div className="hover:text-white text-center text-white text-opacity-80 text-xs font-bold font-['Source Sans Pro'] uppercase leading-3 whitespace-nowrap">
            {isEditMode ? 'UPDATE ' : 'SAVE TO PROJECT LIST'}
          </div>
        </Button>
      </Form>
    </div>
  );
};
export default InvolvementForm;
