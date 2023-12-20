/* eslint-disable */

import React, { forwardRef, use, useEffect, useRef, useState } from 'react';
import { createExperience, updateExperience } from '@/app/resume/[id]/experience/experienceService';
import {
  Alert,
  Button,
  Card,
  Divider,
  Empty,
  Form,
  Input,
  InputNumber,
  Space,
  Spin,
  Switch,
  Typography,
} from 'antd';
import moment from 'moment';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import TextArea from 'antd/es/input/TextArea';
// import './date.css';
// import './datepicker.css';
import './ai.css';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faCopy } from '@fortawesome/free-solid-svg-icons';
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
  const [isSubmiting, setIsSubmiting] = useState(false);

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
      setIsEditMode(false);
    }
  }, [experience, form]);

  const handleSubmit = async values => {
    setIsSubmiting(true);
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
    } finally {
      setIsSubmiting(false);
    }
  };

  const [selectedIndices, setSelectedIndices] = useState([]);
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
  const [AiWriterStatus, setAiWriterStatus] = useState('AI Writer not ready');
  const [isAi, setIsAi] = useState(false);
  const [isCanRewrite, setIsCanRewrite] = useState(false);
  const [selectionRange, setSelectionRange] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [selectionStartState, setSelectionStartState] = useState(null);
  const [selectionEndState, setSelectionEndState] = useState(null);
  const [selectionState, setSelectionState] = useState();

  const handleSelectionChange = () => {
    const textarea = inputRef.current;
    const value = textarea.value;
    const selectedStart = textarea.selectionStart;
    const selectedEnd = textarea.selectionEnd;

    console.log(
      'handleSelectionChange:selectedStart :',
      selectedStart,
      'selectedEnd: ',
      selectedEnd,
    );
    if (selectedStart === selectedEnd) {
      setAiWriterStatus('AI Writer not ready');
      setSelectedTextState('');
      return;
    }
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
      }
      setAiWriterStatus('AI Writer Ready');
    } else {
      setAiWriterStatus('AI Writer not ready');

      // if (selectedTextState?.length > 0) {
      //   setAiWriterStatus('Rewrite Bullet');
      // } else {
      //   setAiWriterStatus('AI Writer not ready');
      //   setSelectedTextState('');
      // }
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
    resizeTextArea();
  };
  const initialFocusRef = React.useRef();

  const [markText, setMarkText] = useState('');
  const [isAiLoading, setIsAiLoading] = useState('');
  const [aiContentError, setAiContentError] = useState();

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

    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);

    const markedText = `<mark id="ghost_highlight_mark" style="background-color: rgba(77, 112, 235, 0.15);">${selectedText}</mark>`;
    const updatedText = textarea.value.replace(selectedText, markedText);
    setMarkText(updatedText);
    setAiContent(updatedText);
    // setInputValue();
    setIsAiWrite(true);
    setIsAi(true);

    // const fakeData = {
    //   data: {
    //     reply: [
    //       '• This content is make from chatgpt 1',
    //       '• This content is make from chatgpt 2',
    //       '• This content is make from chatgpt 3',
    //     ],
    //   },
    // };
    console.log('setReplyContent:');
    // setReplyContent(fakeData.data.reply);

    // Mark the selected text (you can customize this part)
    // const markedText = `<mark>${selectedText}</mark>`;
    // setMarkText(markedText);

    // Log the marked text
    // const items = inputValue.split('\n').map((item, index) => ({ id: index, text: item }));
    // const newText = items
    //   .map(item => {
    //     console.log('item: ', item);
    //     if (item === selectedText) {
    //       console.log('itemVIP: ', item);
    //       return `<mark>${item.text}</mark>`;
    //     }
    //     return `-> ${item.text}`;
    //   })
    //   .join('\n');

    // setMarkText(selectedIndices);
    console.log('selectedIndices', selectedIndices);
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
        jobTitle: experience?.role ? experience?.role : 'ProjectManager',
        bullet: selectedTextState,
      };
      setReplyContent([]);

      setIsAiLoading(true);

      const result = await createAIWriter(data);
      console.log('result: ', result);
      setIsAiLoading(false);

      // const fakeData = {
      //   data: {
      //     reply: [
      //       '• This content is make from chatgpt 1',
      //       '• This content is make from chatgpt 2',
      //       '• This content is make from chatgpt 3',
      //     ],
      //   },
      // };
      // const replyArray = result.reply.split('\n');

      // Create an array of strings with the desired format
      // const fakeData = {
      //   data: {
      //     reply: replyArray.map((point, index) => `${point.replace("- ", "• ")}`),
      //   },
      // };
      console.log('setReplyContent:');
      setReplyContent(result.reply);
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
      setIsAiLoading(false);
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

      // const fakeData = {
      //   data: {
      //     reply: [
      //       '• This content is make from chatgpt 1',
      //       '• This content is make from chatgpt 2',
      //       '• This content is make from chatgpt 3',
      //     ],
      //   },
      // };
      // console.log('setReplyContent:');
      // setReplyContent(fakeData.data.reply);
      // setIsOpen(true);

      // const textarea = inputRef.current;
      // console.log('textarea: ', textarea);
      // textarea.selectionStart = selectionStartState;
      // console.log('textarea.selectionStart: ', textarea.selectionStart);
      // textarea.selectionEnd = selectionEndState;
      // console.log('textarea.selectionEnd: ', textarea.selectionEnd);

      // textarea.setSelectionRange(selectionStartState, selectionEndState);
      // textarea.focus();
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
  };

  const [isAiWrite, setIsAiWrite] = useState(false);
  const [aiContent, setAiContent] = useState();

  const handleApplyAiWriter = newContent => {
    const regex = /<mark[^>]*>([\s\S]*?)<\/mark>/gm;
    const markedText = `<mark id="ghost_highlight_mark" style="background-color: rgba(77, 112, 235, 0.15);">${newContent}</mark>`;

    setAiContent(aiContent => aiContent.replace(regex, markedText));
  };
  const handleApplyAiContent = () => {
    const regex = /<mark[^>]*>([\s\S]*?)<\/mark>/gm;
    const cleanedContent = aiContent.replace(regex, '$1');
    console.log('Cleaned Content: ', cleanedContent);

    setInputValue(cleanedContent);
    setAiContent();
    setIsAiWrite(false);
    setIsAi(false);
    // setAiContent(aiContent => aiContent.replace(regex, markedText));
  };
  const handleCloseAiWriter = () => {
    // setInputValue(aiContent => aiContent.replace(regex, newContent));
    setAiContent();
    setReplyContent([]);

    setIsAiWrite(false);
    setIsAi(false);

    // setAiContent(aiContent => aiContent.replace(regex, markedText));
  };
  const handleBlur = event => {
    // Check if the relatedTarget is not a button
    if (!(event.relatedTarget && event.relatedTarget.tagName === 'BUTTON')) {
      console.log('Textarea has lost focus');
      setAiWriterStatus('AI Writer not ready');
    }
  };

  return (
    <div className="" style={{}}>
      <Form
        onFinish={handleSubmit}
        form={form}
        layout="vertical"
        autoComplete="off"
        requiredMark={false}
      >
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
          rules={[{ required: true }]}
          label={
            <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
              <div className="flex gap-2 items-center text-xs">
                <span>
                  FOR WHICH <strong>COMPANY</strong> DID YOU WORK? *
                </span>
              </div>
            </label>
          }
        >
          <Input
            style={{ marginTop: -10 }}
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
        <Space.Compact style={{}} block>
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
              <Space align="center" style={{ marginTop: -10 }}>
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
                style={{ marginTop: -10 }}
                className="inputEl experience-section inputEl st-current"
                id="experience-section-form-1"
                placeholder="New York, NY"
              />
            </Form.Item>
          </div>
        </Space.Compact>
        <div className="flex items-end justify-between">
          <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
            <div className="flex gap-2 items-center text-xs">
              <span>
                <strong>WHAT DID YOU DO</strong> AT THE COMPANY?
              </span>
            </div>
          </label>
          {/* <button
            disabled={isAiWrite}
            type="button"
            onClick={handleAiWriter}
            className="button"
            style={{ background: '#4d70eb', marginBottom: 10, width: '50px' }}
          >
            {AiWriterStatus}
          </button> */}
          <div className={AiWriterStatus === 'AI Writer not ready' ? 'notReady' : 'redo'}>
            <button
              disabled={AiWriterStatus === 'AI Writer not ready' ? true : false}
              type="button"
              onClick={handleAiWriter}
              data-tooltip="Add a Role first"
            >
              <FontAwesomeIcon icon={faBolt} />
              <span>{AiWriterStatus}</span>
            </button>
          </div>
        </div>

        <Form.Item name="description" style={{}}>
          {/* <textarea
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
          /> */}

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
          <div style={{ position: 'relative', display: 'block', zIndex: 0, textAlign: 'left' }}>
            <div className="summary-section src-components-GeneratorForm--yE-M0KIYLqM= src-components-GeneratorForm--fATEgyCKtc4=   src-components-Form-Textarea--33tYOpt2RMw= ">
              <label
                className="!leading-[15px] !mb-3 label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600"
                htmlFor="summary-section-form-0"
              >
                {aiContent && (
                  <div
                    className="wrapper-ai flex flex-col"
                    id="experience-section-form-4-ghost"
                    style={{ height: 'auto', zIndex: 99, width: '100%' }}
                  >
                    <span className="" dangerouslySetInnerHTML={{ __html: aiContent }} />

                    <div className="mt-4">
                      AI Content:
                      {isAiLoading && (
                        <Spin tip="Ai is writing...">
                          <Alert
                            message="AI Writer is writing..."
                            description="Writing..."
                            type="info"
                          />
                        </Spin>
                      )}
                      <div className="flex flex-col">
                        {replyContent?.map((reply, index) => {
                          return (
                            <div className="mt-2" style={{ borderRadius: '10px' }}>
                              {reply}
                              <button type="button" onClick={e => handleApplyAiWriter(reply)}>
                                <FontAwesomeIcon icon={faCopy} />
                              </button>
                            </div>
                          );
                        })}
                        {!isAiLoading && replyContent?.length === 0 && <Empty />}
                      </div>
                    </div>

                    <div className="flex" style={{ width: '50px' }}>
                      <button onClick={handleApplyAiContent} className="button cta mt-8" type="">
                        Apply AI Content
                      </button>
                      <button
                        onClick={handleCloseAiWriter}
                        className="button cta bg-red-500 mt-8 ml-8"
                        type="button"
                      >
                        Close AI Writer
                      </button>
                    </div>
                  </div>
                )}
              </label>
              <div className="relative">
                <textarea
                  className="inputEl undefined src-components-Form-Field--Es8ORQL2ofo= "
                  id="summary-section-form-0"
                  aria-label="Write a professional **summary**"
                  disabled={isAiWrite}
                  placeholder={`${
                    isAiWrite
                      ? ''
                      : 'Experienced global early-stage executive with economics and mathematics degree from the University of Wisconsin. Passion for building inspiring companies people love through industry-leading design, development, branding, and making big bets.'
                  } `}
                  name="description"
                  style={{
                    display: isAiWrite ? 'none' : 'block',
                    background: isAiWrite ? 'transparent' : 'white',
                    height: 120,
                    fontWeight: 400,
                    overflow: 'hidden',
                    resize: 'none',
                  }}
                  ref={inputRef}
                  onKeyPress={handleKeyPress}
                  onSelect={handleSelectionChange} // Triggered when text is selected
                  onChange={handleInputChange}
                  onBlur={handleBlur} // Add onBlur event handler here
                  value={inputValue}
                />
              </div>
            </div>
          </div>

          <Input type="hidden" value={inputValue} />
        </Form.Item>
        <Form.Item>
          <div className="form-submit-wrapper">
            <button
              style={{ width: '100%', height: '50px' }}
              href=""
              data-size="large"
              data-theme="default"
              data-busy="false"
              className='contact-section form[data-theme="basic"] button'
              id="contact-section-save-to-list"
              type="submit"
              disabled={isSubmiting}
            >
              SAVE TO EXPERIENCE LIST{' '}
            </button>
          </div>
        </Form.Item>
     
      </Form>

    
    </div>
  );
};
export default ExperienceForm;
