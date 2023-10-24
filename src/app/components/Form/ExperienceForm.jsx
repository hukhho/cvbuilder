import React, { forwardRef, useEffect, useState } from 'react';
import { createExperience, updateExperience } from '@/app/resume/[id]/experience/experienceService';
import { Button, Form, Input, InputNumber, Switch, Typography } from 'antd';
import moment from 'moment';
import './test.css';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import TextArea from 'antd/es/input/TextArea';

const { RangePicker } = DatePicker;

const stylesInput = {
  width: '842.22px',
  height: '56.19px',
  padding: '17.30px 15.50px 15.89px',
  backgroundColor: 'white',
  borderRadius: '4px',
  border: '2px solid #e5e5e5',
  fontSize: '16px',
  fontWeight: '600',
  fontFamily: 'Source Sans Pro, sans-serif',
};
const stylesInput2 = {
  width: '444.22px',
  height: '55.19px',
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
  width: '842.22px',
  height: '132.19px',
  padding: '10.30px 0.50px 10.89px 10px',
  backgroundColor: 'red',
  borderRadius: '4px',
  border: '2px solid #e5e5e5',
  fontSize: '16px',
  fontWeight: '600',
  fontFamily: 'Source Sans Pro, sans-serif',
  background: 'transparent',
  textAlign: 'left', // Set text alignment to left
};

const MyContainer = ({ className, children }) => {
  return (
    <div style={{}}>
      <CalendarContainer className={className}>
        <div style={{ position: 'relative' }}>{children}</div>
        <div>
          <div className="mt-20">
            <Switch className="mr-5" size="small" defaultChecked={false} onChange={onChange} />
            Currently work here
          </div>
          <div className="mt-5" />
        </div>
      </CalendarContainer>
    </div>
  );
};
const onChange = checked => {
  console.log(`switch to ${checked}`);
};

const ExperienceForm = ({ cvId, onExperienceCreated, experience }) => {
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false); // Add this state

  useEffect(() => {
    if (experience) {
      setIsEditMode(true); // Set to edit mode if experience prop is provided
    } else {
      form.resetFields();
      setIsEditMode(false); // Set to create mode if experience prop is not provided
    }
  }, [experience, form]);

  const handleSubmit = async values => {
    try {
      if (isEditMode) {
        await updateExperience(cvId, experience.id, values);
        setIsEditMode(false);
        form.resetFields();
      } else {
        await createExperience(cvId, values);
        form.resetFields();
      }
      onExperienceCreated();
    } catch (error) {
      console.log('Submit ExperienceForm. Error:', error);
    }
  };
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="w-2/3 ">
      <Form onFinish={handleSubmit} form={form} layout="vertical" autoComplete="off">
        <Form.Item
          name="role"
          label={
            <label style={{}}>
              <span className="custom-text whitespace-nowrap">
                WHAT WAS YOUR <strong>ROLE</strong> AT THE COMPANY?
              </span>
            </label>
          }
        >
          <Input style={stylesInput} placeholder="Marketing Analyst" />
        </Form.Item>
        <Form.Item
          name="companyName"
          label={
            <label style={{}}>
              <span className="custom-text whitespace-nowrap">
                FOR WHICH <strong>COMPANY</strong> DID YOU WORK?
              </span>
            </label>
          }
        >
          <Input style={stylesInput} placeholder="Google" />
        </Form.Item>

        <Form.Item name="startDate" hidden>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name="endDate" hidden>
          <Input type="hidden" />
        </Form.Item>
        <div className="flex">
          <Form.Item
            name="location"
            label={
              <label style={{}}>
                <span className="custom-text whitespace-nowrap">
                  <strong>WHERE</strong> WAS THE COMPANY LOCATED?
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
                  wrapperClassName=""
                  dateFormat="MMMM yyyy"
                  showMonthYearPicker
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  enableTabLoop={false}
                  calendarContainer={MyContainer}
                />
              </div>
            </div>
          </Form.Item>

          {/* <Form.Item
            name="range-picker"
            style={{maxWidth: 50}}
            label={
              <label style={{}}>
                <span className="custom-text whitespace-nowrap">
                  <strong>HOW LONG</strong> WERE YOU WITH THE COMPANY?
                </span>
              </label>
            }
          >
            <RangePicker style={stylesInput} picker="month" onChange={handleDateChange} />
          </Form.Item> */}
          <Form.Item
            name="location"
            style={{ marginLeft: 20 }}
            label={
              <label style={{}}>
                <span className="custom-text whitespace-nowrap">
                  <strong>WHERE</strong> WAS THE COMPANY LOCATED?
                </span>
              </label>
            }
          >
            <Input style={stylesInput2} placeholder="NewYork, NY" />
          </Form.Item>
        </div>

        <Form.Item
          name="description"
          style={{}}
          label={
            <label style={{}}>
              <span className="custom-text whitespace-nowrap">
                <strong>WHAT DID YOU DO</strong> AT THE COMPANY?
              </span>
            </label>
          }
        >
          <div />
          {/* <TextArea
             style={stylesInput4}
            className="inputEl text-area"
            placeholder="• Organized and implemented Google Analytics data tracking campaigns to maximize the effectiveness of email remarketing initiatives that were deployed using Salesforce's marketing cloud software."
            contentEditable="true"
          /> */}

          <textarea
            className="inputEl text-area"
            style={stylesInput4}
            placeholder="• Organized and implemented Google Analytics data tracking campaigns to maximize the effectiveness of email remarketing initiatives that were deployed using Salesforce's marketing cloud software."
            contentEditable="true"
          />

          {/* <Input
            className="inputEl"
            style={stylesInput4}
            placeholder="• Organised and implemented Google Analytics data tracking campaigns to maximize the effectiveness of email remarketing initiatives that were deployed using Salesforce's marketing cloud software."
            onInput={handleDescriptionChange}
          /> */}
        </Form.Item>

        <Button
          htmlType="submit"
          className="form-button w-full w-[769.22px] h-[47.86px] pl-[313.83px] pr-[315.39px] pt-[17.26px] pb-[17.60px] bg-indigo-500 rounded-md justify-center items-center inline-flex hover:text-white"
          style={{
            width: '842.22px',
            height: '47.86px',
            backgroundColor: 'rgb(77, 112, 235)',
            color: 'white',
          }}
        >
          <div className="hover:text-white text-center text-white text-opacity-80 text-xs font-bold font-['Source Sans Pro'] uppercase leading-3 whitespace-nowrap">
            {isEditMode ? 'UPDATE ' : 'SAVE TO EXPERIENCE LIST'}
          </div>
        </Button>
      </Form>
    </div>
  );
};
export default ExperienceForm;
