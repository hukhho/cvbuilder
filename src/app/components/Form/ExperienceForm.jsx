/* eslint-disable */

import React, { forwardRef, use, useEffect, useRef, useState } from 'react';
import { createExperience, updateExperience } from '@/app/resume/[id]/experience/experienceService';
import { Button, Card, Divider, Form, Input, InputNumber, Space, Switch, Typography } from 'antd';
import moment from 'moment';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import TextArea from 'antd/es/input/TextArea';
// import './date.css';
// import './datepicker.css';

import { format, parse } from 'date-fns';
import { lobster } from '@/app/font';
import {
  Box,
  ButtonGroup,
  Code,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  VStack,
} from '@chakra-ui/react';
const { RangePicker } = DatePicker;
import './selected.css';
import { CommentOutlined } from '@ant-design/icons';
import { createAIWriter } from './aiwriter';
const ExperienceForm = ({ cvId, onExperienceCreated, experience }) => {
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false); // Add this state
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState(
    experience?.description ? experience.description : '',
  );
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);

  const resizeTextArea = () => {
    inputRef.current.style.height = 'auto';
    inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
  };
  useEffect(resizeTextArea, [inputValue]);

  useEffect(() => {
    if (experience) {
      setIsEditMode(true); // Set to edit mode if experience prop is provided
      setInputValue(experience.description);
      const startDateString = experience.duration.split(' - ')[0];
      const endDateString = experience.duration.split(' - ')[1];
      console.log('startDateString: ', startDateString);
      console.log('endDateString: ', endDateString);
      if (endDateString === 'Present') {
        setIsCurrentlyWorking(true);
        console.log('useEffect: setIsCurrentlyWorking to true');
        const parsedStartDate = parse(startDateString, 'MMMM yyyy', new Date());
        setStartDate(parsedStartDate);
        setEndDate(new Date());
      } else {
        setIsCurrentlyWorking(false);
        console.log('useEffect: setIsCurrentlyWorking to false');
        const parsedStartDate = parse(startDateString, 'MMMM yyyy', new Date());
        const parsedEndDate = parse(endDateString, 'MMMM yyyy', new Date());
        setStartDate(parsedStartDate);
        setEndDate(parsedEndDate);
      }
      form.setFieldsValue(experience);
    } else {
      form.resetFields();
      setInputValue('');
      setStartDate('');
      setIsCurrentlyWorking(false);
      setEndDate('');
      setIsEditMode(false); // Set to create mode if experience prop is not provided
    }
  }, [experience, form]);

  const handleSubmit = async values => {
    try {
      values.description = inputValue;
      if (isCurrentlyWorking) {
        values.duration = `${format(startDate, 'MMMM yyyy')} - Present`;
      } else {
        values.duration = `${format(startDate, 'MMMM yyyy')} - ${format(endDate, 'MMMM yyyy')}`;
      }
      if (isEditMode) {
        await updateExperience(cvId, experience.id, values);
        setIsEditMode(false);
        form.resetFields();
        setInputValue('');
        setStartDate('');
        setIsCurrentlyWorking(false);
        setEndDate('');
      } else {
        await createExperience(cvId, values);
        form.resetFields();
        setInputValue('');
        setStartDate('');
        setIsCurrentlyWorking(false);
        setEndDate('');
      }
      onExperienceCreated();
    } catch (error) {
      console.log('Submit ExperienceForm. Error:', error);
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

  const [selectedTextState, setSelectedTextState] = useState('');
  const [AiWriterStatus, setAiWriterStatus] = useState('Not Ready');
  const [isAi, setIsAi] = useState(false);
  const [isCanRewrite, setIsCanRewrite] = useState(false);
  const [selectionRange, setSelectionRange] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [selectionStartState, setSelectionStartState] = useState(null);
  const [selectionEndState, setSelectionEndState] = useState(null);
  const [selectionState, setSelectionState] = useState();

  const handleSelectionChange = () => {
    console.log('handleSelectionChange');
    if (selectedTextState.length > 0) {
      setAiWriterStatus('Rewrite Bullet');
    } else {
      setAiWriterStatus('Generate Bullet');
    }

    const textarea = inputRef.current;
    const value = textarea.value;
    const selectedStart = textarea.selectionStart;
    const selectedEnd = textarea.selectionEnd;
    setIsCanRewrite(true);
    let sentenceStart = selectedStart;
    while (sentenceStart > 0 && value[sentenceStart - 1] !== '\n') {
      sentenceStart--;
    }
    let sentenceEnd = selectedEnd;
    while (sentenceEnd < value.length && value[sentenceEnd] !== '\n') {
      sentenceEnd++;
    }
    const selectedSentence = value.substring(sentenceStart, sentenceEnd).trim();

    if (selectedSentence) {
      setSelectedTextState(selectedSentence);
      setSelectionStartState(sentenceStart);
      setSelectionEndState(sentenceEnd);
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const x = rect.left + window.scrollX + rect.width / 2;
        const y = rect.top + window.scrollY + rect.height;
        setTooltip({ x, y, text: 'cac' });
        console.log('tooltip: ', tooltip);
      }
    }
  };

  const getSelectedText = () => {};

  const [message, setMessage] = useState('');
  const [replyContent, setReplyContent] = useState([]);

  const handleReplaceWithLorem = content => {
    const newText = content;

    setInputValue(prevValue => {
      const newValue =
        prevValue.substring(0, selectionStartState) +
        newText +
        prevValue.substring(selectionEndState);

      return newValue;
    });
  };

  // ...

  // Inside your component render method or JSX
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  const initialFocusRef = React.useRef();
  const handleAiWriter = async () => {
    console.log('handleAiWriter');

    const textarea = inputRef.current;
    console.log('textarea: ', textarea);
    textarea.selectionStart = selectionStartState;
    console.log('textarea.selectionStart: ', textarea.selectionStart);
    textarea.selectionEnd = selectionEndState;
    console.log('textarea.selectionEnd: ', textarea.selectionEnd);

    textarea.setSelectionRange(selectionStartState, selectionEndState);
    textarea.focus();

    // console.log('textarea: ', textarea);
    // // Replace the selected text with "Lorem"
    // const newText = "Lorem";
    // textarea.value = textarea.value.substring(0, selectionStartState) + newText + textarea.value.substring(selectionEndState);
    // // Set the selection range to the end of the replaced text
    // const newCursorPosition = selectionStartState + newText.length;
    // textarea.setSelectionRange(newCursorPosition, newCursorPosition);

    console.log('submitToBackend: ', selectedTextState);
    setMessage(
      'Submit to backend... ' +
        'https://api-cvbuilder.monoinfinity.net/api/v1/chat-gpt/cover-letter/revise?content=' +
        selectedTextState +
        '?improvement=' +
        'experience',
    );

    try {
      const data = {
        content: selectedTextState,
        improvement: 'experience',
      };
      await createAIWriter(data);

      const fakeData = {
        data: {
          reply: [
            '• This content is make from chatgpt 1',
            '• This content is make from chatgpt 2',
            '• This content is make from chatgpt 3',
          ],
        },
      };
      console.log('setReplyContent:');
      setReplyContent(fakeData.data.reply);
      setIsOpen(true);
      

      const textarea = inputRef.current;
      console.log('textarea: ', textarea);
      textarea.selectionStart = selectionStartState;
      console.log('textarea.selectionStart: ', textarea.selectionStart);
      textarea.selectionEnd = selectionEndState;
      console.log('textarea.selectionEnd: ', textarea.selectionEnd);

      textarea.setSelectionRange(selectionStartState, selectionEndState);
      textarea.focus();
    } catch (error) {
      console.error('Error:', error);
      // setMessage(message + " " + error.message)
      setMessage(
        'Submit to backend... ' +
          'https://api-cvbuilder.monoinfinity.net/api/v1/chat-gpt/cover-letter/revise?content=' +
          selectedTextState +
          '?improvement=' +
          'experience' +
          ' ' +
          error,
      );

      const fakeData = {
        data: {
          reply: [
            '• This content is make from chatgpt 1',
            '• This content is make from chatgpt 2',
            '• This content is make from chatgpt 3',
          ],
        },
      };
      console.log('setReplyContent:');
      setReplyContent(fakeData.data.reply);
      setIsOpen(true);
      

      const textarea = inputRef.current;
      console.log('textarea: ', textarea);
      textarea.selectionStart = selectionStartState;
      console.log('textarea.selectionStart: ', textarea.selectionStart);
      textarea.selectionEnd = selectionEndState;
      console.log('textarea.selectionEnd: ', textarea.selectionEnd);

      textarea.setSelectionRange(selectionStartState, selectionEndState);
      textarea.focus();
    }
  };
  
  


  const handleInputBlur = () => {
    const textarea = inputRef.current;
    console.log('textarea: ', textarea);
    textarea.selectionStart = selectionStartState;
    console.log('textarea.selectionStart: ', textarea.selectionStart);
    textarea.selectionEnd = selectionEndState;
    console.log('textarea.selectionEnd: ', textarea.selectionEnd);

    textarea.setSelectionRange(selectionStartState, selectionEndState);
    textarea.focus();
  }

  const handleReplaceContent = newContent => {
    setInputValue(newContent);
    // If you want to update the selection range, you can do it here.
    // For example, if you want to place the cursor at the end of the new content:
    setSelectionStartState(newContent.length);
    setSelectionEndState(newContent.length);
  };

  return (
    <div className="" style={{ width: '842px' }}>
      <Form onFinish={handleSubmit} form={form} layout="vertical" autoComplete="off">
        <Form.Item
          name="role"
          label={
            <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
              <div className="flex gap-2 items-center text-xs">
                <span>
                  WHAT WAS YOUR <strong>ROLE</strong> AT THE COMPANY?{' '}
                </span>
              </div>
            </label>
          }
        >
          <Input
            style={{
              color: '#283E50',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: '23.4px',
            }}
            className="inputEl experience-section inputEl st-current"
            id="experience-section-form-0"
            placeholder="Marketing Analyst"
          />
        </Form.Item>
        <Form.Item
          name="companyName"
          label={
            <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
              <div className="flex gap-2 items-center text-xs">
                <span>
                  FOR WHICH <strong>COMPANY</strong> DID YOU WORK?
                </span>
              </div>
            </label>
          }
        >
          <Input
            style={{}}
            className="inputEl experience-section inputEl st-current"
            id="experience-section-form-1"
            placeholder="Google"
          />
          {/* <Input style={stylesInput} placeholder="Google" /> */}
        </Form.Item>
        <Form.Item name="startDate" hidden>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name="endDate" hidden>
          <Input type="hidden" />
        </Form.Item>
        <Space.Compact style={{ width: '842px' }} block>
          <div style={{ width: '50%', textAlign: 'start', marginRight: '10px' }}>
            <Form.Item
              label={
                <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
                  <div className="flex gap-2 items-center text-xs">
                    <span>
                      <strong>HOW LONG</strong> WERE YOU WITH THE COMPANY?
                    </span>
                  </div>
                </label>
              }
            >
              <Space align="center">
                <div className="datepicker">
                  <div className="" style={{ marginLeft: '0' }}>
                    <DatePicker
                      wrapperClassName=""
                      dateFormat="MMMM yyyy"
                      showMonthYearPicker
                      selected={startDate}
                      onChange={date => setStartDate(date)}
                      placeholderText={format(new Date(), 'MMMM yyyy')}
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
                    />
                  </div>
                </div>
              </Space>
            </Form.Item>
          </div>
          <div style={{ width: '50%' }}>
            <Form.Item
              name="location"
              label={
                <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
                  <div className="flex gap-2 items-center text-xs">
                    <span>
                      <strong>WHERE</strong> WAS THE COMPANY LOCATED?
                    </span>
                  </div>
                </label>
              }
            >
              <Input
                style={{}}
                className="inputEl experience-section inputEl st-current"
                id="experience-section-form-1"
                placeholder="New York, NY"
              />
            </Form.Item>
          </div>
        </Space.Compact>

        <Form.Item
          name="description"
          style={{}}
          label={
            <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
              <div className="flex gap-2 items-center text-xs">
                <span>
                  <strong>WHAT DID YOU DO</strong> AT THE COMPANY?
                </span>
              </div>
            </label>
          }
        >
          <button
            type="button"
            onClick={handleAiWriter}
            className="button"
            style={{ background: '#4d70eb', marginBottom: 10, width: '50px' }}
          >
            {AiWriterStatus}
          </button>
          <Popover
            isOpen={isOpen}
            initialFocusRef={initialFocusRef}
            placement="top"
            closeOnBlur={false}
          >
            <PopoverTrigger>
              <div></div>
            </PopoverTrigger>
            <PopoverContent zIndex={99} style={{}}>
              <PopoverHeader pt={4} fontWeight="bold" border="0">
                Manage Your Channels
              </PopoverHeader>
              <PopoverArrow bg="blue.800" />
              <PopoverCloseButton />
              <PopoverBody>
                <Code className="bg-green-100 mt-4">
                  <Code className="bg-green-100 mt-4 flex flex-col" style={{}}>
                    Giả sử khi fetch xong data từ server:
                    {replyContent.map((content, index) => (
                      <React.Fragment key={index}>
                        <div>{content}</div>
                        <button
                          type="button"
                          className="button"
                          style={{ background: 'blue' }}
                          onClick={() => handleReplaceWithLorem(content)}
                        >
                          Replace
                        </button>
                      </React.Fragment>
                    ))}
                  </Code>
                </Code>
              </PopoverBody>
              <PopoverFooter
                border="0"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                pb={4}
              >
                <Box fontSize="sm">Step 2 of 4</Box>
                <ButtonGroup size="sm">
                  <Button onClick={handleClose} colorScheme="green">
                    Close
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </Popover>

          <textarea
            className="ghost inputEl undefined src-components-Form-Field--Es8ORQL2ofo= "
            id="experience-section-form-4"
            aria-label="**What did you do** at the company?"
            rows={5}
            placeholder="• Organised and implemented Google Analytics data tracking campaigns to maximize the effectiveness of email remarketing initiatives that were deployed using Salesforce's marketing cloud software."
            name="description"
            style={{
              fontWeight: '400',
              background: 'white',
              height: 'auto',
              overflow: 'hidden',
              resize: 'none',
            }}
            ref={inputRef}
            onKeyPress={handleKeyPress}
            onChange={handleInputChange}
            onSelect={handleSelectionChange} // Triggered when text is selected
            value={inputValue}
          />

          {/* <textarea
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
            onSelect={handleSelectionChange} // Triggered when text is selected
            value={inputValue}
          /> */}

          <Input type="hidden" value={inputValue} />
        </Form.Item>

        <button
          href=""
          data-size="large"
          data-theme="default"
          data-busy="false"
          className="experience-section button"
          id="experience-section-save-to-list"
          type="submit"
        >
          Save to Experience list
        </button>
      </Form>

      <div className="relative">
        <Card className="flex flex-col mt-2" style={{ textAlign: 'left' }}>
          Dev log:
          <Code className="bg-blue-100">Selected: {selectedTextState}</Code>
          <Code className="bg-red-100 mt-2">{message}</Code>
        </Card>
      </div>
    </div>
  );
};
export default ExperienceForm;
