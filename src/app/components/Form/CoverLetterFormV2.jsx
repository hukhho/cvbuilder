/* eslint-disable no-shadow */

import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  notification,
  Row,
  Select,
  Slider,
  Spin,
  Switch,
} from 'antd';

import DataService from '@/app/utils/dataService';
import { createCoverLetter } from './coverLetterService';
// import { convertToSliderValue, convertToSliderLabel } from './CreativitySlider';

import './customtext.css';
// import './select.css';
import './coverletter.css';
import updateCoverLetter from './updateCoverLetterService';
import { getResumes } from '@/app/utils/indexService';
import { useRouter } from 'next/navigation';
import UpdateCoverLetter from '../Modal/UpdateCoverLetter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const { TextArea } = Input;
const marks = {
  0: 'Most standard',
  0.3: 'A bit creative',
  0.6: 'More creative',
};
const formatter = value => {
  if (value > 0 && value < 0.3) {
    return 'Most standard';
  }
  if (value < 0.6 >= 0.3) {
    return 'A bit creative';
  }
  if (value >= 0.6) {
    return 'More creative';
  }
  return `${value}`; // Default case
};

const CoverLetterFormV2 = ({
  coverLetterId,
  jobIdParam = null,
  isApplyProcess = false,
  data,
  resumeData,
  listResumes,
  onCreated,
  options,
}) => {
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message) => {
    api.info({
      message: 'Notification',
      description: message,
      placement,
    });
  };
  const [form] = Form.useForm();
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isShowContent, setIsShowContent] = useState(false);
  const [slider, setSlider] = useState(0.2);
  const [date, setDate] = useState();
  const onChange = (date, dateString) => {
    console.log(dateString);
    setDate(dateString);
  };
  const [cvId, setCvId] = useState();
  console.log('CoverLetterFormV2 page ~ jobIdParam: ', jobIdParam);

  const [selectedOption, setSelectedOption] = useState(2);

  const handleChange = value => {
    setSelectedOption(value);

    // Assuming 'value' is a string that needs to be compared, parse it to an integer first.
    const valueToFind = parseInt(value, 10);

    // Now, find the option where the parsed integer value of option.value matches valueToFind.
    const option = options.find(option => parseInt(option?.value, 10) === valueToFind);

    // 'option' will be the object from the options array where the value matches, or undefined if no match is found.

    console.log('option', option);

    console.log(`selected ${value}`);
    form.setFieldsValue({
      job_title: option?.title,
      company: option?.company,
      job_description: option?.description,
    });
  };

  const [disabled, setDisabled] = useState(!isApplyProcess);

  const toggle = () => {
    setDisabled(!disabled);
  };
  const handleSubmit = async values => {
    try {
      values.temperature = slider;
      values.dear = values.company;
      values.date = '2023-12-14';
      values.jobPostingId = null;
      if (jobIdParam) {
        jobIdParamInt = parseInt(jobIdParam, 10);
        values.jobPostingId = jobIdParamInt;
      }
      console.log('handleSubmit, values: ', values);

      setLoading(true);

      // openNotification('bottomRight', 'Submiting...');
      notification.info({
        message: 'Submiting...',
      });

      const contentResponse = await createCoverLetter(values.cvId, coverLetterId, values);
      console.log('content state: ', content);
      console.log('content.data.reply: ', contentResponse.reply);

      if (contentResponse.reply) {
        // openNotification('bottomRight', 'Done, redirecting!!!');
        notification.success({
          message: 'Done, redirecting!!!',
        });
        if (jobIdParam && isApplyProcess) {
          router.push(
            `/cover-letter/${coverLetterId}/content?jobId=${jobIdParam}&isApplyProcess=true`,
          );
        } else {
          router.push(`/cover-letter/${coverLetterId}/content`);
        }
      }
      console.log('content state: ', content);
      setLoading(false);
      // onCreated();
    } catch (error) {
      console.log('Submit. Error:', error);
      // openNotification('bottomRight', `Submit. Error: ${error}`);
      notification.error({
        message: `Error ${error?.response?.data?.error || error?.response?.data || error}`,
      });
      setLoading(false);

      // router.push(`/cover-letter/${coverLetterId}/content?jobId=${jobIdParam}&isApplyProcess=true`);
    }
  };
  const formData = {
    // resumeName: data?.resumeName,
    job_title: data?.jobTitle,
    company: data?.company,
    job_description: data?.jobDescription,
    cvId: data?.cvId,
  };
  const formDataApplyProcess = {
    cvId: data?.cvId,
  };
  console.log('listResumes123', listResumes);

  const resumeOptions = listResumes.map(resume => ({
    value: resume?.id,
    label: resume?.resume,
    metadata: {
      jobTitle: resume?.jobTitle,
      company: resume?.company,
      job_description: resume?.jobDescription,
    },
  }));
  console.log('resumeOptions: ', resumeOptions);

  const handleResumeChange = cvId => {
    console.log('handleResumeChange:cvId ', cvId);
    setCvId(cvId);
    const selectedResume = listResumes.find(resume => resume.id === cvId);
    if (selectedResume) {
      form.setFieldsValue({
        job_title: selectedResume.jobTitle,
        company: selectedResume.company,
        job_description: selectedResume.jobDescription,
      });
    }
  };
  const [isSetInitialValue, setIsSetInitialValue] = useState(false);
  useEffect(() => {
    console.log('form.setFieldsValue(formData): ', formData);
    if (isApplyProcess) {
      setDisabled(false);
      form.setFieldsValue(formDataApplyProcess);
      handleChange(jobIdParam);
      setSelectedOption(jobIdParam);
    } else {
      form.setFieldsValue(formData);
    }
  }, [data, form]);

  useEffect(() => {
    if (jobIdParam) {
      handleChange(jobIdParam);
      setSelectedOption(jobIdParam);
    }
    setIsSetInitialValue(true);
  }, [jobIdParam]);

  let jobIdParamInt = 0;
  if (jobIdParam) {
    try {
      jobIdParamInt = parseInt(jobIdParam, 10);
    } catch (error) {
      console.log('error: ', error);
    }
  }
  const [isUpdateResumeOpen, setIsUpdateResumeOpen] = useState(true);

  const openUpdateResumeModal = () => {
    setIsUpdateResumeOpen(true);
  };

  const closeUpdateResumeModal = () => {
    setIsUpdateResumeOpen(false);
  };

  const [isAtsEnabled, setIsAtsEnabled] = useState(true);
  const onChangeSwitch = checked => {
    console.log(`switch to ${checked}`);
    // handleChangeAtsEnabled(checked);
    setIsAtsEnabled(checked);
  };
  return (
    <div className="w-full">
      {contextHolder}
      {isApplyProcess && (
        <>
          <Alert
            className="mb-10"
            message="Informational Notes"
            description={
              <div>
                You are in processing of creating a new cover letter for a specific job.
                <button
                  onClick={openUpdateResumeModal}
                  className="px-4 py-2 text-white bg-gray-300 hover:bg-blue-500 rounded-full "
                >
                  Update cover letter name
                </button>
              </div>
            }
            type="info"
            showIcon
          />
          <UpdateCoverLetter
            isOpen={isUpdateResumeOpen}
            onOpenModal={closeUpdateResumeModal}
            onClose={closeUpdateResumeModal}
            resume={data}
            onCreated={onCreated}
          />
        </>
      )}

      <Form
        onFinish={handleSubmit}
        form={form}
        layout="vertical"
        autoComplete="off"
        requiredMark={false}
      >
        <Form.Item
          name="cvId"
          rules={[
            {
              required: true,
            },
          ]}
          label={
            <label className="!leading-[15px] label flex flex-col justify-between lg:flex-row lg:items-end text-xs uppercase text-gray-600">
              <div className="flex gap-2 items-center text-xs">
                <span>
                  <strong>Select resume for review *</strong>
                </span>
              </div>
            </label>
          }
        >
          <Select
            style={{
              height: 50,
              width: '100%',
            }}
            onChange={handleResumeChange}
            value={cvId}
            options={resumeOptions}
            disabled={isApplyProcess}
          />
        </Form.Item>

        <div className="flex mt-10 mb-10">
          <Switch className="mr-2" onClick={toggle} defaultChecked={!disabled} value={!disabled} />

          <span className="" style={{ fontSize: 13 }}>
            Choose from job list
          </span>
        </div>
        {!disabled && (
          <Form.Item
            name="jobPostingId"
            label={
              <label style={{}}>
                <span className="custom-text whitespace-nowrap">
                  <strong>CHOOSE THE TARGET JOB *</strong>
                </span>
              </label>
            }
          >
            {!disabled && (
              <Select
                style={{
                  height: 50,
                  width: '100%',
                }}
                className=""
                defaultValue={jobIdParamInt > 0 ? jobIdParamInt : null}
                value={selectedOption}
                onChange={handleChange}
                options={options}
                disabled={isApplyProcess}
              />
            )}
          </Form.Item>
        )}

        <Form.Item
          name="job_title"
          rules={[
            {
              required: true,
            },
          ]}
          label={
            <label style={{}}>
              <span className="custom-text whitespace-nowrap">
                <strong>JOB TITLE *</strong>
              </span>
            </label>
          }
        >
          <Input
            className="inputEl"
            style={{
              opacity: !disabled && selectedOption ? 0.5 : 1, // Adjust opacity for disabled state
              backgroundColor: !disabled && selectedOption ? '#f0f0f0' : 'white', // Change background color for disabled state
              cursor: !disabled && selectedOption ? 'not-allowed' : 'auto', // Change cursor style for disabled state
            }}
            disabled={!disabled && selectedOption}
            placeholder="Software Engineer"
          />
        </Form.Item>

        <Form.Item
          name="company"
          label={
            <label style={{}}>
              <span className="custom-text whitespace-nowrap">
                <strong>Company</strong>
              </span>
            </label>
          }
        >
          <Input
            disabled={!disabled && selectedOption}
            style={{
              opacity: !disabled && selectedOption ? 0.5 : 1, // Adjust opacity for disabled state
              backgroundColor: !disabled && selectedOption ? '#f0f0f0' : 'white', // Change background color for disabled state
              cursor: !disabled && selectedOption ? 'not-allowed' : 'auto', // Change cursor style for disabled state
            }}
            placeholder="Google"
          />
        </Form.Item>

        <Form.Item
          name="job_description"
          label={
            <label style={{}}>
              <span className="custom-text whitespace-nowrap">
                <strong>Description</strong>
              </span>
            </label>
          }
        >
          <TextArea
            style={{
              resize: 'none',
              opacity: !disabled && selectedOption ? 0.5 : 1, // Adjust opacity for disabled state
              backgroundColor: !disabled && selectedOption ? '#f0f0f0' : 'white', // Change background color for disabled state
              cursor: !disabled && selectedOption ? 'not-allowed' : 'auto', // Change cursor style for disabled state
            }}
            autoSize={{
              minRows: 6,
              maxRows: 10,
            }}
            disabled={!disabled && selectedOption}
            className="inputEl"
            rows={10}
            placeholder="Copy and paste the job description"
          />
        </Form.Item>

        <Slider
          min={0.2}
          max={1}
          step={0.01}
          tooltip={{
            formatter,
          }}
          value={slider}
          onChange={val => setSlider(val)}
        />
        <label style={{}}>
          <span>
            <strong>Cover Letter creative level</strong>
          </span>
        </label>

        <button hidden={loading} className="button mt-16" type="submit">
          {loading ? 'WAIT TO UPDATE COVER LETTER' : 'CREATE CONTENT COVER LETTER'}
        </button>
        {loading && (
          <Spin spinning={loading}>
            <Alert
              type="info"
              message="Content Cover Letter is writing..."
              description="Wait some second..."
            />
          </Spin>
        )}
      </Form>
    </div>
  );
};

export default CoverLetterFormV2;
