import React from 'react';
import { Form, Input, InputNumber, Typography, DatePicker, Button } from 'antd';
import RangePickerComponent from '../DatePicker/RangePickerComponent';
const { RangePicker } = DatePicker;

// const rangeConfig = {
//     rules: [
//       {
//         type: 'array',
//         message: 'Please select time!',
//       },
//     ],
//   };

const ProjectForm = () => {
    const [form] = Form.useForm();
    const nameValue = Form.useWatch('name', form);
    return (
        <>
            <div className="w-2/3 ">
                <Form style={{}} form={form} layout="vertical" autoComplete="off">
                    <Form.Item label="GIVE YOUR PROJECT A TITLE *">
                        <Input style={{}} placeholder="Volunteer" />
                    </Form.Item>
                    <Form.Item name="Company" label="IN WHICH ORGANIZATION DID YOU DO YOUR PROJECT?">
                        <Input style={{}} placeholder="Habitat for Humanity" />
                    </Form.Item>
                    <Form.Item name="range-picker" label=" WHEN DID YOU DO YOUR PROJECT?">
                        <RangePicker style={{ width: '100%' }} />
                    </Form.Item>







                    <Form.Item name="WhatDo" label="NOW DESCRIBE WHAT YOU DID">
                        <Input style={{
                            height: 200
                        }} placeholder="•Volunteerd to help renovate a house and managed a team of 6." />
                    </Form.Item>
                    <Button className="form-button w-full" style={{ backgroundColor: 'rgb(77, 112, 235)', color: 'white' }} >
                        SAVE TO PROJECT LIST
                    </Button>
                </Form>
            </div>
        </>
    );
};
export default ProjectForm;