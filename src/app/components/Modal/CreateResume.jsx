import React, { useEffect, useState } from 'react';
import {
  Button,
  Collapse,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Typography,
  Upload,
} from 'antd';
import optionsData from './field.json';
import levelData from './level.json';

import { InboxOutlined } from '@ant-design/icons';

import createResumeService from './createResumeService';

const { Dragger } = Upload; // Correct path

const props = {
  name: 'file',
  multiple: true,
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};
const stylesInput = {
  width: '459px',
  height: '55px',
  padding: '17.30px 15.50px 15.89px',
  backgroundColor: 'white',
  borderRadius: '4px',
  border: '2px solid #e5e5e5',
  fontSize: '16px',
  fontWeight: '600',
  fontFamily: 'Source Sans Pro, sans-serif',
};
// import optionsData from './fields.json'; // Import the JSON data

const CreateResume = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  // Form
  const [form] = Form.useForm();
  const options = optionsData?.map(option => ({
    value: option.label,
    label: option.label,
  }));

  useEffect(() => {
    console.log('optionsData: ', optionsData);
  }, []);

  const userId = 1;
  const handleSubmit = async values => {
    try {
      await createResumeService(1, values); // Correct usage
      //   onExperienceCreated();
    } catch (error) {
      console.log('Submit . Error:', error);
    }
  };

  //
  const onChange = key => {
    console.log(key);
  };

  return (
    <>
      <button
        href=""
        data-size="default"
        data-theme="default"
        data-busy="false"
        class="cta-button cta button "
        id="navi-create-new-resume"
        onClick={showModal}
       
      >
        {' '}
        <i class="fad fa-file-plus" aria-hidden="true"></i>
        <span>Create new resume</span>
      </button>
      {/* <Button
        style={{
          background: '#4D70EB',
          fontSize: '12px',
          padding: '4px 8px',
          color: '#ffffff',
          fontWeight: 'bold',
        }}
        onClick={showModal}
      >
        CREATE NEW RESUME
      </Button> */}
      <Modal
        open={open}
        title="Create a resume"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          [
            //   <Button key="back" onClick={handleCancel}>
            //     Return
            //   </Button>,
            //   <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            //     Submit
            //   </Button>
          ]
        }
      >
        <Form onFinish={handleSubmit} form={form} layout="vertical" autoComplete="off">
          <Form.Item name="resumeName" label="RESUME NAME">
            <Input style={stylesInput} placeholder="" />
          </Form.Item>
          <Form.Item name="fieldOrDomain" label="FIELD OR DOMAIN?">
            <Select
              showSearch
              style={{ width: 459 }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label ?? '').includes(input)}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={options}
            />
          </Form.Item>

          <Form.Item name="experience" label="EXPERIENCE">
            <Select
              showSearch
              style={{ width: 459 }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label ?? '').includes(input)}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={levelData}
            />
          </Form.Item>

          <Collapse
            defaultActiveKey={['1']}
            ghost
            style={{ padding: '0px', marginLeft: '-20px' }}
            items={[
              {
                key: '1',
                label: 'IMPORT YOUR RESUME FROM LINKEDIN',
                children: (
                  <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Upload Profile.REZI file</p>
                    <p className="ant-upload-hint">
                      Don’t have a .rezi file? Check out our free Chrome Extension Profile 2 Resume
                      to import your Linkedin profile.
                    </p>
                  </Dragger>
                ),
              },
              {
                key: '2',
                label: 'IMPORT YOUR EXISTING RESUME',
                children: (
                  <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Upload PDF, DOC resume file</p>
                    <p className="ant-upload-hint">
                      While we can’t guarantee perfect results, we’re constantly working to improve
                      importing for a better user experience.
                    </p>
                  </Dragger>
                ),
              },
            ]}
          />
          {/* <Form.Item name="location" label="WHERE WAS THE COMPANY LOCATED?">
            <Input style={stylesInput} placeholder="NewYork, NY" />
          </Form.Item>

          <Form.Item name="description" label="WHAT DID YOU DO AT THE COMPANY?">
            <Input style={stylesInput} placeholder="• Orgi..." />
          </Form.Item> */}

          <Button
            htmlType="submit"
            className="form-button w-full w-[769.22px] h-[47.86px] pl-[313.83px] pr-[315.39px] pt-[17.26px] pb-[17.60px] bg-indigo-500 rounded-md justify-center items-center inline-flex hover:text-white"
            key="submit"
            loading={loading}
            onClick={handleOk}
            style={{
              marginTop: '20px',
              width: '126px',
              height: '39px   ',
              backgroundColor: 'rgb(77, 112, 235)',
              color: 'white',
            }}
          >
            <div className="hover:text-white text-center text-white text-opacity-80 text-xs font-bold font-['Source Sans Pro'] uppercase leading-3 whitespace-nowrap">
              SAVE
            </div>
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default CreateResume;
