import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Typography, DatePicker, Button } from "antd";
import DataService from "@/app/utils/dataService";
import moment from "moment";
const { RangePicker } = DatePicker;

import "./customtext.css";

const stylesInput = {
  width: "769.22px",
  height: "56.19px",
  padding: "17.30px 15.50px 15.89px",
  backgroundColor: "white",
  borderRadius: "4px",
  border: "2px solid #e5e5e5",
  fontSize: "16px",
  fontWeight: "600",
  fontFamily: "Source Sans Pro, sans-serif",
};
const InvolvementForm = ({ cvId, onCreated, data }) => {
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false); // Add this state

  const dataService = new DataService("involvements", cvId);

  useEffect(() => {
    if (data) {
      // Convert the startDate and endDate to moment objects
      const startDateMoment = moment(experience.startDate);
      const endDateMoment = moment(experience.endDate);
      // Set the form values
      form.setFieldsValue({
        ...data,
        "range-picker": [startDateMoment, endDateMoment],
      });

      setIsEditMode(true); // Set to edit mode if education prop is provided
    } else {
      form.resetFields();
      setIsEditMode(false); // Set to create mode if education prop is not provided
    }
  }, [data, form]);

  const handleDateChange = (dates, dateStrings) => {
    const [startDate, endDate] = dates;
    form.setFieldsValue({
      startDate: startDate,
      endDate: endDate,
    });
  };
  const handleSubmit = async (values) => {
    try {
      if (isEditMode) {
        await dataService.update(data.id, values);
        setIsEditMode(false); // Set to create mode after updating
        form.resetFields(); // Reset the form
      } else {
        await dataService.create(values);
        form.resetFields();
      }
      onCreated();
    } catch (error) {
      console.log("Submit. Error:", error);
    }
  };

  return (
    <>
      <div className="w-2/3 ">
        <Form
          onFinish={handleSubmit}
          form={form}
          layout="vertical"
          autoComplete="off"
        >
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
            <Input
              style={stylesInput}
              placeholder="Economics Student Association"
            />
          </Form.Item>
          <Form.Item name="startDate" hidden>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name="endDate" hidden>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item
            name="range-picker"
            label={
              <label style={{}}>
                <span className="custom-text whitespace-nowrap">
                  <strong>HOW LONG</strong> WERE YOU WITH THE ORGANIZATION?
                </span>
              </label>
            }
          >
            <RangePicker
              style={stylesInput}
              picker="month"
              onChange={handleDateChange}
            />
          </Form.Item>

          <Form.Item
            name="college"
            label={
              <label style={{}}>
                <span className="custom-text whitespace-nowrap">
                  AT <strong>WHICH COLLEGE</strong> WAS THE ORGANIZATION
                  LOCATED?
                </span>
              </label>
            }
          >
            <Input
              style={stylesInput}
              placeholder="University of Wisconsin, Madison"
            />
          </Form.Item>
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
            <Input
              style={stylesInput}
              placeholder="• Participated in forums and discussions presented by key economic thinkers and companies associated with the university."
            />
          </Form.Item>
          <Button
            htmlType="submit"
            className="form-button w-full w-[769.22px] h-[47.86px] pl-[313.83px] pr-[315.39px] pt-[17.26px] pb-[17.60px] bg-indigo-500 rounded-md justify-center items-center inline-flex hover:text-white"
            style={{
              width: "769.22px",
              height: "47.86px",
              backgroundColor: "rgb(77, 112, 235)",
              color: "white",
            }}
          >
            <div className="hover:text-white text-center text-white text-opacity-80 text-xs font-bold font-['Source Sans Pro'] uppercase leading-3 whitespace-nowrap">
              {isEditMode ? "UPDATE " : "SAVE TO PROJECT LIST"}
            </div>
          </Button>
        </Form>
      </div>
    </>
  );
};
export default InvolvementForm;
